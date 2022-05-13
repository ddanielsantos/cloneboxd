import {
  Flex,
  Link,
  Text,
  Stack,
  Input,
  Button,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Box
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useEffect } from 'react'
import { useMutation } from 'react-relay'
import { useForm } from 'react-hook-form'
import { loginMutation } from './loginMutation'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextDivider } from '../../components/TextDivider'
import { getToken, saveToken } from '../../helpers/localStorage'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ThemeSwitcher } from '../../components/ThemeSwitcher/ThemeSwitcher'
import { commitLoginMutation } from './__generated__/commitLoginMutation.graphql'

type FormData = {
  email: string,
  password: string
}

const schema = yup.object({
  email: yup.string().email('O email fornecido é inválido').required('O email é obrigatório'),
  password: yup.string().min(6, 'A senha deve conter ao menos 6 caracteres').required('A senha é obrigatória')
}).required('Os dados de login são obrigatórios')

export const Login = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [commitLogin, isLoginLoading] = useMutation<commitLoginMutation>(loginMutation)

  useEffect(() => {
    const isLoggedIn = getToken() !== null ? true : false

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
      onCompleted: (data) => {
        if (data?.loginUser?.error) {
          toast({
            title: 'Erro',
            description: 'Credenciais inválidas',
            status: 'error',
            duration: 2500
          })
        }

        if (data?.loginUser?.token) {
          saveToken(data.loginUser.token)
          navigate('/')
        }
      },
      onError: (_) => {
        toast({
          title: 'Erro',
          description: 'Ocorreu um erro interno',
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
          <FormLabel mt={'0.5em'} htmlFor='email'>E-mail</FormLabel>
          <Input
            placeholder="Insira o seu e-mail"
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
          <Input placeholder="Insira a sua senha"
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
            Entrar
          </Button>
        </Flex>

        <TextDivider text={'ou'} />

        <Text
          textAlign={'center'}
        >
          Não possui uma conta? {' '}
          <Link
            flex={1}
            as={RouterLink}
            to="/signUp"
          >
            Crie aqui
          </Link>
        </Text>
      </form >
    </Stack >
  )
}
