import { GraphQLFieldConfig } from 'graphql'
import { UserConnection } from '../userTypes'
import { UserModel } from '../userModel'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const userList: GraphQLFieldConfig<any, any, any> = {
  type: UserConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const users = await UserModel.find({})
    return connectionFromArray(users, args)
  }
}
