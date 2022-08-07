import { Box, Flex, IconButton, Link, Text, useToast, Textarea } from '@chakra-ui/react'
import { startTransition, useState } from 'react'
import { GoCheck, GoPencil, GoTrashcan, GoX } from 'react-icons/go'
import { useFragment, useMutation } from 'react-relay'
import { useNavigate } from 'react-router-dom'
import { graphql } from 'relay-runtime'

import type { CommentCard_comment$key } from './__generated__/CommentCard_comment.graphql'
import type { CommentCardUpdateMutation } from './__generated__/CommentCardUpdateMutation.graphql'

type Props = {
  fragmentRef: CommentCard_comment$key
}

export const CommentCard = (props: Props) => {
  const toast = useToast()
  const navigate = useNavigate()
  const data = useFragment(graphql`
    fragment CommentCard_comment on CommentEdge {
      node {
        id
        content
        user {
          username
          fullName
        }
      }
    }
  `, props.fragmentRef)

  const [comment, setComment] = useState(data?.node?.content)
  const [editMode, setEditMode] = useState(false)

  const [commitUpdate, isUpdating] = useMutation<CommentCardUpdateMutation>(graphql`
    mutation CommentCardUpdateMutation($input: commentUpdateInput!) {
      commentUpdate(input: $input) {
        error
        comment {
          id
          content
        }
      }
    }
  `)

  const handleInitEdition = () => {
    if (!comment) return

    setEditMode(true)
  }

  const handleCancelEdition = () => {
    setEditMode(false)
    setComment(data?.node?.content)
  }

  const handleUpdate = () => {
    if (!editMode || !data?.node?.id || !comment) return

    commitUpdate({
      variables: {
        input: {
          id: data?.node?.id,
          content: comment
        }
      },
      onCompleted: ({ commentUpdate }) => {
        setEditMode(false)

        if (commentUpdate?.error) {
          toast({
            title: 'Erro',
            description: commentUpdate.error,
            status: 'error',
            duration: 2500
          })
          setComment(data?.node?.content)
          return
        }

        if (commentUpdate?.comment?.content) {
          toast({
            description: 'Comment updated',
            status: 'success',
            duration: 2500
          })
        }
      },
      onError: () => {
        toast({
          title: 'Erro',
          description: 'An internal error occurred',
          status: 'error',
          duration: 2500
        })
      }
    })
  }

  return (
    <Flex
      w='100%'
      borderRadius={'md'}
      p={'1em'}
      _hover={{
        bg: 'gray.200',
        transitionDuration: '0.5s'
      }}
    // direction={ }
    >
      <Box
        key={data?.node?.id}
        w='100%'

      >
        <Link
          onClick={() => {
            startTransition(() => navigate(`/profile/${data?.node?.user?.username}`))
          }}
        >
          {data?.node?.user?.fullName}
        </Link>
        {
          !editMode
            ? <Text>
              {data?.node?.content}
            </Text>
            : <Textarea
              autoFocus
              value={comment || ''}
              onChange={event => {
                setComment(event.target.value)
              }}
            />
        }

      </Box>
      <Flex
        gap='0.5em'
      >
        {
          !editMode
            ? <>
              <IconButton
                aria-label='edit comment'
                onClick={handleInitEdition}
                icon={
                  <GoPencil size={18} />
                }
              />

              <IconButton
                aria-label='delete comment'
                disabled={true}
                icon={
                  <GoTrashcan size={18} />
                }
              />
            </>
            : <>
              <IconButton
                aria-label='apply edition'
                onClick={handleUpdate}
                isLoading={isUpdating}
                icon={
                  <GoCheck size={18} />
                }
              />

              <IconButton
                aria-label='cancel edition'
                onClick={handleCancelEdition}
                icon={
                  <GoX size={18} />
                }
              />
            </>
        }
      </Flex>
    </Flex>
  )
}
