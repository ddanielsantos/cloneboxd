import { crewType } from '../crew/crewTypes'
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
import { CrewModel } from '../crew/crewModel'
import { nodeInterface } from '../../graphql/nodeInterface'
import { globalIdField, connectionDefinitions } from 'graphql-relay'

export const movieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'Movie type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('Movie', movie => movie._id),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's title in its original language`,
      resolve: movie => movie.title
    },
    duration: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's duration`,
      resolve: movie => movie.duration
    },
    releaseDate: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's global release date`
    },
    posterPath: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's poster path`,
      resolve: movie => movie.posterPath
    },
    genres: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      description: `Movie's genres`,
      resolve: movie => movie.genres
    },
    ageGroup: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's age group`,
      resolve: movie => movie.ageGroup
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: `Movie's rating according to users`,
      resolve: movie => movie.rating
    },
    actors: {
      type: new GraphQLList(crewType),
      description: `Movie's actors`,
      resolve: async movie => {
        const actors = await CrewModel.find({
          _id: {
            $in: movie.actors
          }
        })

        return actors
      }
    },
    directors: {
      type: new GraphQLList(crewType),
      description: `Movie's directors`,
      resolve: async movie => {
        const directors = await CrewModel.find({
          _id: {
            $in: movie.directors
          }
        })

        return directors
      }
    },
    submitedBy: {
      type: GraphQLString,
      description: `Admin who submited the movie`,
      resolve: movie => movie.submitedBy
    }
  })
})

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
