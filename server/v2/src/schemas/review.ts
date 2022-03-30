import { GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const review = new GraphQLObjectType({
  name: 'User review',
  description: 'User review type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the review'
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the user'
    },
    movieId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the movie'
    },
    review: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User review'
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'User rating'
    }
  })
})
