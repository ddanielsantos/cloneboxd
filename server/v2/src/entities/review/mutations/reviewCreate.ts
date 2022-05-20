import {
  fromGlobalId,
  mutationWithClientMutationId,
  toGlobalId
} from 'graphql-relay'
import { ObjectId } from 'mongodb'
import { GraphQLString } from 'graphql'
import { reviewInputType } from '../reviewTypes'
import { reviewRepository } from '../reviewRepository'
import { validadeMovies } from '../../movie/validateMovie'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'

export const reviewCreate = mutationWithClientMutationId({
  name: 'reviewCreate',
  description: 'Add a review',
  inputFields: {
    ...reviewInputType
  },
  outputFields: {
    insertedId: {
      type: GraphQLString,
      resolve: response => response.insertedId
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ ...review }, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload === null) {
      return {
        error: 'Unauthorized',
        insertedId: null
      }
    }

    const movieIdFromGlobal = fromGlobalId(review.movie).id

    const { error: invalidMovieError } = await validadeMovies([movieIdFromGlobal])

    if (invalidMovieError) {
      return {
        error: invalidMovieError,
        insertedId: null
      }
    }

    const user = new ObjectId(payload.id)
    const { insertedId } = await reviewRepository.insertOne({
      ...review,
      user,
      movie: new ObjectId(movieIdFromGlobal)
    })

    return {
      insertedId: toGlobalId('Review', insertedId.toString()),
      error: null
    }
  }
})
