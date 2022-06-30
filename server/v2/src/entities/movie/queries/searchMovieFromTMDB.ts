import axios from 'axios'
import { MovieConnection } from '../movieTypes'
import { GraphQLFieldConfig, GraphQLFieldConfigArgumentMap, GraphQLNonNull, GraphQLString } from 'graphql'
import { connectionArgs, connectionFromArray } from 'graphql-relay'
import { getEnvironmentVariables } from '../../../config/env'

type Args = GraphQLFieldConfigArgumentMap & {
  title: string
}

const { TMDB_API_KEY } = getEnvironmentVariables()

export async function searchMovieByTitleInTMDB(params: any): Promise<any> {
  const baseUrl = new URL('https://api.themoviedb.org/3/search/movie')

  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')

  baseUrl.search = queryString

  const { data } = await axios.get(baseUrl.toString())

  return data.results
}

export const searchMovieFromTMDB: GraphQLFieldConfig<any, any, any> = {
  type: MovieConnection,
  args: {
    ...connectionArgs,
    title: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, args: Args) => {
    const { title, ...connectionArgs } = args

    const TMDBmovies = require('../../../../temp/movieSearch.json').results.slice(0, 2)

    /* await searchMovieByTitleInTMDB({
      api_key: TMDB_API_KEY,
      query: title
    }) */

    return connectionFromArray(TMDBmovies, connectionArgs)
  }
}
