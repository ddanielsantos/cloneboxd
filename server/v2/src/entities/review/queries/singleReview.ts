import { reviewType } from '../reviewTypes'
import { GraphQLID, GraphQLNonNull } from 'graphql'
import { reviewRepository } from '../reviewRepository'

export const singleReview = {
  type: reviewType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return await reviewRepository.findOne(args.id)
  }
}
