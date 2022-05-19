import {
  Input,
  HStack,
  Button,
  VStack,
  Textarea,
  FormLabel,
  FormControl,
  useNumberInput,
  FormErrorMessage
} from "@chakra-ui/react"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { Main } from "../../components/Main/Main"
import { Subtitle } from "../../components/Subtitle"
import { yupResolver } from "@hookform/resolvers/yup"
import { Header } from "../../components/Header/Header"
import { SearchMovie } from "../../components/SearchMovie/SearchMovie"

type FormData = {
  userId: string
  movieId: string
  text?: string
  rating?: number
  viewedAt?: string
}

const schema = yup.object({
  userId: yup.string().required('O usuário é obrigatório'),
  movieId: yup.string().required('O filme é obrigatório'),
  text: yup.string(),
  rating: yup.number().test({
    test: (value) => {
      return value! % 0.5 === 0
    },
    name: 'aaa',
    message: 'A avaliação deve ser um valor inteiro ou terminado por .5',
    exclusive: false,
    params: {
      min: 0,
    }
  }).min(0, 'O valor mínimo é 0').max(5, 'O valor máximo é 5').typeError('A avaliação deve ser um número válido'),
  viewedAt: yup.date().typeError('A data deve ser no formato dd/mm/aaaa').max(new Date(), 'A data não deve ser maior que a atual')

})

export const Review = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

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
    console.log(data)
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
          <Subtitle content="registrar filme assistido:" />

          <SearchMovie />

          <FormControl
            isInvalid={!!errors.text}
          >
            <FormLabel
              htmlFor="text"
            >
              sua review:
            </FormLabel>

            <Textarea
              id={'text'}
              w={['100%']}
              resize={'vertical'}
              {...register('text')}
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
              nota para o filme:
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
            isInvalid={!!errors.viewedAt}
          >

            <FormLabel
              htmlFor="viewedAt"
            >
              a data em que você o assistiu:
            </FormLabel>

            <Input
              type={'date'}
              id="viewedAt"
              {...register('viewedAt')}
              width={['100%', 'fit-content']}
            />

            {
              errors.viewedAt && (
                <FormErrorMessage>
                  {errors.viewedAt.message}
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
              cancelar
            </Button>

            <Button
              type="submit"
              colorScheme={'green'}
            >
              adicionar registro
            </Button>
          </HStack>

        </form>
      </Main>
    </VStack >
  )
}

function useEnvironment() {
  throw new Error("Function not implemented.")
}
