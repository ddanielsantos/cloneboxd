import { GraphQLList } from 'graphql'
import { movieRepository } from '../movieRepository'
import { movieType } from '../movieTypes'

export const movieList = {
  type: new GraphQLList(movieType),
  resolve: async () => {
    const movies = await movieRepository.findAll()
    return movies
  }
}
