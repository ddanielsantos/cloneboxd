import { Button, Flex } from '@chakra-ui/react'
import { graphql, usePaginationFragment } from 'react-relay'

import type { CommentList_review$key } from './__generated__/CommentList_review.graphql'
import type { CommentListPaginationQuery } from './__generated__/CommentListPaginationQuery.graphql'
import { NoComments } from '../NoComments/NoComments'
import { CommentCard } from './CommentCard/CommentCard'

type Props = {
  fragmentRef: CommentList_review$key
}

export const CommentList = (props: Props) => {
  const { data, hasPrevious, isLoadingPrevious, loadPrevious } = usePaginationFragment<CommentListPaginationQuery, CommentList_review$key>(graphql`
    fragment CommentList_review on UserReview 
    @argumentDefinitions (
      last: { type: Int, defaultValue: 10 },
      before: { type: String }
    )
    @refetchable(queryName: "CommentListPaginationQuery") {
      comments(last: $last, before: $before) @connection(key: "Review_comments"){
        edges {
          ...CommentCard_comment
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
            : data?.comments?.edges?.map((comment, index) => {
              return comment && <CommentCard key={index} fragmentRef={comment} />
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
