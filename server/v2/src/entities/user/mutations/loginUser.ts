import { UserModel } from '../userModel'
import { userType } from '../userTypes'
import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

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

    const user = await UserModel.findOne({ email })

    if (!user) {
      return {
        error: 'Invalid credentials'
      }
    }

    const isCorrectPassword = user.validatePassword(password)

    if (!isCorrectPassword) {
      return {
        error: 'Invalid credentials'
      }
    }

    const token = user.generateToken()

    return {
      token,
      user
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
