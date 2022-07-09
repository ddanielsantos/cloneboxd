import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLInt, GraphQLString } from 'graphql'
import { ReviewConnection } from '../reviewTypes'
import { ReviewModel } from '../reviewModel'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

type Args = GraphQLFieldConfigArgumentMap & {
  sort?: string
  rating?: number
  direction?: -1 | 1
}

export const reviewList: GraphQLFieldConfig<any, any, any> = {
  type: ReviewConnection,
  args: {
    ...connectionArgs,
    sort: {
      type: GraphQLString,
      description: 'Sort reviews by this field'
    },
    direction: {
      type: GraphQLString,
      description: 'Use the sort field in this direction'
    },
    rating: {
      type: GraphQLInt,
      description: 'Filter reviews by this rating'
    }
  },
  resolve: async (_, args: Args) => {
    const { sort, rating, direction, ...connnectionArgs } = args

    const reviews = await ReviewModel.aggregate([
      { $match: rating ? { rating } : {} },
      { $sort: { [sort || 'watchedAt']: direction || -1 } }
    ])

    return connectionFromArray(reviews, connnectionArgs)
  }
}
