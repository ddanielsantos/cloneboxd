import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql'
import { Token } from '../../token/TokenModel'
import { errorField } from '../../../graphql/errorField'

export const userLogout: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLObjectType({
    name: 'userLogoutPayload',
    fields: {
      ...errorField
    }
  }),
  resolve: async (_parent, _args, ctx) => {
    if (ctx.user) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      await Token.revoke(ctx.user.id)

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
