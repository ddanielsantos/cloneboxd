import { GraphQLFloat, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { cast } from './cast'

export const movie = new GraphQLObjectType({
  name: 'Movie',
  description: 'Movie type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the movie'
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie title in its original language'
    },
    duration: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie duration'
    },
    releaseDate: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie global release date'
    },
    genres: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      description: 'Movie genres'
    },
    ageGroup: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Movie age group'
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Movie rating according to users'
    },
    actors: {
      type: (new GraphQLList((cast))),
      description: 'Movie actors'
    },
    directors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(cast))),
      description: 'Movie directors'
    }
  })
})
