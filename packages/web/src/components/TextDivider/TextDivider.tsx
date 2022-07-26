import { Flex, Text, Divider } from '@chakra-ui/react'

type Props = {
  text: string;
};
export function TextDivider ({ text }: Props) {
  return (
    <Flex
      alignItems={'center'}
      my={'1em'}
    >
      <Divider />
      <Text
        mx={'0.5em'}
      >
        {text}
      </Text>
      <Divider />

    </Flex>
  )
}
