import { Box, Avatar, Text, Link } from '@chakra-ui/react'
import { NullableProps } from '../../types/Nullable'

type Props = NullableProps<{
  rating: number
  user: {
    fullName: string
  }
  text: string
}>

export const Review = (props: Props) => {
  return (
    <Box
      w={'100%'}
      borderRadius={'md'}
      p={'1em'}
      _hover={{
        bg: 'whiteAlpha.200',
        transitionDuration: '0.5s',
      }}
      gap={'1em'}
      display={'flex'}
    >
      <Avatar size="sm" />
      <Box
        fontSize={'sm'}
        display='flex'
        flexDirection={'column'}
        justifyContent={'space-evenly'}
        gap={'1em'}
      >
        <Text>
          a {props?.rating} &#x2605; review by
          <Link
            ml={1}
          >
            {props?.user?.fullName}
          </Link>
        </Text>
        <Text textAlign={'justify'}>{props?.text}</Text>
      </Box>
    </Box>
  )
}