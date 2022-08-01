import {
  fromGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay'
import { Types } from 'mongoose'
import { CommentEdge } from '../commentTypes'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { errorField } from '../../../graphql/errorField'
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql'
import { ReviewModel } from '../../review/reviewModel'

type Comment = {
  review: string
  content: string
}

export const commentCreate = mutationWithClientMutationId({
  name: 'commentCreate',
  description: 'Add a comment',
  inputFields: {
    review: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the review to comment on'
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the comment'
    }
  },
  outputFields: {
    comment: {
      type: CommentEdge,
      resolve: response => response.comment
    },
    ...errorField
  },
  mutateAndGetPayload: async ({ ...comment }: Comment, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || !payload) {
      return {
        error: 'Unauthorized',
        comment: null
      }
    }

    const { id: _id } = fromGlobalId(comment.review)

    const user = new Types.ObjectId(payload.id)

    try {
      const result = await ReviewModel.findOneAndUpdate({ _id }, {
        $push: {
          comments: {
            content: comment.content,
            user
          }
        }
      }, { new: true })

      if (!result) throw new Error('review not found')

      return {
        comment: {
          node: result.comments.at(-1)
        }
      }
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  }
})
