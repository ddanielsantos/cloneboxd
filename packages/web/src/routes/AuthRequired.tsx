import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to={'/login'} replace />
  }

  return children
}