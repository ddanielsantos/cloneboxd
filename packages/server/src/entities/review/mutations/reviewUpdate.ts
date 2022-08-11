import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { ReviewModel } from '../reviewModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { reviewType } from '../reviewTypes'
import { errorField } from '../../../graphql/errorField'

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
    ...errorField
  },
  mutateAndGetPayload: async ({ ...review }, ctx) => {
    if (!ctx.user) {
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

    if (ctx.user.id !== reviewToUpdate.user.toString()) {
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
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  }
})
