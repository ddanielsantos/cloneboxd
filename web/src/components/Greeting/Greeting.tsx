import { useEffect, useState } from 'react'
import { Subtitle } from '../Subtitle/Subtitle'
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
        content={`welcome, ${user?.user?.fullName}`}
      />
      <Text>
        saw any movies lately? register it right now
      </Text>
    </>
  )
}