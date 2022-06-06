import { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AuthRequired } from '../routes/AuthRequired'

type Props = {
  element: ReactElement<any, any>
  path: string
}

export const ProtectedRoute = ({ path, element }: Props) => {
  return (
    <Route
      path={path}
      element={
        <AuthRequired>
          {element}
        </AuthRequired>
      }
    />
  )
}