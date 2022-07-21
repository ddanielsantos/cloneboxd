import { userType } from '../userTypes'
import { UserModel } from '../userModel'
import { GraphQLNonNull, GraphQLString } from 'graphql'
import { tokenType } from '../../token/tokenType'
import { mutationWithClientMutationId } from 'graphql-relay'
import { Token } from '../../token/TokenModel'
import { errorField } from '../../../graphql/errorField'

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

    const accessToken = Token.generateAccessToken(user.id)

    try {
      const refreshToken = await Token.generateRefreshToken(user.id)

      const token = {
        accessToken,
        refreshToken
      }

      return {
        token,
        user
      }
    } catch (error: unknown) {
      return {
        error: (error as Error).message
      }
    }
  },
  outputFields: {
    token: {
      type: tokenType,
      resolve: response => response.token
    },
    user: {
      type: userType,
      resolve: response => response.user
    },
    ...errorField
  }
})
