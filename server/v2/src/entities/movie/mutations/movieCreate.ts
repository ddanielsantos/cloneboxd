import {
  GraphQLString
} from 'graphql'
import { ObjectId } from 'mongodb'
import { MovieModel, IMovie } from '../movieModel'
import { movieInputType, movieType } from '../movieTypes'
import { BetaMongoose2GQLInput } from '../../../types/types'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { validateCrewMembers } from '../../crew/validateCrewMembers'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

type Movie = BetaMongoose2GQLInput<IMovie>

export const movieCreate = mutationWithClientMutationId({
  name: 'movieCreate',
  description: 'Add a movie',
  inputFields: {
    ...movieInputType
  },
  outputFields: {
    movie: {
      type: movieType,
      // TODO: add this to other insertions
      resolve: response => response.movie
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  // TODO: #29 input types vs mongo types
  mutateAndGetPayload: async ({ ...movie }: Movie, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload?.admin !== true) {
      return {
        error: 'Unauthorized'
      }
    }

    const { error: invalidCrewMembersError } = await validateCrewMembers([...movie.actors, ...movie.directors])

    if (invalidCrewMembersError) {
      return {
        error: invalidCrewMembersError
      }
    }
    const submitedBy = new ObjectId(payload.id)

    const actors = movie.actors.map((actor: string) => new ObjectId(fromGlobalId(actor).id))
    const directors = movie.directors.map((director: string) => new ObjectId(fromGlobalId(director).id))

    try {
      const document = new MovieModel({
        ...movie,
        submitedBy,
        actors,
        directors
      }).save()

      return {
        movie: document
      }
    } catch {
      return {
        error: 'Error saving movie'
      }
    }
  }
})
