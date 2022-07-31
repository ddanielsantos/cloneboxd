import { userType } from '../user/userTypes'
import { GraphQLObjectType, GraphQLString } from 'graphql'
import { connectionDefinitions } from 'graphql-relay'

export const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
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
