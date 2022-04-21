import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig,
  ThunkObjMap
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface } from '../../graphql/nodeInterface'

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('User'),
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

// TODO: do the same to other inputs
// and find where to insert connections
// and edges (probably on queries and mut)
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
