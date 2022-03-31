import { GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const review = new GraphQLObjectType({
  name: 'User review',
  description: 'User review type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the review',
      resolve: review => review.id
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the user',
      resolve: review => review.userId
    },
    movieId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the movie',
      resolve: review => review.movieId
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User review',
      resolve: review => review.text
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'User rating',
      resolve: review => review.rating
    }
  })
})
