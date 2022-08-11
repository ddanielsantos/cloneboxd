import {
  fromGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay'
import { ObjectId } from 'mongodb'
import { IReview, ReviewModel } from '../reviewModel'
import { validateMovies } from '../../movie/validateMovie'
import { reviewInputType, reviewType } from '../reviewTypes'
import { BetaMongoose2GQLInput } from '../../../types/types'
import { errorField } from '../../../graphql/errorField'

type Review = BetaMongoose2GQLInput<IReview>

export const reviewCreate = mutationWithClientMutationId({
  name: 'reviewCreate',
  description: 'Add a review',
  inputFields: {
    ...reviewInputType
  },
  outputFields: {
    review: {
      type: reviewType,
      resolve: response => response.review
    },
    ...errorField
  },
  mutateAndGetPayload: async ({ ...review }: Review, ctx) => {
    if (!ctx.user) {
      return {
        error: 'Unauthorized',
        review: null
      }
    }

    const movieIdFromGlobal = fromGlobalId(review.movie).id

    const { error: invalidMovieError } = await validateMovies(movieIdFromGlobal)

    if (invalidMovieError) {
      return {
        error: invalidMovieError
      }
    }

    const user = ctx.user.id

    try {
      const document = new ReviewModel({
        ...review,
        user,
        movie: movieIdFromGlobal
      }).save()

      return {
        review: document
      }
    } catch {
      return {
        error: 'Invalid review'
      }
    }
  }
})
