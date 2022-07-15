import * as jwt from 'jsonwebtoken'
import { IUser } from '../userModel'
import { getEnvironmentVariables } from '../../../config/env'

export function loginUser(user: IUser): { token: string } {
  const jwtSecret = getEnvironmentVariables().ACCESS_TOKEN_SECRET || ''

  const token = jwt.sign(
    { id: user._id.toString(), admin: user.isAdmin },
    jwtSecret,
    { expiresIn: '0.1h' }
  )

  return {
    token
  }
}
