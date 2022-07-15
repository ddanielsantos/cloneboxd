import { createContext, useState, useContext } from "react";
import { getToken, saveToken, removeToken } from "../helpers/localStorage";

type AuthContextProps = {
  token: string,
  signIn: (token: string) => void,
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  signIn: (token: string) => { },
  signOut: () => { }
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(() => {
    return getToken() || ''
  })

  const signIn = (token: string) => {
    setToken(token)
    saveToken(token)
  }

  const signOut = () => {
    setToken('')
    removeToken()
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}