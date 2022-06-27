import { Text } from "@chakra-ui/react"

type Props = {
  content: string
}

export const Subtitle = ({ content }: Props) => {
  return (
    <Text
      fontSize={'1.5em'}
      decoration={'underline'}
      textDecorationColor={'#3939339'}
    >
      {content}
    </Text>
  )
}