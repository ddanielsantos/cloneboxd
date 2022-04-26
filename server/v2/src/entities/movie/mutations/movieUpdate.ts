import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { movieInputType } from '../movieTypes'
import { movieRepository } from '../movieRepository'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

export const movieUpdate = mutationWithClientMutationId({
  name: 'movieUpdate',
  description: 'Update a movie using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ...movieInputType
  },
  outputFields: {
    modifiedCount: {
      type: GraphQLString,
      resolve: response => response.modifiedCount
    }
  },
  mutateAndGetPayload: async ({ id, ...movie }) => {
    return (await movieRepository.updateOne(fromGlobalId(id).id, movie))
  }
})
