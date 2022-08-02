import {
  fromGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay'
import { Types } from 'mongoose'
import { commentType } from '../commentTypes'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { errorField } from '../../../graphql/errorField'
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql'
import { CommentModel } from '../commentModel'
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
      type: commentType,
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
    const { id } = fromGlobalId(comment.review)

    const review = await ReviewModel.findById(id)

    if (!review) {
      return {
        error: 'No review found'
      }
    }

    const user = new Types.ObjectId(payload.id)
    const document = new CommentModel({
      content: comment.content,
      user
    })

    try {
      await document.save()

      review.comments.push(document._id)
      review.save()

      return {
        comment: document
      }
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  }
})
