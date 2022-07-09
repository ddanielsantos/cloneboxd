import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { ReviewConnection } from '../reviewTypes'
import { ReviewModel } from '../reviewModel'
import { connectionArgs, connectionFromArray, fromGlobalId } from 'graphql-relay'

type Args = GraphQLFieldConfigArgumentMap & {
  sort?: string
  rating?: number
  direction?: -1 | 1,
  movie?: string
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
    },
    movie: {
      type: GraphQLID,
      description: 'Filter reviews by this movie'
    }
  },
  resolve: async (_, args: Args) => {
    const { sort, rating, direction, movie, ...connnectionArgs } = args

    const movieId = movie && fromGlobalId(movie).id

    const filter = {
      ...(movieId && { movie: movieId }),
      ...(rating && { rating })
    }

    const reviews = await ReviewModel.aggregate([
      { $match: filter },
      { $sort: { [sort || 'watchedAt']: direction || -1 } }
    ])

    return connectionFromArray(reviews, connnectionArgs)
  }
}
