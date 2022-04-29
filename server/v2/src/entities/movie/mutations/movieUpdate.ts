import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { movieInputType } from '../movieTypes'
import { Movie, movieRepository } from '../movieRepository'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { crewRepository } from '../../../entities/crew/crewRepository'

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
  mutateAndGetPayload: async ({ id, ...movie }: Movie & { id: string }) => {
    const validActors = await crewRepository.findMany(movie.actors)
    const validDirectors = await crewRepository.findMany(movie.directors)

    if (validActors.length !== movie.actors.length) {
      throw new Error('All actors must be valid members of the crew')
    }

    if (validDirectors.length !== movie.directors.length) {
      throw new Error('All directors must be valid members of the crew')
    }

    return (await movieRepository.updateOne(fromGlobalId(id).id, movie))
  }
})
