import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { userInputType } from '../userTypes'
import { User, userRepository } from '../userRepository'
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
    modifiedCount: {
      type: GraphQLString,
      resolve: response => response.modifiedCount
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ id, ...user }: User & { id: string }) => {
    // FIXME: improve this later
    return (await userRepository.updateOne(fromGlobalId(id).id, user))
  }
})
