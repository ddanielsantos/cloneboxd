import { graphql } from 'react-relay'

export const loginMutation = graphql`
  mutation loginMutation($input: loginUserInput!) {
    loginUser (input: $input) {
      token
      error
      user {
        id
        fullName
        email
      }
    }
  }
`