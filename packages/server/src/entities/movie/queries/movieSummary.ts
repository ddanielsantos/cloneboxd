import { fromGlobalId } from 'graphql-relay'
import { GraphQLFieldConfig, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { errorField } from '../../../graphql/errorField'
import { movieReviewsByRating } from './movieReviewsByRating'
import { ReviewModel } from '../../review/reviewModel'

type Args = {
  id: string
}

const movieSummaryType = new GraphQLObjectType({
  name: 'MovieSummary',
  fields: () => ({
    ...errorField,
    totalWatches: {
      type: GraphQLInt,
      resolve: ({ totalWatches }) => totalWatches
    },
    reviewsPerRating: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'ReviewsPerRating',
        fields: () => ({
          rating: {
            type: GraphQLFloat,
            resolve: ({ rating }) => rating
          },
          count: {
            type: GraphQLInt,
            resolve: ({ count }) => count
          }
        })
      }))
    },
    uniqueWatches: {
      type: GraphQLInt,
      resolve: ({ uniqueWatches }) => uniqueWatches
    }
  })
})

export const movieSummary: GraphQLFieldConfig<any, any, Args> = {
  type: movieSummaryType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, args) => {
    const { id } = args

    const { id: movie, type } = fromGlobalId(id)

    if (!movie || type !== 'Movie') {
      return {
        error: 'Invalid movie id'
      }
    }

    const reviewsPerRating = await movieReviewsByRating(movie)

    const totalWatches = reviewsPerRating.reduce((acc, { count }) => acc + count, 0)

    const [uniqueWatches] = await ReviewModel.aggregate([
      { $match: { movie } },
      { $group: { _id: '$user' } },
      { $count: 'count' }
    ])

    return {
      totalWatches,
      reviewsPerRating,
      uniqueWatches: uniqueWatches?.count || 0
    }
  }
}
