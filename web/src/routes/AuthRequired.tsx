import { Navigate } from "react-router-dom";
import { getToken } from "../helpers/localStorage";

export const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const token = getToken()

  if (!token) {
    return <Navigate to={'/login'} replace />
  }

  return children
}