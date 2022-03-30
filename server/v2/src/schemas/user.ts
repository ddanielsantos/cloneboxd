import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

export const user = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the user'
    },
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's full name`
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User email'
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User password'
    }

  })
})
