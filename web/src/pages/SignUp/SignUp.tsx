import {
  Box,
  Flex,
  Text,
  Link,
  Input,
  Stack,
  Button,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useMutation } from 'react-relay'
import { useForm } from 'react-hook-form'
import { signUpMutation } from './signUpMutation'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextDivider } from '../../components/TextDivider/TextDivider'
import { ThemeSwitcher } from '../../components/ThemeSwitcher/ThemeSwitcher'
import { signUpMutation as signUpMutationType } from './__generated__/signUpMutation.graphql'
import { useAuth } from '../../contexts/AuthContext'

type FormData = {
  email: string,
  password: string,
  confirmPassword: string,
  username: string,
  fullName: string
}

const schema = yup.object({
  email: yup.string().email('The supplied email is invalid').required('Email is required'),
  password: yup.string().min(6, 'The password must be at least 6 characters long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'The passwords didn\'t match').required('Confirm password is required'),
  username: yup.string().required('A username is required'),
  fullName: yup.string().required('Your full name is required')
})

export const SignUp = () => {
  const toast = useToast()
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [commitSignUp, isSignUpLoading] = useMutation<signUpMutationType>(signUpMutation)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (formData: FormData) => {
    commitSignUp({
      variables: {
        input: {
          ...formData
        }
      },
      onCompleted: (data) => {
        if (data?.userCreate?.error) {
          toast({
            title: 'Error',
            description: 'Invalid credentials',
            status: 'error',
            duration: 2500
          })
        }

        if (data?.userCreate?.user && data?.userCreate?.token) {
          toast({
            title: 'Sucess',
            description: 'User created',
            status: 'success',
          })

          signIn(data.userCreate.token)
          localStorage.setItem('loggedUser', JSON.stringify({ ...data.userCreate }))

          navigate('/')
        }
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
        Create account
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={!!errors.fullName}
        >
          <FormLabel mt={'0.5em'} htmlFor='fullName'>Your name</FormLabel>
          <Input
            placeholder="ex.: John Doe"
            id="fullName"
            {...register('fullName')}
          />

          {
            errors.fullName && (
              <FormErrorMessage>
                {errors.fullName.message}
              </FormErrorMessage>
            )
          }
        </FormControl>

        <FormControl
          isInvalid={!!errors.username}
        >
          <FormLabel mt={'0.5em'} htmlFor='username'>Your name</FormLabel>
          <Input
            placeholder="ex.: John Doe"
            id="username"
            {...register('username')}
          />

          {
            errors.username && (
              <FormErrorMessage>
                {errors.username.message}
              </FormErrorMessage>
            )
          }
        </FormControl>

        <FormControl
          isInvalid={!!errors.email}
        >
          <FormLabel mt={'0.5em'} htmlFor='email'>Email</FormLabel>
          <Input
            placeholder="ex.: mail@mail.com"
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
          <FormLabel mt={'0.5em'} htmlFor='password'>Password</FormLabel>
          <Input placeholder="(at least 6 characters)"
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

        <FormControl
          isInvalid={!!errors.confirmPassword}
        >
          <FormLabel mt={'0.5em'} htmlFor='confirmPassword'>Confirm your password</FormLabel>
          <Input placeholder="confirm your password"
            type='password'
            min={6}
            id="confirmPassword"
            {...register('confirmPassword')}
          />

          {
            errors.confirmPassword && (
              <FormErrorMessage>
                {errors.confirmPassword.message}
              </FormErrorMessage>
            )
          }
        </FormControl>

        <Flex
          alignItems={'flex-end'}
          mt={'1.5em'}
        >
          <Button
            flex={1}
            type="submit"
            colorScheme={'green'}
            isLoading={isSignUpLoading}
          >
            Create
          </Button>
        </Flex>

        <TextDivider text='or' />

        <Text
          textAlign={'center'}
          mt={'0.5em'}
        >
          Already has an account? {' '}
          <Link
            flex={1}
            as={RouterLink}
            to="/login"
          >
            Login
          </Link>
        </Text>
      </form>
    </Stack>
  )
}
