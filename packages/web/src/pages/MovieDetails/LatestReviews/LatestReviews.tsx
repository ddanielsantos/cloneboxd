import { VStack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { ReviewCard } from '../../../components/Review/ReviewCard'

import type { LatestReviews__review$key } from './__generated__/LatestReviews__review.graphql'

type Props = { data: LatestReviews__review$key }

export const LatestReviews = ({ data }: Props) => {
  const response = useFragment<LatestReviews__review$key>(graphql`
    fragment LatestReviews__review on Query {
      latest: reviewList(movie: $id first: 3) {
        edges {
          node {
            id
            ...ReviewCard__review
            comments {
              edges {
                node {
                  user {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `, data)

  const { latest } = response

  if (!latest?.edges?.length) {
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
        latest.edges.map(edge => {
          if (!edge?.node) return null

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
