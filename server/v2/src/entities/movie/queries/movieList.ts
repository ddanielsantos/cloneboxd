import { GraphQLFieldConfig } from 'graphql'
import { MovieConnection } from '../movieTypes'
import { movieRepository } from '../movieRepository'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const movieList: GraphQLFieldConfig<any, any, any> = {
  type: MovieConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const movies = await movieRepository.findAll()
    return connectionFromArray(movies, args)
  }
}
