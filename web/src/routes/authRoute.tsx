import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { SignUp } from '../pages/SignUp/SignUp'
import { Review } from '../pages/Review/Review'
import { NoMatch } from '../pages/NoMatch/NoMatch'
import { Routes as RRoutes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../helpers/ProtectedRoute'

export const Routes = () => {
  return (
    <RRoutes>
      <ProtectedRoute path='/' element={<Home />} />
      <ProtectedRoute path='/review' element={<Review />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
    </RRoutes>
  )
}