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

// TODO: ageGroups & rating
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
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's description`,
      resolve: async movie => {
        const { data } = await searchMovieById(movie.id)

        return data?.overview
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
    genres: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: `Movie's genres`,
      resolve: async movie => {
        const { data } = await searchMovieById(movie.id)
        const genres = data?.genres.map(id => id.name)
        return genres
      }
    },
    ageGroups: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: `Movie's age group`,
      resolve: movie => {
        // movie.ageGroup
        return ['E']
      }
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: `Movie's rating according to users`,
      resolve: async movie => {
        // find from mongodb
        return 0
      }
    },
    cast: {
      type: new GraphQLList(creditType),
      description: `Movie's cast`,
      resolve: async movie => {
        const { data } = await searchMovieCredits(movie.id)
        const actors = data?.cast.map(actor => {
          return {
            role: actor.character,
            person: {
              id: actor.id,
              name: actor.name,
              nacionality: 'BRA',
              dateOfBirth: '01/01/1970'
            }
          }
        })

        return actors
      }
    },
    crew: {
      type: new GraphQLList(creditType),
      description: `Movie's crew  `,
      resolve: async movie => {
        const { data } = await searchMovieCredits(movie.id)
        const actors = data?.crew.map(actor => {
          return {
            role: actor.job,
            person: {
              id: actor.id,
              name: actor.name,
              nacionality: 'BRA',
              dateOfBirth: '01/01/1970'
            }
          }
        })

        return actors
      }
    }
  })
})

export const { connectionType: MovieConnection, edgeType: MovieEdge } = connectionDefinitions({
  nodeType: movieType
})
