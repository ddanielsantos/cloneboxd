import {
  GraphQLString
} from 'graphql'
import { ObjectId } from 'mongodb'
import { movieInputType } from '../movieTypes'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { crewRepository } from '../../crew/crewRepository'
import { Movie, movieRepository } from '../movieRepository'
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

export const movieCreate = mutationWithClientMutationId({
  name: 'movieCreate',
  description: 'Add a movie',
  inputFields: {
    ...movieInputType
  },
  outputFields: {
    insertedId: {
      type: GraphQLString,
      // TODO: add this to other insertions
      resolve: response => toGlobalId('Movie', response.insertedId)
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ ...movie }: Movie, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)
    console.log(payload)

    if (error || payload?.admin !== true) {
      return {
        error: 'Unauthorized',
        insertedId: null
      }
    }

    const submitedBy = new ObjectId(payload.id)

    const actors = movie.actors.map(actor => fromGlobalId(actor).id)
    const directors = movie.directors.map(director => fromGlobalId(director).id)

    // TODO: improve this
    try {
      await crewRepository.findMany(actors)
      await crewRepository.findMany(directors)
    } catch {
      return {
        error: 'Invalid actors or directors',
        insertedId: null
      }
    }

    return (await movieRepository.insertOne({ ...movie, actors, directors, submitedBy }))
  }
})
