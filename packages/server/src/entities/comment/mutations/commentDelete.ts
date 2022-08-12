import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { CommentModel } from '../commentModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
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
    deletedId: {
      type: GraphQLID,
      description: 'The id of the deleted comment',
      resolve: response => response.deletedId
    },
    ...errorField
  },
  mutateAndGetPayload: async ({ ...comment }, ctx) => {
    if (!ctx.user) {
      return {
        error: 'Unauthorized'
      }
    }

    console.log('mutation ', ctx.user)

    if (!ctx.user) {
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

    if (ctx.user.id !== commentToDelete.user.toString()) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      await CommentModel.deleteOne({
        _id: commentToDelete.id
      })

      return {
        deletedId: comment.id
      }
    } catch (error: unknown) {
      return { error: (error as Error).message }
    }
  }
})
