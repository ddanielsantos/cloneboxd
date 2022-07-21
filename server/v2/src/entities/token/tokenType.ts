import { GraphQLObjectType, GraphQLString } from 'graphql'

export const tokenType = new GraphQLObjectType({
  name: 'Token',
  description: 'The access and the refresh token',
  fields: {
    accessToken: {
      type: GraphQLString,
      description: 'The access token, needed to authenticate',
      resolve: ({ accessToken }) => accessToken
    },
    refreshToken: {
      type: new GraphQLObjectType({
        name: 'RefreshToken',
        fields: {
          expiresIn: {
            type: GraphQLString,
            description: '',
            resolve: ({ expiresIn }) => expiresIn.getTime()
          },
          value: {
            type: GraphQLString,
            description: 'The refresh token, used to generate a new access token',
            resolve: ({ value }) => value
          }
        }
      }),
      resolve: ({ refreshToken }) => refreshToken
    }
  }
})
