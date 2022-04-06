import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig,
  ThunkObjMap
} from 'graphql'

export const userType = new GraphQLObjectType({
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
      description: `User password`,
      resolve: user => user.password
    }
  })
})

export const userInputType: ThunkObjMap<GraphQLInputFieldConfig> = {
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
}
