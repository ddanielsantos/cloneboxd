import { VStack } from '@chakra-ui/react'
import React from 'react'

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