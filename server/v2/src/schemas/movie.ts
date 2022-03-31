import { GraphQLFloat, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { cast } from './cast'

export const movie = new GraphQLObjectType({
  name: 'Movie',
  description: 'Movie type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the movie',
      resolve: movie => movie.id
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie title in its original language',
      resolve: movie => movie.title
    },
    duration: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie duration',
      resolve: movie => movie.duration
    },
    releaseDate: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie global release date'
    },
    genres: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      description: 'Movie genres',
      resolve: movie => movie.genres
    },
    ageGroup: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie age group',
      resolve: movie => movie.ageGroup
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Movie rating according to users',
      resolve: movie => movie.rating
    },
    actors: {
      type: (new GraphQLList((cast))),
      description: 'Movie actors',
      resolve: movie => movie.actors
    },
    directors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(cast))),
      description: 'Movie directors',
      resolve: movie => movie.directors
    }
  })
})
