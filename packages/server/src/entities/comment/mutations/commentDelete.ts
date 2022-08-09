import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { CommentModel } from '../commentModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { errorField } from '../../../graphql/errorField'

export const commentDelete = mutationWithClientMutationId({
  name: 'commentDelete',
  description: 'Delete a comment using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    id: {
      type: GraphQLID,
      description: 'The id of the deleted comment',
      resolve: response => response.id
    },
    ...errorField
  },
  mutateAndGetPayload: async ({ ...comment }, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload === null) {
      return {
        error: 'Unauthorized'
      }
    }

    const { id } = fromGlobalId(comment.id)

    if (!id) {
      return {
        error: 'Invalid ID'
      }
    }

    const commentToDelete = await CommentModel.findById(id)

    if (!commentToDelete) {
      return {
        error: 'Comment not found'
      }
    }

    if (payload.id !== commentToDelete.user.toString()) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      await CommentModel.deleteOne({
        _id: commentToDelete.id
      })

      return {
        id: comment.id
      }
    } catch (error: unknown) {
      return { error: (error as Error).message }
    }
  }
})
