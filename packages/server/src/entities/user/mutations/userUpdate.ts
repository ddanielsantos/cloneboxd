import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { UserModel } from '../userModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { userType } from '../userTypes'
import { hashSync, genSaltSync } from 'bcrypt'
import { errorField } from '../../../graphql/errorField'

export const userUpdate = mutationWithClientMutationId({
  name: 'userUpdate',
  description: 'Update a user using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's full name`
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's password`
    }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: response => response.user
    },
    ...errorField
  },
  mutateAndGetPayload: async ({ id, ...user }, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload === null) {
      return {
        error: 'Unauthorized',
        result: null
      }
    }

    if (payload.id !== fromGlobalId(id).id) {
      return {
        error: 'Unauthorized'
      }
    }

    const salt = genSaltSync()
    const hashedPassword = hashSync(user.password, salt)

    try {
      const result = await UserModel.findByIdAndUpdate(fromGlobalId(id).id, {
        ...user,
        password: hashedPassword
      }, { new: true })

      if (result === null) {
        return {
          error: 'User not found'
        }
      }

      return { user: result }
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  }
})
