import { Box, useColorMode, Text, Tooltip as TT } from '@chakra-ui/react'

type Props = {
  inside: string | null,
  popup?: string
}

export const Tooltip = (props: Props) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      padding={1}
      bg={colorMode === 'dark' ? 'gray.600' : 'gray.100'}
      cursor={'pointer'}
      borderRadius={'md'}
      _hover={{
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.300',
        transitionDuration: '0.5s'

      }}
    >
      <TT label={props.popup} hasArrow placement='top'>
        <Text
          fontSize={'sm'}
        >
          {props.inside}
        </Text>
      </TT>
    </Box>
  )
}
