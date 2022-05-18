import { MovieConnection } from '../movieTypes'
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql'
import { connectionArgs, connectionFromArray } from 'graphql-relay'
import { movieRepository } from '../movieRepository'

export const searchMovieByTitle: GraphQLFieldConfig<any, any, any> = {
  type: MovieConnection,
  args: {
    ...connectionArgs,
    title: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, args) => {
    const { title } = args

    const movies = await movieRepository.findManyExperimental({
      filter: {
        $text: { $search: title }
      },
      sort: {
        score: { $meta: 'textScore' }
      }
    })

    console.log(movies)

    return connectionFromArray(movies, args)
  }
}
