import {
  Box,
  Flex,
  Link,
  Text,
  Stack,
  Input,
  Button,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useEffect } from 'react'
import { useMutation } from 'react-relay'
import { useForm } from 'react-hook-form'
import { loginMutation } from './loginMutation'
import { useAuth } from '../../contexts/AuthContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextDivider } from '../../components/TextDivider/TextDivider'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ThemeSwitcher } from '../../components/ThemeSwitcher/ThemeSwitcher'
import { loginMutation as loginMutationType } from './__generated__/loginMutation.graphql'

type FormData = {
  email: string,
  password: string
}

const schema = yup.object({
  email: yup.string().email('Email is required').required('Email is required'),
  password: yup.string().min(6, 'The password must be at least 6 characters long').required('Password is required')
})

export const Login = () => {
  const navigate = useNavigate()
  const { token, signIn } = useAuth()
  const toast = useToast()
  const [commitLogin, isLoginLoading] = useMutation<loginMutationType>(loginMutation)

  useEffect(() => {
    const isLoggedIn = token !== '' ? true : false

    if (isLoggedIn) {
      navigate('/')
    }
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (formData: FormData) => {
    commitLogin({
      variables: {
        input: {
          ...formData
        }
      },
      onCompleted: ({ loginUser }) => {
        if (loginUser?.error) {
          toast({
            title: 'Error',
            description: 'Invalid credentials',
            status: 'error',
            duration: 2500
          })

          return
        }

        if (loginUser?.token) {
          signIn(loginUser.token)
        }

        navigate('/')
      },
      onError: (_) => {
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
    <Stack
      w={['100%', '30em']}
      p={['1em']}
      display={'flex'}
      flexDir={'column'}
      spacing={'1em'}
    >
      <Box
        position={'absolute'}
        right={'1em'}
        top={'1em'}
      >
        <ThemeSwitcher />
      </Box>
      <Text
        fontSize={['2em']}
        fontWeight={['bold']}
      >
        Login
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={!!errors.email}
        >
          <FormLabel mt={'0.5em'} htmlFor='email'>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            id="email"
            {...register('email')}
          />

          {
            errors.email && (
              <FormErrorMessage>
                {errors.email.message}
              </FormErrorMessage>
            )
          }
        </FormControl>

        <FormControl
          isInvalid={!!errors.password}
        >
          <FormLabel mt={'0.5em'} htmlFor='password'>Senha</FormLabel>
          <Input placeholder="Enter your password"
            type='password'
            min={6}
            id="password"
            {...register('password')}
          />

          {
            errors.password && (
              <FormErrorMessage>
                {errors.password.message}
              </FormErrorMessage>
            )
          }
        </FormControl>

        <Flex
          alignItems={'flex-end'}
          my={'1em'}
        >
          <Button
            flex={1}
            type="submit"
            colorScheme={'green'}
            isLoading={isLoginLoading}
          >
            Login
          </Button>
        </Flex>

        <TextDivider text={'or'} />

        <Text
          textAlign={'center'}
        >
          Don't have an account? {' '}
          <Link
            flex={1}
            as={RouterLink}
            to="/signUp"
          >
            Create here
          </Link>
        </Text>
      </form >
    </Stack >
  )
}
