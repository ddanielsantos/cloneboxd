import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql'
import { movie } from '../entities/movie/movieTypes'
import { movieRepository } from '../entities/movie/movieRepository'

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The root query type',
  fields: {
    allMovies: {
      type: new GraphQLList(movie),
      resolve: async () => {
        const movies = await movieRepository.findAll()
        return movies
      }
    },
    singleMovie: {
      type: movie,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_root, args) => {
        return await movieRepository.findOne(args.id)
      }
    }
  }
})
