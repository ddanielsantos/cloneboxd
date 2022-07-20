import { userCreate } from './userCreate'
import { userUpdate } from './userUpdate'
import { userDelete } from './userDelete'
import { loginUser } from './loginUser'
import { userLogout } from './userLogout'
import { userRefreshToken } from './userRefreshToken'

export const userMutations = {
  userCreate,
  userUpdate,
  userDelete,
  loginUser,
  userLogout,
  userRefreshToken
}
