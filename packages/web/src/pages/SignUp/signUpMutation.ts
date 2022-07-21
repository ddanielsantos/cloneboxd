import { graphql } from 'react-relay'

export const signUpMutation = graphql`
  mutation signUpMutation($input: userCreateInput!) {
    userCreate(input: $input) {
      user{
        id
        fullName
      }
      token {
        accessToken
        refreshToken {
          value
          expiresIn
        }
      }
      error
    }
  }
`