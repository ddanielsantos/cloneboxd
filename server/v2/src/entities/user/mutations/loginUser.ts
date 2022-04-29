import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { isEmailAlreadyUsed } from '../isEmailAlreadyUsed'
import { compareSync } from 'bcrypt'
import { randomBytes } from 'crypto'
import { userRepository } from '../userRepository'

type LoginInput = {
  email: string,
  password: string
}

export const loginUser = mutationWithClientMutationId({
  name: 'loginUser',
  description: 'Login a user',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)

    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (payload: LoginInput) => {
    const { email, password } = payload
    const isEmailUsed = await isEmailAlreadyUsed(email)

    if (!isEmailUsed) {
      return {
        error: 'Invalid credentials',
        token: null
      }
    }

    const [user] = await userRepository.findByProperty({ email })

    const isCorrectPassword = compareSync(password, user.password)

    if (!isCorrectPassword) {
      return {
        error: 'Invalid credentials',
        token: null
      }
    }

    return {
      token: randomBytes(16).toString('hex'),
      error: null
    }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: response => response.token
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  }
})
