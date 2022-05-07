import {
  graphql,
  commitMutation,
  Environment,
} from 'react-relay'

import { commitLoginMutation, commitLoginMutation$variables } from './__generated__/commitLoginMutation.graphql'

export function commitLogin(environment: Environment, variables: commitLoginMutation$variables) {
  return commitMutation<commitLoginMutation>(environment, {
    mutation: graphql`
      mutation commitLoginMutation($input: loginUserInput!) {
        loginUser (input: $input) {
          token
          error
        }
      }
    `,
    variables,
    onCompleted: (data) => {
      if (data?.loginUser?.error) {
        alert(data.loginUser.error)
      }

      if (data?.loginUser?.token) {
        console.log(data.loginUser.token)
      }
    }
  })
}