import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql'

export const pageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: info => info.hasNextPage
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: info => info.hasPreviousPage
    },
    startCursor: {
      type: GraphQLString,
      resolve: info => info.startCursor
    },
    endCursor: {
      type: GraphQLString,
      resolve: info => info.endCursor
    }
  }
})
