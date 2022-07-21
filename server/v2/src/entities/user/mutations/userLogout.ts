import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql'
import { Token } from '../../token/TokenModel'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { errorField } from '../../../graphql/errorField'

export const userLogout: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: 'userLogoutPayload',
    fields: {
      ...errorField
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
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  }
}
