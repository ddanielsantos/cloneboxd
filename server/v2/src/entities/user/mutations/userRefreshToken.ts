import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { Token } from '../../token/TokenModel'

type RefreshInput = {
  refreshToken: string
}

export const userRefreshToken = mutationWithClientMutationId({
  name: 'userRefreshToken',
  description: 'From a gien refresh token, generate a new access token',
  inputFields: {
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (payload: RefreshInput) => {
    const { refreshToken } = payload

    try {
      const accessToken = await Token.refresh(refreshToken)

      return {
        accessToken
      }
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  },
  outputFields: {
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: response => response.accessToken
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  }
})
