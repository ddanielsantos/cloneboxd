import { Flex, Link, Text, useColorMode } from "@chakra-ui/react"

export const Footer = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      as={'footer'}
      p={"1em"}
      w='100%'
      bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
      justifyContent={'center'}
    >
      <Text fontSize={'sm'} >
        made with ❤️ by
        <Link
          flex={1}
          isExternal
          ml={1}
          href="https://twitter.com/renat0sp"
        >
          @renat0sp
        </Link>
      </Text>
    </Flex>
  )
}