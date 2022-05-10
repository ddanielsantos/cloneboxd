import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { AuthRequired } from './AuthRequired'
import { SignUp } from '../pages/SignUp/SignUp'
import { NoMatch } from '../pages/NoMatch/NoMatch'
import { Routes as RRoutes, Route } from 'react-router-dom'

export const Routes = () => {
  return (
    <RRoutes>
      {/* TODO: transform this in a component */}
      <Route
        path="/"
        element={
          <AuthRequired>
            <Home />
          </AuthRequired>
        }
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
    </RRoutes>
  )
}