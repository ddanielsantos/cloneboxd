import { GraphQLList } from 'graphql'
import { userRepository } from '../userRepository'
import { userType } from '../userTypes'

export const userList = {
  type: new GraphQLList(userType),
  resolve: async () => {
    return (await userRepository.findAll())
  }
}
