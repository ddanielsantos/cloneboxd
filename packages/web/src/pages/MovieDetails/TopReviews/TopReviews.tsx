import { VStack, Text } from "@chakra-ui/react"
import { graphql, useFragment } from "react-relay"
import { Review } from "../../../components/Review/Review"

import type { TopReviews__review$key } from './__generated__/TopReviews__review.graphql'

type Props = { data: TopReviews__review$key }

// TODO: [web - movie details] - top reviews should be based on the number of likes
export const TopReviews = ({ data }: Props) => {
  const response = useFragment<TopReviews__review$key>(graphql`
    fragment TopReviews__review on Query {
      topReviews: reviewList(movie: $id first: 3 sort: "rating") {
        edges {
          node {
            id
            rating
            text
            user{
              fullName
            }
            movie {
              title
            }
          }
        }
      }
    }
  `, data)

  const { topReviews } = response

  if (topReviews?.edges?.length === 0) {
    return (
      <Text
        py={'2em'}
        textAlign='center'
      >
        no reviews
      </Text>
    )
  }

  return (
    <VStack gap={'0.5em'}
      w="100%"
    >
      {
        topReviews?.edges?.map(edge => {
          return (
            <Review
              key={edge?.node?.id}
              id={edge?.node?.id}
              rating={edge?.node?.rating}
              text={edge?.node?.text}
              user={edge?.node?.user}
            />
          )
        })
      }

    </VStack>
  )
}