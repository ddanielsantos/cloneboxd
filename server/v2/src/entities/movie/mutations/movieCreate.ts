import {
  GraphQLString
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { Movie, movieRepository } from '../movieRepository'
import { crewRepository } from '../../crew/crewRepository'
import { movieInputType } from '../movieTypes'

export const movieCreate = mutationWithClientMutationId({
  name: 'movieCreate',
  description: 'Add a movie',
  inputFields: {
    ...movieInputType
  },
  outputFields: {
    insertedId: {
      type: GraphQLString,
      resolve: response => response.insertedId
    }
  },
  mutateAndGetPayload: async (payload: Movie) => {
    // TODO: Add validation and change filter to be perfomed in the database
    const validActors = await crewRepository.findMany(payload.actors)
    const validDirectors = await crewRepository.findMany(payload.directors)

    if (validActors.length !== payload.actors.length) {
      throw new Error('All actors must be valid members of the crew')
    }

    if (validDirectors.length !== payload.directors.length) {
      throw new Error('All directors must be valid members of the crew')
    }

    return (await movieRepository.insertOne({ ...payload }))
  }
})
