import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

export const user = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `User's unique identifier`,
      resolve: user => user._id
    },
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's full name`,
      resolve: user => user.fullName
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's email`,
      resolve: user => user.email
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User password`
    }
  })
})

export const userInput = new GraphQLInputObjectType({
  name: 'UserInput',
  description: `User input type`,
  fields: () => ({
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's full name`
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's email`
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's password`
    }
  })
})
