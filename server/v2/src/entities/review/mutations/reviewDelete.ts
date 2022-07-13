import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { ReviewModel } from '../reviewModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'

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
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ id }, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload === null) {
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

    if (payload.id !== reviewToDelete.user.toString()) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      const response = await ReviewModel.deleteOne({
        _id: reviewToDelete.id
      })

      return response
    } catch (error: any) {
      return { error: error.message }
    }
  }
})
