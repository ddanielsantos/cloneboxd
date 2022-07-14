import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLString } from 'graphql'
import { UserConnection } from '../userTypes'
import { UserModel } from '../userModel'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

type Args = GraphQLFieldConfigArgumentMap & {
  username?: string
  email?: string
}

export const userList: GraphQLFieldConfig<any, any, Args> = {
  type: UserConnection,
  args: {
    ...connectionArgs,
    username: {
      type: GraphQLString,
      description: 'Filter users by this username'
    },
    email: {
      type: GraphQLString,
      description: 'Filter users by this email'
    }
  },
  resolve: async (_, args) => {
    const { username, email, ...connectionArgs } = args

    const filter = {
      ...(username && { username }),
      ...(email && { email })
    }

    const users = await UserModel.aggregate([
      { $match: filter }
    ])
    return connectionFromArray(users, connectionArgs)
  }
}
