import { Box, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Header } from '../../components/Header/Header'

export const Profile = () => {
  const { id } = useParams()

  return (
    <Box
      minH={'100vh'}
      h={'100%'}
      w='100%'
      gap={4}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Header />

      <Text>
        welcolme goat {id}
      </Text>

    </Box>
  )
}