import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql'
import { pageInfoType } from './pageInfoType'

export function getConnectionObjects(node: GraphQLObjectType) {
  const edge = new GraphQLObjectType({
    name: `${node.name}Edge`,
    fields: {
      cursor: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: edge => edge.cursor
      },
      node: {
        type: node,
        resolve: edge => edge.node
      }
    }
  })

  const connection = new GraphQLObjectType({
    name: `${node.name}Connection`,
    fields: {
      edges: {
        type: new GraphQLList(edge),
        resolve: connection => connection.edges
      },
      pageInfo: {
        type: new GraphQLNonNull(pageInfoType),
        resolve: connection => connection.pageInfo
      }
    }
  })

  return { edge, connection }
}
