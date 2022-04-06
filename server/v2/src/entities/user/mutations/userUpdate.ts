import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { userRepository } from '../userRepository'
import { userInputType } from '../userTypes'

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
  mutateAndGetPayload: async (payload, ctx) => {
    return (await userRepository.updateOne(payload.id, payload.user))
  }
})
