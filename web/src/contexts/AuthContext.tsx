import { createContext, useState, useContext, useEffect } from "react";
import { saveToken, removeToken, Token } from "../helpers/localStorage";
import { graphql, useMutation } from 'react-relay'
import { useNavigate } from 'react-router-dom'

import type { AuthContextMutation } from './__generated__/AuthContextMutation.graphql'

type AuthContextProps = {
  token?: Token,
  signIn: (token: Token) => void,
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<Token | undefined>(undefined)
  const navigate = useNavigate()

  const [commitRefresh] = useMutation<AuthContextMutation>(graphql`
    mutation AuthContextMutation($input: userRefreshTokenInput!) {
      userRefreshToken(input: $input){
        accessToken
        error
      }
    }
  `)

  const signIn = (token: Token) => {
    setToken(token)
    saveToken(token)
  }

  const signOut = () => {
    setToken(undefined)
    removeToken()
    navigate('/login')
  }

  const everyTenMinutes = (callback: () => void): NodeJS.Timer => {
    const TEN_MINUTES_IN_MILLISECONDS = 1000 * 60 * 10

    return setInterval(callback, TEN_MINUTES_IN_MILLISECONDS)
  }

  const { refreshToken } = token || {}

  useEffect(() => {
    if (!refreshToken?.value) {
      return
    }

    const id = everyTenMinutes(
      () => commitRefresh({
        variables: {
          input: {
            refreshToken: refreshToken?.value!
          }
        }, onCompleted: ({ userRefreshToken }, error) => {
          if (error) {
            signOut()
            return
          }

          if (userRefreshToken?.accessToken && token) {
            signIn({
              ...token,
              accessToken: userRefreshToken.accessToken
            })
          }
        },
      })
    )

    return () => clearInterval(id)
  }, [token?.refreshToken])

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be within AuthProvider")
  }

  return context
}