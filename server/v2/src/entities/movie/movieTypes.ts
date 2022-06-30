import {
  GraphQLID,
  ThunkObjMap,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig
} from 'graphql'
import { nodeInterface } from '../../graphql/nodeInterface'
import { globalIdField, connectionDefinitions } from 'graphql-relay'
import { creditType } from '../credit/creditType'

// import { tmdbAPI } from '../../services/tmdb/api'
// TODO: change json to TMDB endpoints

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
      // TODO: fix any inferation
      resolve: async movie => {
        const { runtime: duration } = require('../../../temp/movie.json')

        return duration + ' min'
      }
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's description`,
      resolve: async movie => {
        const { overview } = require('../../../temp/movie.json')

        return overview
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
        const { genres } = require('../../../temp/movie.json') as { genres: { name: string }[] }
        const a = genres.map(genre => genre.name)
        return a
      }
    },
    ageGroups: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: `Movie's age group`,
      resolve: movie => movie.ageGroup
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
        const { cast } = require('../../../temp/credits.json') as { cast: any[] }

        const actors = cast.reduce((acc, actor) => {
          if (actor.known_for_department === 'Acting') {
            acc.push({
              ...actor,
              role: actor.character
            })
          }
          return acc
        }, [])

        return actors
      }
    },
    crew: {
      type: new GraphQLList(creditType),
      description: `Movie's crew  `,
      resolve: async movie => {
        const { crew } = require('../../../temp/credits.json') as { crew: any[] }

        const directors = crew.map(director => ({
          ...director,
          role: director.known_for_department
        }))

        return directors
      }
    }
  })
})

// TODO remove this
export const movieInputType: ThunkObjMap<GraphQLInputFieldConfig> = {
  title: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Movie's title in its original language`
  },
  duration: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Movie's duration`
  },
  releaseDate: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Movie's global release date`
  },
  genres: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
    description: `Movie's genres`
  },
  ageGroup: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Movie's age group`
  },
  rating: {
    type: new GraphQLNonNull(GraphQLFloat),
    description: `Movie's rating according to users`
  },
  actors: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
    description: `Movie's actors`
  },
  directors: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
    description: `Movie's directors`
  }
}

export const { connectionType: MovieConnection, edgeType: MovieEdge } = connectionDefinitions({
  nodeType: movieType
})
