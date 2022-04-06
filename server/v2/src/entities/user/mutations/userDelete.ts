import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { userRepository } from '../userRepository'

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
  mutateAndGetPayload: async (payload) => {
    return (await userRepository.deleteOne(payload.id))
  }
})
