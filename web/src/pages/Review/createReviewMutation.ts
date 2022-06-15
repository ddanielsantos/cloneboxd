import { graphql } from 'relay-runtime'

export const createReviewMutation = graphql`
  mutation createReviewMutation ($input: reviewCreateInput!) {
    reviewCreate (input: $input) {
      review {
        id
      }
      error
    }
  }
`