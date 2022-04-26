import { repositoryFactory } from '../../factories/repository'

type User = {
  fullName: string,
  email: string,
  password: string
}

const userRepository = repositoryFactory<User>('user')

export { userRepository, User }
