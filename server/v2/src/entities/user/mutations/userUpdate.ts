import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { userInputType } from '../userTypes'
import { userRepository } from '../userRepository'
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
    }
  },
  mutateAndGetPayload: async ({ id, ...user }) => {
    return (await userRepository.updateOne(fromGlobalId(id).id, user))
  }
})
