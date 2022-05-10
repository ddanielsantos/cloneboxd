import { graphql } from 'react-relay'

export const signUpMutation = graphql`
  mutation commitSignUpMutation($input: userCreateInput!) {
    userCreate(input: $input) {
      insertedId
      error
    }
  }
`