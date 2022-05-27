import { MovieConnection } from '../movieTypes'
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql'
import { connectionArgs, connectionFromArray } from 'graphql-relay'
import { MovieModel } from '../movieModel'

export const searchMovieByTitle: GraphQLFieldConfig<any, any, any> = {
  type: MovieConnection,
  args: {
    ...connectionArgs,
    title: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, args) => {
    const { title } = args

    const movies = await MovieModel.find({
      $text: { $search: title }
    }).sort({ score: { $meta: 'textScore' } })

    return connectionFromArray(movies, args)
  }
}
