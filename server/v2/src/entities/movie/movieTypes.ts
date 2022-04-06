import {
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

export const movieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'Movie type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Movie's unique id`,
      resolve: movie => movie._id
    },
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
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
      description: `Movie's actors`,
      resolve: movie => movie.actors
    },
    directors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
      description: `Movie's directors`,
      resolve: movie => movie.directors
    }
  })
})

export const movieInputType = new GraphQLInputObjectType({
  name: 'MovieInput',
  description: 'Movie input type',
  fields: {
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
})
