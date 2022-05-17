import {
  Text,
  Flex,
  VStack,
  HStack,
  Button
} from "@chakra-ui/react"
import { Suspense, useEffect } from "react"
import { userQuery } from "./userQuery"
import { useNavigate } from "react-router-dom"
import { Main } from "../../components/Main/Main"
import { Subtitle } from "../../components/Subtitle"
import { Header } from "../../components/Header/Header"
import { userQuery as userQueryType } from "./__generated__/userQuery.graphql"
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from "react-relay"

type Props = {
  queryRef: PreloadedQuery<userQueryType>
}

function Greeting({ queryRef }: Props) {
  const data = usePreloadedQuery<userQueryType>(userQuery, queryRef)

  return (
    <>
      <Subtitle
        content={`bem-vindo, ${data.me?.fullName}`}
      />
      <Text>
        assistiu algum filme recentemente? Registre-o agora
      </Text>
    </>
  )
}

export const Home = () => {
  const navigate = useNavigate()

  const [queryRef, loadQuery] = useQueryLoader<userQueryType>(userQuery)

  useEffect(() => {
    loadQuery({})
  }, [])

  return (
    <VStack
      w={'100%'}
      h={'100%'}
      minH={'100vh'}
    >
      {/* TODO: instead of passing header to each page, use the Outlet component */}
      <Header />
      <Main>
        <Flex
          w={'100%'}
          gap={'1em'}
          direction={'column'}
        >
          <Suspense fallback={'carregando sua info'}>
            {
              queryRef != null &&
              <Greeting queryRef={queryRef} />
            }
          </Suspense>
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