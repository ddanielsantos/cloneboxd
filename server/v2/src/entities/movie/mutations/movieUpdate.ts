import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { movieRepository } from '../movieRepository'
import { movieInputType } from '../movieTypes'

export const movieUpdate = mutationWithClientMutationId({
  name: 'movieUpdate',
  description: 'Update a movie using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    movie: {
      type: new GraphQLNonNull(movieInputType)
    }
  },
  outputFields: {
    modifiedCount: {
      type: GraphQLString,
      resolve: response => response.modifiedCount
    }
  },
  mutateAndGetPayload: async (payload) => {
    return (await movieRepository.updateOne(payload.id, payload.movie))
  }
})
