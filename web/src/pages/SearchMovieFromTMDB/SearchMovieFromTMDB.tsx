import { graphql } from "relay-runtime"
import { Box, Image, Button, Flex, Input, Text, Grid, GridItem, Divider } from '@chakra-ui/react'
import { startTransition, useState } from "react"
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

export const SearchMovieFromTMDB = (_: any): JSX.Element => {
  const [titleToSearch, setTitleToSearch] = useState('')
  const [queryRef, loadQuery] = useQueryLoader<SearchMovieFromTMDB_Query>(query)

  const search = (): void => {
    startTransition(() => {
      loadQuery({ title: titleToSearch })
    })
  }

  return (
    <Box
      minH={'100vh'}
      as="main"
      h={'100%'}
      p={'1em'}
      w={['100%', '100%', '48em']}
    >
      <Text
        mb={'1em'}
        fontSize="3xl"
        fontWeight="extrabold"
      >
        What movie are you looking for?
      </Text>

      <Flex
        gap={'0.5em'}
      >
        <Input
          placeholder='enter the movie name here'
          onChange={e => setTitleToSearch(e.target.value)}
        />
        <Button
          onClick={search}
        >
          search
        </Button>
      </Flex>

      {
        queryRef &&
        <>
          <SearchResult queryRef={queryRef} />
        </>
      }

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
      <Box>
        <Text>
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
            <>
              <GridItem
                key={index}
                display={'flex'}
                borderRadius={'md'}
                // bg={'gray.100'}
                // border={"1px solid red"}
                p={'1em'}
                gap={'0.5em'}
                cursor={"pointer"}
                alignItems={'center'}
                // TODO: in the movie details page, check if the movie id resolves to a movie
                onClick={() => navigate(`/movie/${edge?.node?.id}`)}
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
                      new Date(edge.node.releaseDate).getFullYear()
                    }
                  </Text>
                </Flex>
              </GridItem>
              <Divider />
            </>
          )
        })
      }
    </Grid>
  )
}