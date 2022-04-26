import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { userRepository } from '../userRepository'
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
    const response = await userRepository.deleteOne(fromGlobalId(id).id)

    return response
  }
})
