import {
  Text,
  Input,
  HStack,
  Button,
  VStack,
  Textarea,
  useToast,
  FormLabel,
  FormControl,
  useNumberInput,
  FormErrorMessage
} from "@chakra-ui/react"
import * as yup from "yup"
import { useMutation } from "react-relay"
import { useNavigate } from "react-router-dom"
import { Main } from "../../components/Main/Main"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, useForm } from 'react-hook-form'
import { Header } from "../../components/Header/Header"
import { createReviewMutation } from "./createReviewMutation"
import { SearchMovie } from "../../components/SearchMovie/SearchMovie"
import { createReviewMutation as createReviewMutationType } from "./__generated__/createReviewMutation.graphql"

export type FormData = {
  movie: string
  text?: string
  rating?: number
  watchedAt?: string
}

const schema = yup.object({
  movie: yup.string().required('The movie is required'),
  text: yup.string(),
  rating: yup.number().test({
    test: (value) => {
      return value! % 0.5 === 0
    },
    name: 'rating',
    message: 'The rating must be a multiple of 0.5',
    exclusive: false,
    params: {
      min: 0,
    }
  }).min(0, 'The minimum is 0').max(5, 'The maximum is 5').typeError('The rating must be a number'),
  watchedAt: yup.date().typeError('The watched date must be valid').max(new Date(), 'The date cannot be in the future')

})

export const NewReview = () => {
  const navigate = useNavigate()
  const [commitReviewCreation, isReviewCommitLoading] = useMutation<createReviewMutationType>(createReviewMutation)
  const toast = useToast()

  const { formState, register, handleSubmit, reset, ...methods } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { errors } = formState

  const { getDecrementButtonProps, getIncrementButtonProps, getInputProps } = useNumberInput({
    step: 0.5,
    min: 0.0,
    max: 5,
    defaultValue: 0.0,
  })

  const incrementRatingButton = getIncrementButtonProps()
  const ratingInput = getInputProps()
  const decrementRatingButton = getDecrementButtonProps()

  const onSubmit = (data: FormData) => {
    const { watchedAt } = data
    const formatedDate = watchedAt && new Date(watchedAt).toISOString()

    commitReviewCreation({
      variables: {
        input: {
          ...data,
          watchedAt: formatedDate
        }
      },
      onCompleted: ({ reviewCreate }) => {
        if (reviewCreate?.error) {
          toast({
            title: 'Error',
            description: 'Verify your session',
            status: 'error',
            duration: 2500
          })

        }

        if (reviewCreate?.review?.id) {
          toast({
            title: 'Review created',
            description: 'Your review has been created',
            status: 'success',
            duration: 2500
          })

          reset()
        }

        return
      },
      onError: (_) => {
        toast({
          title: 'Error',
          description: 'An internal error has occurred',
          status: 'error',
          duration: 2500
        })
      }
    })
  }

  return (
    <VStack
      h={'100%'}
      w={'100%'}
      flexGrow={1}
      flexShrink={0}
      minH={'100vh'}
    >
      <Header />
      <Main>
        <FormProvider
          {...methods}
          formState={formState}
          register={register}
          reset={reset}
          handleSubmit={handleSubmit}
        >
          <form
            style={{
              width: '100%',
              margin: 0,
              gap: '1em',
              display: 'flex',
              flexDirection: 'column',
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text>
              log watched movie:
            </Text>

            <SearchMovie />

            <FormControl
              isInvalid={!!errors.text}
            >
              <FormLabel
                htmlFor="text"
              >
                your review:
              </FormLabel>

              <Textarea
                id={'text'}
                w={['100%']}
                resize={'vertical'}
                {...register('text')}
                placeholder="i think..."
              />

              {
                errors.text && (
                  <FormErrorMessage>
                    {errors.text.message}
                  </FormErrorMessage>
                )
              }
            </FormControl>

            <FormControl
              isInvalid={!!errors.rating}
            >
              <FormLabel
                htmlFor="rating"
              >
                your rating:
              </FormLabel>

              <HStack>
                <Button {...decrementRatingButton}>-</Button>

                <Input
                  {...ratingInput}
                  id="rating"
                  textAlign={'center'}
                  {...register('rating')}
                  width={['100%', '4em']}
                />
                <Button {...incrementRatingButton}>+</Button>
              </HStack>
              {
                errors.rating && (
                  <FormErrorMessage>
                    {errors.rating.message}
                  </FormErrorMessage>
                )
              }
            </FormControl>

            <FormControl
              isInvalid={!!errors.watchedAt}
            >

              <FormLabel
                htmlFor="watchedAt"
              >
                the date you watched the movie:
              </FormLabel>

              <Input
                type={'date'}
                id="watchedAt"
                {...register('watchedAt')}
                width={['100%', 'fit-content']}
              />

              {
                errors.watchedAt && (
                  <FormErrorMessage>
                    {errors.watchedAt.message}
                  </FormErrorMessage>
                )
              }
            </FormControl>

            <HStack
              justifyContent={['space-between', 'flex-end']}
            >
              <Button
                onClick={() => {
                  navigate('/')
                }}
              >
                cancel
              </Button>

              <Button
                type="submit"
                colorScheme={'green'}
                isLoading={isReviewCommitLoading}
              >
                log watched film
              </Button>
            </HStack>
          </form>
        </FormProvider>
      </Main>
    </VStack >
  )
}
