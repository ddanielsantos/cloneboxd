import { GraphQLFieldConfig } from 'graphql'
import { MovieConnection } from '../movieTypes'
import { MovieModel } from '../movieModel'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const movieList: GraphQLFieldConfig<any, any, any> = {
  type: MovieConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const movies = await MovieModel.find({})
    return connectionFromArray(movies, args)
  }
}
