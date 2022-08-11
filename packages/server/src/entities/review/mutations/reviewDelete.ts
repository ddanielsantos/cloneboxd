import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { ReviewModel } from '../reviewModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { errorField } from '../../../graphql/errorField'

export const reviewDelete = mutationWithClientMutationId({
  name: 'reviewDelete',
  description: 'Delete a review using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    deletedCount: {
      type: GraphQLString,
      resolve: response => response.deletedCount
    },
    ...errorField
  },
  mutateAndGetPayload: async ({ id }, ctx) => {
    if (!ctx.user) {
      return {
        error: 'Unauthorized'
      }
    }

    const reviewToDelete = await ReviewModel.findById(fromGlobalId(id).id)

    if (!reviewToDelete) {
      return {
        error: 'Review not found'
      }
    }

    if (ctx.user.id !== reviewToDelete.user.toString()) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      const response = await ReviewModel.deleteOne({
        _id: reviewToDelete.id
      })

      return response
    } catch (error: unknown) {
      return { error: (error as Error).message }
    }
  }
})
