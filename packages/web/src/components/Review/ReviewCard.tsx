import { Box, Avatar, Text, Link, Flex, useColorMode } from '@chakra-ui/react'
import { GoComment } from 'react-icons/go'
import { startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { graphql, useFragment } from 'react-relay'

import type { ReviewCard__review$key } from './__generated__/ReviewCard__review.graphql'

type Props = {
  data: ReviewCard__review$key
}

export const ReviewCard = ({ data }: Props) => {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  const response = useFragment(graphql`
    fragment ReviewCard__review on UserReview {
      id
      user {
        username
        fullName
      }
      totalComments
      rating
      text
    }
  `, data)

  return (
    <Box
      w={'100%'}
      borderRadius={'md'}
      p={'1em'}
      onClick={() => {
        startTransition(() => navigate(`/review/${response.id}`))
      }}
      _hover={{
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.300',
        transitionDuration: '0.5s'
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
          a {response.rating} &#x2605; review by
          <Link
            ml={1}
            onClick={(event) => {
              event.stopPropagation()
              startTransition(() => navigate(`/profile/${response.user.username}`))
            }}
          >
            {response.user.fullName}
          </Link>
        </Text>
        <Text textAlign={'justify'}>{response.text}</Text>
        <Flex
          alignItems={'center'}
          gap='0.5em'
        >
          <Text>{response.totalComments}</Text>
          <GoComment size={18} />
        </Flex>
      </Box>
    </Box>
  )
}
