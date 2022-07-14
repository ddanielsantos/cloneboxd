import { GraphQLString } from 'graphql'
import { UserModel } from '../userModel'
import { genSaltSync, hashSync } from 'bcrypt'
import { userInputType, userType } from '../userTypes'
import { mutationWithClientMutationId } from 'graphql-relay'

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
      type: GraphQLString,
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

      return { user: document, token: document.generateToken() }
    } catch (error: any) {
      return {
        error: error.message
      }
    }
  }
})
