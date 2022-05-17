import { graphql } from "react-relay";

export const userQuery = graphql`
  query userQuery {
    me {
      fullName
    }
  }
`