import { GraphQLString } from 'graphql'

export const errorField = {
  error: {
    type: GraphQLString,
    resolve: (response: any) => response.error
  }
}
