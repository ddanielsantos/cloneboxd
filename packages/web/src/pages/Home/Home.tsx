import {
  Flex,
  VStack,
  HStack,
  Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Main } from '../../components/Main/Main'
import { Header } from '../../components/Header/Header'
import { Greeting } from '../../components/Greeting/Greeting'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { HomeQuery } from './__generated__/HomeQuery.graphql'

export const Home = () => {
  const navigate = useNavigate()

  const data = useLazyLoadQuery<HomeQuery>(graphql`
    query HomeQuery {
      ...Greeting__user
    }
  `, {})

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
          <Greeting data={data} />
          <HStack
            w={'100%'}
            justifyContent={'flex-end'}
          >
            <Button
              onClick={() => {
                navigate('/review/new')
              }}
            >
              log watched movie
            </Button>
          </HStack>
        </Flex>
      </Main>
    </VStack>
  )
}
