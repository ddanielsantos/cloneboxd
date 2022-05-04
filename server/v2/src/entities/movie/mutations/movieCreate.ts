import {
  GraphQLString
} from 'graphql'
import { ObjectId } from 'mongodb'
import { movieInputType } from '../movieTypes'
import { Movie, movieRepository } from '../movieRepository'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { validateCrewMembers } from '../../crew/validateCrewMembers'
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
      resolve: response => response.insertedId
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ ...movie }: Movie, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload?.admin !== true) {
      return {
        error: 'Unauthorized',
        insertedId: null
      }
    }

    const submitedBy = new ObjectId(payload.id)

    const actors = movie.actors.map(actor => fromGlobalId(actor).id)
    const directors = movie.directors.map(director => fromGlobalId(director).id)

    const { error: invalidCrewMembersError } = await validateCrewMembers([...actors, ...directors])

    if (invalidCrewMembersError) {
      return {
        error: invalidCrewMembersError || '',
        insertedId: null
      }
    }

    const { insertedId } = await movieRepository.insertOne({ ...movie, actors, directors, submitedBy })

    return {
      insertedId: toGlobalId('Movie', insertedId.toString()),
      error: null
    }
  }
})
