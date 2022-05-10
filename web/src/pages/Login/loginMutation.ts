import { graphql } from 'react-relay'

export const loginMutation = graphql`
  mutation commitLoginMutation($input: loginUserInput!) {
    loginUser (input: $input) {
      token
      error
    }
  }
`