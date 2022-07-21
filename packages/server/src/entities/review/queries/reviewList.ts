import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { ReviewConnection } from '../reviewTypes'
import { ReviewModel } from '../reviewModel'
import { connectionArgs, connectionFromArray, fromGlobalId } from 'graphql-relay'
import { UserModel } from '../../user/userModel'
import { Types } from 'mongoose'

const usernameToObjectID = async (username: string): Promise<Types.ObjectId | undefined> => {
  const user = await UserModel.findOne({ username })

  return user?._id
}

type Args = GraphQLFieldConfigArgumentMap & {
  sort?: string
  rating?: number
  direction?: -1 | 1,
  movie?: string
  username?: string
}

export const reviewList: GraphQLFieldConfig<any, any, Args> = {
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
    },
    username: {
      type: GraphQLString,
      description: 'Filter reviews by this username'
    }
  },
  resolve: async (_, args) => {
    const { sort, rating, direction, movie, username, ...connnectionArgs } = args

    const movieId = movie && fromGlobalId(movie).id
    const userId = username && await usernameToObjectID(username)

    const filter = {
      ...(userId && { user: userId }),
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
