import {
  Flex,
  Text,
  Link,
  Input,
  Stack,
  Button,
  Spinner,
  useToast,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useMutation } from 'react-relay'
import { useForm } from 'react-hook-form'
import { signUpMutation } from './signUpMutation'
import { Link as RouterLink } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextDivider } from '../../components/TextDivider'
import { commitSignUpMutation } from './__generated__/commitSignUpMutation.graphql'

type FormData = {
  email: string,
  password: string,
  confirmPassword: string,
  fullName: string
}

const schema = yup.object({
  email: yup.string().email('O email fornecido é inválido').required('O email é obrigatório'),
  password: yup.string().min(6, 'A senha deve conter ao menos 6 caracteres').required('A senha é obrigatória'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas não conferem').required('A confirmação de senha é obrigatória'),
  fullName: yup.string().required('O nome é obrigatório')
}).required('Os dados de login são obrigatórios')

export const SignUp = () => {
  const toast = useToast()
  const [commitSignUp, isSignUpLoading] = useMutation<commitSignUpMutation>(signUpMutation)

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
            title: 'Erro',
            description: 'Credenciais inválidas',
            status: 'error',
            duration: 2500
          })
        }

        if (data?.userCreate?.insertedId) {
          toast({
            title: 'Sucesso',
            description: 'Usuário criado com sucesso',
            status: 'success',
          })
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
      <Text
        fontSize={['2em']}
        fontWeight={['bold']}
      >
        Criar conta
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={!!errors.fullName}
        >
          <FormLabel mt={'0.5em'} htmlFor='email'>Nome completo</FormLabel>
          <Input
            placeholder="ex.: João da Silva"
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
          isInvalid={!!errors.email}
        >
          <FormLabel mt={'0.5em'} htmlFor='email'>E-mail</FormLabel>
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
          <FormLabel mt={'0.5em'} htmlFor='password'>Senha</FormLabel>
          <Input placeholder="(ao menos 6 caracteres)"
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
          <FormLabel mt={'0.5em'} htmlFor='password'>Confirme a sua senha</FormLabel>
          <Input placeholder="confirme a sua senha"
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
            Criar
          </Button>
        </Flex>

        <TextDivider text='ou' />

        <Text
          textAlign={'center'}
          mt={'0.5em'}
        >
          Possui uma conta? {' '}
          <Link
            flex={1}
            as={RouterLink}
            to="/login"
          >
            Faça login
          </Link>
        </Text>
      </form>
    </Stack>
  )
}
