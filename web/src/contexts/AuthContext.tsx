import { createContext, useState, useContext, useEffect } from "react";
import { getToken, saveToken, removeToken, Token } from "../helpers/localStorage";

type AuthContextProps = {
  token: Token | undefined,
  signIn: (token: Token) => void,
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<Token | undefined>(() => {
    return getToken()
  })

  const signIn = (token: Token) => {
    setToken(token)
    saveToken(token)
  }

  const signOut = () => {
    setToken(undefined)
    removeToken()
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be within AuthProvider")
  }

  return context
}