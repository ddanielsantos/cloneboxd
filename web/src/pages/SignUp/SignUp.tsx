import {
  Stack,
  Text,
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { commitSignUp } from './commitSignUp'
import { useRelayEnvironment } from 'react-relay'
import { yupResolver } from '@hookform/resolvers/yup'

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
  const environment = useRelayEnvironment()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (formData: FormData) => {
    commitSignUp(environment, {
      input: {
        ...formData
      }
    })
  }

  return (
    <Stack
      w={['100%', '30em']}
      p={['1em']}
      display={'flex'}
      flexDir={'column'}
      spacing={3}
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

        <Button
          flex={1}
          type="submit"
          variant={'solid'}
          mt='0.5em'
        >
          Criar conta
        </Button>

      </form>

    </Stack>
  )
}