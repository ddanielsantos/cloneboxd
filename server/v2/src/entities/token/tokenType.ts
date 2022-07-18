import { GraphQLObjectType, GraphQLString } from 'graphql'

export const tokenType = new GraphQLObjectType({
  name: 'Token',
  description: 'The access and the refresh token neccessary to authenticate',
  fields: {
    accessToken: {
      type: GraphQLString,
      resolve: ({ accessToken }) => accessToken
    },
    refreshToken: {
      type: new GraphQLObjectType({
        name: 'RefreshToken',
        fields: {
          expiresIn: {
            type: GraphQLString,
            resolve: ({ expiresIn }) => expiresIn.getTime()
          },
          refreshToken: {
            type: GraphQLString,
            resolve: ({ refreshToken }) => refreshToken
          }
        }
      }),
      resolve: ({ refreshToken }) => refreshToken
    }
  }
})
