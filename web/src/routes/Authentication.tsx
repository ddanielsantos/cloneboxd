import { Routes as RRoutes, Route } from 'react-router-dom'
import { Login } from '../pages/Login/Login'
import { SignUp } from '../pages/SignUp/SignUp'

export const Routes = () => {
  return (
    <RRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </RRoutes>
  )
}