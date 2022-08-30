import { graphql } from 'relay-runtime'
import { Box, Image, Button, Flex, Input, Text, Grid, GridItem, Divider, Spinner, VStack } from '@chakra-ui/react'
import { startTransition, useState, Fragment, Suspense, Dispatch, SetStateAction } from 'react'
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay'

import type { SearchMovieFromTMDB_Query } from './__generated__/SearchMovieFromTMDB_Query.graphql'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header/Header'

const IMAGE_URL_PREFIX = 'https://image.tmdb.org/t/p/w92'

const query = graphql`
  query SearchMovieFromTMDB_Query($title: String!) {
    searchMovieFromTMDB(title: $title) {
      edges {
        node {
          id
          title
          description
          posterPath
          releaseDate
        }
      }
    }
  }
`

const SearchBar = ({ search, setTitleToSearch }: { search: () => void, setTitleToSearch: Dispatch<SetStateAction<string>> }): JSX.Element => {
  return (
    <>
      <Text
        mb={'1em'}
        fontSize="2xl"
        fontWeight="medium"
      >
        What movie are you looking for?
      </Text>

      <Flex
        gap="0.5em"
        mb={'1em'}
      >
        <Input
          placeholder='enter the movie name here'
          type={'search'}
          onChange={e => setTitleToSearch(e.target.value)}
        />
        <Button
          onClick={search}
        >
          search
        </Button>
      </Flex>
    </>
  )
}

export const SearchMovieFromTMDB = (_: any): JSX.Element => {
  const [titleToSearch, setTitleToSearch] = useState('')
  const [queryRef, loadQuery] = useQueryLoader<SearchMovieFromTMDB_Query>(query)

  const search = (): void => {
    startTransition(() => {
      loadQuery({ title: titleToSearch })
    })
  }

  return (
    <
      VStack
      w={'100%'}
      h={'100%'}
      minH={'100vh'}
    >
      <Header />
      <Box
        as="main"
        h={'100%'}
        p={'1em'}
        w={['100%', '100%', '48em']}
      >
        <SearchBar search={search} setTitleToSearch={setTitleToSearch} />

        {queryRef &&
          <Suspense fallback={<Spinner />}>
            <SearchResult queryRef={queryRef} />
          </Suspense>
        }
      </Box>
    </VStack>
  )
}

type Props = {
  queryRef: PreloadedQuery<SearchMovieFromTMDB_Query, Record<string, unknown>>
}

const SearchResult = ({ queryRef }: Props): JSX.Element => {
  const navigate = useNavigate()
  const { searchMovieFromTMDB } = usePreloadedQuery<SearchMovieFromTMDB_Query>(query, queryRef)

  if (searchMovieFromTMDB?.edges?.length === 0) {
    return (
      <Box
        mt="3em"
      >
        <Text
          align={'center'}
        >
          No movies found
        </Text>
      </Box>
    )
  }

  return (
    <VStack
      gap={'0.5em'}
      w='100%'
    >
      {
        searchMovieFromTMDB && searchMovieFromTMDB?.edges?.map((edge, index) => {
          if (!edge?.node) {
            return null
          }

          return (
            <Fragment
              key={index}
            >
              <Flex
                w={'100%'}
                borderRadius={'md'}
                gap={'0.5em'}
                p='1em'
                cursor={'pointer'}
                alignItems={'flex-start'}
                onClick={() => {
                  startTransition(() => navigate('/movie/' + edge.node?.id))
                }}
                _hover={{
                  bg: 'gray.700',
                  transitionDuration: '0.5s'
                }}
              >
                {
                  edge.node.posterPath && <Image
                    borderRadius={'5px'}
                    src={IMAGE_URL_PREFIX + edge.node.posterPath}
                  />
                }
                <Flex
                  flexDirection={'column'}
                  flexShrink={1}
                  px={1}
                >
                  <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                  >
                    {edge.node.title}
                  </Text>

                  <Text
                    fontSize={'sm'}
                    fontWeight='thin'
                  >
                    {
                      edge.node.releaseDate && new Date(edge.node.releaseDate).getFullYear()
                    }
                  </Text>

                  <Text
                  >
                    {
                      edge.node.description.slice(0, 120)
                    }
                    {
                      edge.node.description.length > 120 && '...'
                    }
                  </Text>
                </Flex>

              </Flex>
              <Divider />
            </Fragment>
          )
        })
      }
    </VStack>
  )
}
