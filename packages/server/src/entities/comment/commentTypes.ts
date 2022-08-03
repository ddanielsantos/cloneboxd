import { userType } from '../user/userTypes'
import { nodeInterface } from '../../graphql/nodeInterface'
import { GraphQLObjectType, GraphQLString } from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { entityRegister } from '../../graphql/entityHelpers'
import { CommentModel } from './commentModel'

export const commentType = new GraphQLObjectType({
  name: 'Comment',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('Comment', comment => comment._id),
    user: {
      type: userType,
      resolve: comment => comment.user
    },
    content: {
      type: GraphQLString,
      resolve: comment => comment.content
    }
  }
})

export const { connectionType: CommentConnection, edgeType: CommentEdge } = connectionDefinitions({
  nodeType: commentType
})

entityRegister({
  type: commentType,
  nodeResolver: async (id) => await CommentModel.findById(id)
})
