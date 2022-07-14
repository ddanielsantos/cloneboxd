import { userType } from '../userTypes'
import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql'
import { UserModel } from '../userModel'
import { fromGlobalId } from 'graphql-relay'

export const singleUser: GraphQLFieldConfig<any, any, any> = {
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_, args) => {
    const { id } = fromGlobalId(args.id)

    return await UserModel.findOne({
      _id: id
    })
  }
}
