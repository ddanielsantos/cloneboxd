import { VStack, Box, Avatar, Link, Text } from "@chakra-ui/react"
import { graphql, useFragment } from "react-relay"

import type { LatestReviews__review$key } from './__generated__/LatestReviews__review.graphql'

type Props = { data: LatestReviews__review$key }

export const LatestReviews = ({ data }: Props) => {
  const response = useFragment<LatestReviews__review$key>(graphql`
    fragment LatestReviews__review on Query {
      latest: reviewList(movie: $id first: 3) {
        edges {
          node {
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
        latest?.edges?.map((edge, ind) => {
          return (
            <Box
              key={ind}
              w={'100%'}
              borderRadius={'md'}
              p={'1em'}
              _hover={{
                bg: 'whiteAlpha.200',
                transitionDuration: '0.5s',
              }}
              gap={'1em'}
              display={'flex'}
            >
              <Avatar size="sm" />
              <Box
                fontSize={'sm'}
                display='flex'
                flexDirection={'column'}
                justifyContent={'space-evenly'}
                gap={'1em'}
              >
                <Text>
                  a {edge?.node?.rating} &#x2605; review by
                  <Link
                    ml={1}
                  >
                    {edge?.node?.user.fullName}
                  </Link>
                </Text>
                <Text textAlign={'justify'}>{edge?.node?.text}</Text>
              </Box>
            </Box>
          )
        })
      }

    </VStack>
  )
}