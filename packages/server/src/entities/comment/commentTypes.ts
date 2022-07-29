import { userType } from '../user/userTypes'
import { GraphQLObjectType, GraphQLString } from 'graphql'

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
