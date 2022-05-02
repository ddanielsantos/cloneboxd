import { GraphQLString } from 'graphql'
import { userInputType } from '../userTypes'
import { genSaltSync, hashSync } from 'bcrypt'
import { User, userRepository } from '../userRepository'
import { isEmailAlreadyUsed } from '../isEmailAlreadyUsed'
import { mutationWithClientMutationId } from 'graphql-relay'

export const userCreate = mutationWithClientMutationId({
  name: 'userCreate',
  description: 'Creates a new user',
  inputFields: {
    ...userInputType
  },
  outputFields: {
    insertedId: {
      type: GraphQLString,
      resolve: response => response.insertedId
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ confirmPassword, ...payload }: User & { confirmPassword: string }) => {
    if (payload.password !== confirmPassword) {
      return {
        error: 'Passwords do not match',
        insertedId: null
      }
    }

    const emailAlreadyUsed = await isEmailAlreadyUsed(payload.email)

    if (emailAlreadyUsed) {
      return {
        error: 'Invalid credentials',
        insertedId: null
      }
    }

    const salt = genSaltSync()
    const hashedPassword = hashSync(payload.password, salt)

    const { insertedId } = await userRepository.insertOne({ ...payload, password: hashedPassword, isAdmin: false })

    return { insertedId, error: null }
  }
})
