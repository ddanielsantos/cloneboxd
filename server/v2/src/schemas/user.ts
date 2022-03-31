import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

export const user = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the user',
      resolve: user => user.id
    },
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's full name`,
      resolve: user => user.fullName
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User email',
      resolve: user => user.email
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User password'
    }

  })
})
