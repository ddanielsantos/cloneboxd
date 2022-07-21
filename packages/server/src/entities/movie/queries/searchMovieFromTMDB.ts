import { MovieConnection } from '../movieTypes'
import { searchMovieByTitle } from '../../../services/tmdb/api'
import { connectionArgs, connectionFromArray } from 'graphql-relay'
import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLNonNull, GraphQLString } from 'graphql'

type Args = GraphQLFieldConfigArgumentMap & {
  title: string
}

export const searchMovieFromTMDB: GraphQLFieldConfig<any, any, Args> = {
  type: MovieConnection,
  args: {
    ...connectionArgs,
    title: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, args) => {
    const { title, ...connectionArgs } = args

    const { data } = await searchMovieByTitle(title)

    return connectionFromArray(data?.results ?? [], connectionArgs)
  }
}
