import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { graphql, usePaginationFragment } from 'react-relay'

import type { CommentList_review$key } from './__generated__/CommentList_review.graphql'
import type { CommentListPaginationQuery } from './__generated__/CommentListPaginationQuery.graphql'
import { startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoComments } from '../NoComments/NoComments'

type Props = {
  fragmentRef: CommentList_review$key
}

export const CommentList = (props: Props) => {
  const navigate = useNavigate()
  const { data, hasPrevious, isLoadingPrevious, loadPrevious } = usePaginationFragment<CommentListPaginationQuery, CommentList_review$key>(graphql`
    fragment CommentList_review on UserReview 
    @argumentDefinitions (
      last: { type: Int, defaultValue: 10 },
      before: { type: String }
    )
    @refetchable(queryName: "CommentListPaginationQuery") {
      comments(last: $last, before: $before) @connection(key: "Review_comments"){
        edges {
          node {
            id
            user {
              id
              username
              fullName
            }
            content
          }
        }
      }
    }
  `, props.fragmentRef)

  const loadMore = () => {
    if (!hasPrevious) return

    loadPrevious(10)
  }

  return (
    <>
      <Flex
        flexDir='column-reverse'
      >
        {
          !data?.comments?.edges?.length
            ? <NoComments />
            : data?.comments?.edges?.map(comment => {
              return (
                <Box
                  key={comment?.node?.id}
                  borderRadius={'md'}
                  p={'1em'}
                  _hover={{
                    bg: 'gray.200',
                    transitionDuration: '0.5s'
                  }}
                >
                  <Link
                    onClick={() => {
                      startTransition(() => navigate(`/profile/${comment?.node?.user?.username}`))
                    }}
                  >
                    {
                      comment?.node?.user?.fullName || 'Cléber'
                    }
                  </Link>
                  <Text>
                    {comment?.node?.content}
                  </Text>
                </Box>
              )
            })
        }
      </Flex>

      {
        hasPrevious &&
        <Button
          isLoading={isLoadingPrevious}
          onClick={loadMore}
          w='fit-content'
          alignSelf={'center'}
        >
          load more
        </Button>
      }
    </>
  )
}
