import { GraphQLFieldConfig } from 'graphql'
import { ReviewConnection } from '../reviewTypes'
import { reviewRepository } from '../reviewRepository'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const reviewList: GraphQLFieldConfig<any, any, any> = {
  type: ReviewConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const reviews = await reviewRepository.findAll()
    return connectionFromArray(reviews, args)
  }
}
