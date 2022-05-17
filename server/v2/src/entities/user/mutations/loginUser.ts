import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { isEmailAlreadyUsed } from '../isEmailAlreadyUsed'
import { compareSync } from 'bcrypt'
import { userRepository } from '../userRepository'
import * as jwt from 'jsonwebtoken'
import { getEnvironmentVariables } from '../../../config/env'
import { userType } from '../userTypes'

type LoginInput = {
  email: string,
  password: string
}

const jwtSecret = getEnvironmentVariables().JWT_SECRET || ''

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
        user: null,
        token: null
      }
    }

    const [user] = await userRepository.findByProperty({ email })

    const isCorrectPassword = compareSync(password, user.password)

    if (!isCorrectPassword) {
      return {
        error: 'Invalid credentials',
        user: null,
        token: null
      }
    }

    const token = jwt.sign({ id: user._id.toString(), admin: user.isAdmin }, jwtSecret, { expiresIn: '0.5h' })

    return {
      token,
      user: user,
      error: null
    }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: response => response.token
    },
    user: {
      type: userType,
      resolve: response => response.user
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  }
})
