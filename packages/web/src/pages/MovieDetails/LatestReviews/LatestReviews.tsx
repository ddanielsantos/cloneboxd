import { VStack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { Review } from '../../../components/Review/Review'

import type { LatestReviews__review$key } from './__generated__/LatestReviews__review.graphql'

type Props = { data: LatestReviews__review$key }

export const LatestReviews = ({ data }: Props) => {
  const response = useFragment<LatestReviews__review$key>(graphql`
    fragment LatestReviews__review on Query {
      latest: reviewList(movie: $id first: 3) {
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

  const { latest } = response

  if (latest?.edges?.length === 0) {
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
        latest?.edges?.map(edge => {
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
