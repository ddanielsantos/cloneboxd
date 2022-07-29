import { VStack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { ReviewCard } from '../../../components/Review/ReviewCard'

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
            ...ReviewCard__review
            comments {
              user {
                id
              }
            }
          }
        }
      }
    }
  `, data)

  const { topReviews } = response

  if (!topReviews?.edges?.length) {
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
        topReviews.edges.map(edge => {
          if (!edge?.node) return

          return (
            <ReviewCard
              key={edge?.node?.id}
              data={edge?.node}
            />
          )
        })
      }

    </VStack>
  )
}
