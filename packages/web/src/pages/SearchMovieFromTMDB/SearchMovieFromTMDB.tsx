import { graphql } from "relay-runtime"
import { Box, Image, Button, Flex, Input, Text, Grid, GridItem, Divider, Spinner } from '@chakra-ui/react'
import { startTransition, useState, Fragment, Suspense } from "react"
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from "react-relay"

import type { SearchMovieFromTMDB_Query } from './__generated__/SearchMovieFromTMDB_Query.graphql'
import { useNavigate } from "react-router-dom"

const IMAGE_URL_PREFIX = 'https://image.tmdb.org/t/p/w92'

const query = graphql`
  query SearchMovieFromTMDB_Query($title: String!) {
    searchMovieFromTMDB(title: $title) {
      edges {
        node {
          id
          title
          posterPath
          releaseDate
        }
      }
    }
  }
`

const SearchBar = ({ search, setTitleToSearch }: { search: () => void, setTitleToSearch: React.Dispatch<React.SetStateAction<string>> }): JSX.Element => {
  return (
    <>
      <Text
        mb={'1em'}
        fontSize="3xl"
        fontWeight="extrabold"
      >
        What movie are you looking for?
      </Text>

      <Flex
        gap="0.5em"
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

  if (queryRef == null) {
    return (
      <Box
        minH={'100vh'}
        as="main"
        h={'100%'}
        p={'1em'}
        w={['100%', '100%', '48em']}
      >
        <SearchBar search={search} setTitleToSearch={setTitleToSearch} />
      </Box>
    )
  }

  return (
    <Box
      minH={'100vh'}
      as="main"
      h={'100%'}
      p={'1em'}
      w={['100%', '100%', '48em']}
    >
      <SearchBar search={search} setTitleToSearch={setTitleToSearch} />

      <Suspense fallback={<Spinner />}>
        <SearchResult queryRef={queryRef} />
      </Suspense>

    </Box>
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
        // p={3}
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
    <Grid
      gap={'0.5em'}
    >
      <Text
        my={'1em'}
        fontSize="2xl"
        fontWeight={"bold"}
      >
        Result:
      </Text>
      {
        searchMovieFromTMDB && searchMovieFromTMDB?.edges?.map((edge, index) => {
          if (!edge?.node) {
            return null
          }

          return (
            <Fragment
              key={index}
            >
              <GridItem
                display={'flex'}
                borderRadius={'md'}
                // bg={'gray.100'}
                // border={"1px solid red"}
                p={'1em'}
                gap={'0.5em'}
                cursor={"pointer"}
                alignItems={'center'}
                // TODO: in the movie details page, check if the movie id resolves to a movie
                onClick={() => {
                  startTransition(() => navigate('/movie/' + edge.node?.id))
                }}
                _hover={{
                  bg: 'gray.100',
                  transitionDuration: '0.5s'
                }}
              >
                {
                  edge.node.posterPath && <Image
                    src={IMAGE_URL_PREFIX + edge.node.posterPath}
                  />
                }
                <Flex
                  flexDir={'row'}
                  alignSelf='flex-start'
                  gap='0.5em'
                  alignItems='baseline'
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
                </Flex>
              </GridItem>
              <Divider />
            </Fragment>
          )
        })
      }
    </Grid>
  )
}