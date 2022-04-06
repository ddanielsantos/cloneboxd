import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { movieRepository } from '../movieRepository'

export const movieDelete = mutationWithClientMutationId({
  name: 'movieDelete',
  description: 'Delete a movie using its id',
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
    return (await movieRepository.deleteOne(payload.id))
  }
})
