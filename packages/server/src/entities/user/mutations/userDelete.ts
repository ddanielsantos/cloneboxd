import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { UserModel } from '../userModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { errorField } from '../../../graphql/errorField'

export const userDelete = mutationWithClientMutationId({
  name: 'userDelete',
  description: 'Delete a user using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    deletedCount: {
      type: GraphQLString,
      resolve: response => response.deletedCount
    },
    ...errorField
  },
  mutateAndGetPayload: async ({ id }, ctx) => {
    if (!ctx.user) {
      return {
        error: 'Unauthorized',
        review: null
      }
    }

    if (ctx.user.id !== fromGlobalId(id).id) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      const response = await UserModel.deleteOne({
        _id: fromGlobalId(id).id
      })

      return response
    } catch (error: unknown) {
      return { error: (error as Error).message }
    }
  }
})
