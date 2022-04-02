import { repositoryFactory } from '../../factories/repository'

type User = {
  id: string,
  fullNname: string,
  email: string,
  password: string
}

const userRepository = repositoryFactory<User>('user')

export { userRepository }
