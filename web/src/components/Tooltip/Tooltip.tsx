import { Box, useColorMode, Text, Tooltip as TT } from '@chakra-ui/react'
import React from 'react'

export const Tooltip = ({ inside, popup }: { inside: string, popup: string }) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      padding={1}
      bg={colorMode === 'light' ? 'gray.200' : 'whiteAlpha.300'}
      cursor={'pointer'}
      borderRadius={'md'}
      _hover={{
        bg: colorMode === 'light' ? 'gray.400' : 'gray.500',
        transitionDuration: '0.5s',

      }}
    >
      <TT label={popup} hasArrow placement='top'>
        <Text
          fontSize={'sm'}
        >
          {inside}
        </Text>
      </TT>
    </Box>
  )
}