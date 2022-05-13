import {
  Text,
  Flex,
  VStack,
  HStack,
  Button
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Main } from "../../components/Main/Main"
import { Subtitle } from "../../components/Subtitle"
import { Header } from "../../components/Header/Header"

export const Home = () => {
  const navigate = useNavigate()

  return (
    <VStack
      w={'100%'}
      h={'100%'}
      minH={'100vh'}
    >
      <Header />
      <Main>
        <Flex
          w={'100%'}
          gap={'1em'}
          direction={'column'}
        >
          <Subtitle
            content="bem-vindo, username"
          />
          <Text>
            assistiu algum filme recentemente? Registre-o agora
          </Text>
          <HStack
            w={'100%'}
            justifyContent={'flex-end'}
          >
            <Button
              onClick={() => {
                navigate('/review')
              }}
            >
              registrar filme
            </Button>
          </HStack>
        </Flex>
      </Main>
    </VStack>
  )
}