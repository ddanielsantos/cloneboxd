import { UserModel } from '../userModel'
import { genSaltSync, hashSync } from 'bcrypt'
import { userInputType, userType } from '../userTypes'
import { mutationWithClientMutationId } from 'graphql-relay'
import { Token } from '../../token/TokenModel'
import { tokenType } from '../../token/tokenType'
import { errorField } from '../../../graphql/errorField'

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
    ...errorField
  },
  mutateAndGetPayload: async ({ confirmPassword, ...payload }) => {
    if (payload.password !== confirmPassword) {
      return {
        error: 'Passwords do not match'
      }
    }

    const isEmailAlreadyUsed = await UserModel.findOne({ email: payload.email })

    if (isEmailAlreadyUsed) {
      return {
        error: 'Invalid credentials'
      }
    }
    const usernameAlreadyUsed = await UserModel.findOne({ username: payload.username })

    if(usernameAlreadyUsed) {
      return {
        error: 'Username already used'
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
      const refreshToken =  await Token.generateRefreshToken(document.id)

      const token = {
        accessToken: Token.generateAccessToken(document.id),
        refreshToken
      }
      
      await document.save()

      return { user: document, token }
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  }
})
