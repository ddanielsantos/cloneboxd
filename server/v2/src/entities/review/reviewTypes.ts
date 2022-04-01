import {
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql'

export const review = new GraphQLObjectType({
  name: 'UserReview',
  description: `Users review's type`,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Review's unique identifier`,
      resolve: review => review._id
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `User's unique identifier`,
      resolve: review => review.userId
    },
    movieId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Movie's unique identifier`,
      resolve: review => review.movieId
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's review`,
      resolve: review => review.text
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: `User's rating`,
      resolve: review => review.rating
    }
  })
})

export const reviewInput = new GraphQLObjectType({
  name: 'UserReviewInput',
  description: `User review's input type`,
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `User's unique identifier`,
      resolve: review => review.userId
    },
    movieId: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Movie's unique identifier`,
      resolve: review => review.movieId
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Users review's text`,
      resolve: review => review.text
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: `User review's rating`,
      resolve: review => review.rating
    }
  })
})
