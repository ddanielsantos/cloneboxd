import { reviewType } from '../reviewTypes'
import { GraphQLID, GraphQLNonNull } from 'graphql'
import { ReviewModel } from '../reviewModel'
import { fromGlobalId } from 'graphql-relay'

export const singleReview = {
  type: reviewType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return await ReviewModel.findOne({
      _id: fromGlobalId(args.id).id
    })
  }
}
