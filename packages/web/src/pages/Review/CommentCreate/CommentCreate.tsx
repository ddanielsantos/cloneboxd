import { InputGroup, Input, Button, useToast, FormControl } from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'relay-runtime'

import type { CommentCreateMutation } from './__generated__/CommentCreateMutation.graphql'

type Props = {
  review: string
}

export const CommentCreate = (props: Props) => {
  const [comment, setComment] = useState<string>('')
  const [emptyField, setEmptyField] = useState(false)
  const toast = useToast()

  const [commitCreation, isCreationLoading] = useMutation<CommentCreateMutation>(graphql`
    mutation CommentCreateMutation($input: commentCreateInput!) {
      commentCreate(input: $input) {
        comment {
          node {
            content
            user {
              id
            }            
          }
        }
        error
      }
    }
  `)

  const onSubmit = async () => {
    if (!comment) {
      setEmptyField(true)
      return
    }

    setEmptyField(false)

    commitCreation({
      variables: {
        input: {
          content: comment,
          review: props.review
        }
      },
      onCompleted: ({ commentCreate }) => {
        if (commentCreate?.error) {
          toast({
            title: 'Error',
            description: commentCreate.error,
            status: 'error',
            duration: 2500
          })

          return
        }

        if (commentCreate?.comment) {
          toast({
            description: 'Comment created',
            status: 'success',
            duration: 2500,
            isClosable: true
          })

          setComment('')
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
    <form
      onSubmit={event => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <InputGroup
        gap={2}
      >
        <FormControl
          isInvalid={emptyField}
        >
          <Input value={comment} onChange={event => setComment(event.target.value)} />
        </FormControl>
        <Button
          type='submit'
          isLoading={isCreationLoading}
        >
          comment
        </Button>
      </InputGroup>
    </form>
  )
}
