import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { UserModel } from '../userModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

export const userDelete = mutationWithClientMutationId({
  name: 'userDelete',
  description: 'Delete a user using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    deletedCount: {
      type: GraphQLString,
      resolve: response => response.deletedCount
    }
  },
  mutateAndGetPayload: async ({ id }) => {
    const response = await UserModel.deleteOne({
      _id: fromGlobalId(id).id
    })

    return response
  }
})
