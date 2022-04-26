import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { movieRepository } from '../movieRepository'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

export const movieDelete = mutationWithClientMutationId({
  name: 'movieDelete',
  description: 'Delete a movie using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Movie's id`
    }
  },
  outputFields: {
    deletedCount: {
      type: GraphQLString,
      resolve: response => response.deletedCount
    }
  },
  mutateAndGetPayload: async ({ id }) => {
    const response = await movieRepository.deleteOne(fromGlobalId(id).id)

    return response
  }
})
