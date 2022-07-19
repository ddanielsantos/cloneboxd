import { GraphQLString } from 'graphql'
import { UserModel } from '../userModel'
import { genSaltSync, hashSync } from 'bcrypt'
import { userInputType, userType } from '../userTypes'
import { mutationWithClientMutationId } from 'graphql-relay'
import { Token } from '../../token/TokenModel'
import { tokenType } from '../../token/tokenType'

export const userCreate = mutationWithClientMutationId({
  name: 'userCreate',
  description: 'Creates a new user',
  inputFields: {
    ...userInputType
  },
  outputFields: {
    user: {
      type: userType,
      resolve: response => response.user
    },
    token: {
      type: tokenType,
      resolve: response => response.token
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ confirmPassword, ...payload }) => {
    if (payload.password !== confirmPassword) {
      return {
        error: 'Passwords do not match'
      }
    }

    const isEmailAlreadyUsed = !!(await UserModel.findOne({ email: payload.email }))

    if (isEmailAlreadyUsed) {
      return {
        error: 'Invalid credentials'
      }
    }

    const salt = genSaltSync()
    const hashedPassword = hashSync(payload.password, salt)

    const document = new UserModel({
      ...payload,
      password: hashedPassword,
      isAdmin: false
    })

    try {
      await document.validate()
      await document.save()

      const token = {
        accessToken: Token.generateAccessToken(document.id),
        refreshToken: await Token.generateRefreshToken(document.id)
      }

      return { user: document, token }
    } catch (error: any) {
      return {
        error: error.message
      }
    }
  }
})
