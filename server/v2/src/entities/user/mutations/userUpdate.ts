import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { userInputType } from '../userTypes'
import { UserModel } from '../userModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

export const userUpdate = mutationWithClientMutationId({
  name: 'userUpdate',
  description: 'Update a user using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ...userInputType
  },
  outputFields: {
    result: {
      type: GraphQLString,
      resolve: response => response.result
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ id, ...user }) => {
    const result = await UserModel.updateOne({
      _id: fromGlobalId(id).id
    }, {
      $set: user
    })

    return result
  }
})
