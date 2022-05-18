import { useEffect, useState } from 'react'
import { Subtitle } from '../Subtitle'
import { Text } from '@chakra-ui/react'
import { loginMutation$data } from '../../pages/Login/__generated__/loginMutation.graphql'

export function Greeting() {
  const [user, setUser] = useState<loginMutation$data['loginUser'] | null>(null)

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      const data = localStorage.getItem('loggedUser') || ''
      if (data !== '') setUser(JSON.parse(data))
    }

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <Subtitle
        content={`bem-vindo, ${user?.user?.fullName}`}
      />
      <Text>
        assistiu algum filme recentemente? Registre-o agora
      </Text>
    </>
  )
}