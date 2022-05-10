import { useNavigate } from "react-router-dom"
import { HiOutlineLogout } from 'react-icons/hi'
import { Box, Circle, Text } from "@chakra-ui/react"
import { removeToken } from "../../helpers/localStorage"

export const Home = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Circle
        position={'absolute'}
        top={0}
        left={0}
        onClick={() => {
          removeToken()
          navigate('/login')
        }}
        size={'3em'}
      >
        <HiOutlineLogout size={'1.5em'} />
      </Circle>
      <Text>
        Ola mundo
      </Text>
    </Box>
  )
}