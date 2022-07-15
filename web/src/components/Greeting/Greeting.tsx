import { Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'

import type { Greeting__user$key } from './__generated__/Greeting__user.graphql'

type Props = {
  data: Greeting__user$key
}

export function Greeting(props: Props) {
  const data = useFragment(graphql`
    fragment Greeting__user on Query {
      me {
        fullName
      }
    }
  `, props.data)

  return (
    <>
      <Text>
        welcome, {data.me?.fullName}
      </Text>
      <Text>
        saw any movies lately? register it right now
      </Text>
    </>
  )
}