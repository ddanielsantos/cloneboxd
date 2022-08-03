import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig,
  ThunkObjMap
} from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { nodeInterface } from '../../graphql/nodeInterface'
import { entityRegister } from '../../graphql/entityHelpers'
import { UserModel } from './userModel'

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('User', user => user._id),
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's full name`,
      resolve: user => user.fullName
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's username`,
      resolve: user => user.username
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's email`,
      resolve: user => user.email
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
  username: {
    type: new GraphQLNonNull(GraphQLString),
    description: `User's username`
  },
  password: {
    type: new GraphQLNonNull(GraphQLString),
    description: `User's password`
  },
  confirmPassword: {
    type: new GraphQLNonNull(GraphQLString),
    description: `User's confirm password`
  }
}

export const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: userType
})

entityRegister({
  type: userType,
  nodeResolver: async (id) => await UserModel.findById(id)
})
