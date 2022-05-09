import {
  graphql,
  commitMutation,
  Environment,
} from 'react-relay'

import { commitSignUpMutation, commitSignUpMutation$variables } from './__generated__/commitSignUpMutation.graphql'

export function commitSignUp(environment: Environment, variables: commitSignUpMutation$variables) {
  return commitMutation<commitSignUpMutation>(environment, {
    mutation: graphql`
      mutation commitSignUpMutation($input: userCreateInput!) {
        userCreate(input: $input) {
          insertedId
          error
        }
      }
    `,
    variables,
    onCompleted: (data) => {
      if (data?.userCreate?.error) {
        alert(data.userCreate.error)
      }

      if (data?.userCreate?.insertedId) {
        console.log(data.userCreate.insertedId)
      }
    }
  })
}