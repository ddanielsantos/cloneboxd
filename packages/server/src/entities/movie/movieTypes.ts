import {
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql'
import { creditType } from '../credit/creditType'
import { nodeInterface } from '../../graphql/nodeInterface'
import { globalIdField, connectionDefinitions } from 'graphql-relay'
import { searchMovieById, searchMovieCredits } from '../../services/tmdb/api'
import { mapCastCrewToEntity } from '../../services/tmdb/mapCastCrewToEntity'
import { ReviewModel } from '../review/reviewModel'

export const movieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'Movie type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('Movie', movie => movie.id),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's title`,
      resolve: movie => movie.title
    },
    duration: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's duration`,
      resolve: async movie => {
        const { data } = await searchMovieById(movie.id)

        return data?.runtime + ' min'
      }
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Average rating of the movie according to the users',
      resolve: async movie => {
        const movieRatings = await ReviewModel.find({ movie: `${movie.id}` })

        const sum = movieRatings.reduce((prev, curr) => {
          return prev + curr.rating
        }, 0)

        const avg = sum / (movieRatings.length || 1)

        return avg.toFixed(2)
      }
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's description`,
      resolve: async movie => {
        const { data } = await searchMovieById(movie.id)

        return data?.overview
      }
    },
    genres: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: `Movie's genres`,
      resolve: async movie => {
        const { data } = await searchMovieById(movie.id)
        const genres = data?.genres.map(id => id.name)
        return genres
      }
    },
    releaseDate: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's global release date`,
      resolve: movie => movie.release_date
    },
    posterPath: {
      type: GraphQLString,
      description: `Movie's poster path`,
      resolve: movie => movie.poster_path
    },
    cast: {
      type: new GraphQLList(creditType),
      description: `Movie's cast`,
      resolve: async movie => {
        const { data } = await searchMovieCredits(movie.id)
        return data?.cast.map(mapCastCrewToEntity)
      }
    },
    crew: {
      type: new GraphQLList(creditType),
      description: `Movie's crew  `,
      resolve: async movie => {
        const { data } = await searchMovieCredits(movie.id)
        return data?.crew.map(mapCastCrewToEntity)
      }
    }
  })
})

export const { connectionType: MovieConnection, edgeType: MovieEdge } = connectionDefinitions({
  nodeType: movieType
})
