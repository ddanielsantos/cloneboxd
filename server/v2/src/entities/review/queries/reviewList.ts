import { GraphQLList } from 'graphql'
import { reviewRepository } from '../reviewRepository'
import { reviewType } from '../reviewTypes'

export const reviewList = {
  type: new GraphQLList(reviewType),
  resolve: async () => {
    return (await reviewRepository.findAll())
  }
}
