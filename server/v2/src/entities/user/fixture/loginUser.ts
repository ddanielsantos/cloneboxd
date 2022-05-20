import { WithId } from 'mongodb'
import * as jwt from 'jsonwebtoken'
import { User } from '../userRepository'
import { getEnvironmentVariables } from '../../../config/env'

export function loginUser(user: WithId<User>): { token: string } {
  const jwtSecret = getEnvironmentVariables().JWT_SECRET || ''

  const token = jwt.sign(
    { id: user._id.toString(), admin: user.isAdmin },
    jwtSecret,
    { expiresIn: '0.1h' }
  )

  return {
    token
  }
}
