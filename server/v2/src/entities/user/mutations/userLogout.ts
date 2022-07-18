import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql'
import { Token } from '../../token/TokenModel'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'

export const userLogout: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: 'userLogoutPayload',
    fields: {
      error: {
        type: GraphQLString
      }
    }
  }),
  resolve: async (_parent, _args, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || !payload) {
      return {
        error
      }
    }

    try {
      await Token.revoke(payload.id)

      return {
        error: null
      }
    } catch (e: unknown) {
      return {
        error: (e as Error).message
      }
    }
  }
}
