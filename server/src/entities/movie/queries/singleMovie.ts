import { GraphQLID, GraphQLNonNull } from 'graphql'
import { fromGlobalId } from 'graphql-relay'
import { searchMovieById } from '../../../services/tmdb/api'
import { movieType } from '../movieTypes'

export const singleMovie = {
  type: movieType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    try {
      const { id } = fromGlobalId(args.id)
      const { data } = await searchMovieById(id)

      return data
    } catch {
      return null
    }
  }
}
