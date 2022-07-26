import React from 'react'
import { VStack } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Section = ({ children }: Props) => {
  return (
    <VStack
      w={'100%'}
      gap={'1em'}
      alignItems={'flex-start'}
    >
      {children}
    </VStack>
  )
}
