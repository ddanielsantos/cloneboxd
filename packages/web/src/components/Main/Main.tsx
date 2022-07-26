import React from 'react'
import { VStack } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Main = ({ children }: Props) => {
  return (
    <VStack
      px={'1em'}
      py={'1.5em'}
      alignSelf={'center'}
      borderRadius={'10px'}
      alignItems={'flex-start'}
      w={['100%', '100%', '48em']}
    >
      {children}
    </VStack>
  )
}
