import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { CommentModel } from '../commentModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { commentType } from '../commentTypes'
import { errorField } from '../../../graphql/errorField'

export const commentUpdate = mutationWithClientMutationId({
  name: 'commentUpdate',
  description: 'Update a comment using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the comment'
    }
  },
  outputFields: {
    comment: {
      type: commentType,
      resolve: response => response.comment
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

    const id = fromGlobalId(comment.id).id

    if (!id) {
      return {
        error: 'Invalid ID'
      }
    }

    const commentToUpdate = await CommentModel.findById(id)

    if (!commentToUpdate) {
      return {
        error: 'Comment not found'
      }
    }

    if (payload.id !== commentToUpdate.user.toString()) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      const result = await CommentModel.findByIdAndUpdate(commentToUpdate._id, {
        $set: {
          ...comment
        }
      }, { new: true })

      return {
        comment: result
      }
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  }
})
