import { GraphQLFieldConfig } from 'graphql'
import { UserConnection } from '../userTypes'
import { userRepository } from '../userRepository'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const userList: GraphQLFieldConfig<any, any, any> = {
  type: UserConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const users = await userRepository.findAll()
    return connectionFromArray(users, args)
  }
}
