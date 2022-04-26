import { GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { isEmailAlreadyUsed } from '../isEmailAlreadyUsed'
import { User, userRepository } from '../userRepository'
import { genSaltSync, hashSync } from 'bcrypt'
import { userInputType } from '../userTypes'

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
    }
  },
  mutateAndGetPayload: async (payload: User, ctx) => {
    const emailAlreadyUsed = await isEmailAlreadyUsed(payload.email)

    if (emailAlreadyUsed) throw new Error('E-mail already used')

    const salt = genSaltSync()
    const hashedPassword = hashSync(payload.password, salt)

    const { insertedId } = await userRepository.insertOne({ ...payload, password: hashedPassword })

    return { insertedId }
  }
})
