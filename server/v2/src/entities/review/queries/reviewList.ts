import { GraphQLFieldConfig } from 'graphql'
import { ReviewConnection } from '../reviewTypes'
import { ReviewModel } from '../reviewModel'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const reviewList: GraphQLFieldConfig<any, any, any> = {
  type: ReviewConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const reviews = await ReviewModel.find({})
    return connectionFromArray(reviews, args)
  }
}
