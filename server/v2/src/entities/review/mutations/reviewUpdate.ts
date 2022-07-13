import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { ReviewModel } from '../reviewModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { reviewType } from '../reviewTypes'

export const reviewUpdate = mutationWithClientMutationId({
  name: 'reviewUpdate',
  description: 'Update a review using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    text: {
      type: GraphQLString,
      description: `User review's text`
    },
    rating: {
      type: GraphQLFloat,
      description: `User review's rating`
    },
    watchedAt: {
      type: GraphQLString,
      description: `When the user watched the movie`
    }
  },
  outputFields: {
    review: {
      type: reviewType,
      resolve: response => response.review
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
        error: 'Unauthorized'
      }
    }

    const reviewToUpdate = await ReviewModel.findById(fromGlobalId(review.id).id)

    if (!reviewToUpdate) {
      return {
        error: 'Review not found'
      }
    }

    if (payload.id !== reviewToUpdate.user.toString()) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      const result = await ReviewModel.findByIdAndUpdate(reviewToUpdate._id, {
        $set: {
          ...review
        }
      }, { new: true })

      return {
        review: result
      }
    } catch (error: any) {
      return {
        error: error.message
      }
    }
  }
})
