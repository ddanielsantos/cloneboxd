import { repositoryFactory } from '../../factories/repository'

type User = {
  fullName: string,
  email: string,
  password: string,
  isAdmin: boolean
}

const userRepository = repositoryFactory<User>('user')

export { userRepository, User }
