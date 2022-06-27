import { Suspense, useState } from 'react'
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay'
import { Box, Text, Input, ListItem, Spinner, UnorderedList, VStack } from '@chakra-ui/react'
import { useTimedSearch } from '../../hooks/useTimedSearch'
import { SearchMovieByTitleQuery } from '../../components/SearchMovie/SearchMovie'

import type { SearchMovieByTitleQuery as SearchMovieByTitleQueryType } from '../../components/SearchMovie/__generated__/SearchMovieByTitleQuery.graphql'
import { useNavigate } from 'react-router-dom'

export const SearchMovie = () => {
  const [titleToSearch, setTitleToSearch] = useState('')
  const [queryRef, loadQuery] = useQueryLoader<SearchMovieByTitleQueryType>(SearchMovieByTitleQuery)

  useTimedSearch({
    titleToSearch,
    searchFunction: (props) => loadQuery(props),
    delay: 800
  })

  return (
    <Box>
      <Input
        type={'search'}
        id={'search'}
        mb={'2em'}
        placeholder={'search for a movie'}
        onChange={(e) => {
          setTitleToSearch(e.target.value)
        }}
      />

      <Suspense fallback={<Spinner />}>
        {
          queryRef &&
          <ResultContainer
            queryRef={queryRef}
          />
        }
      </Suspense>
    </Box>
  )
}

type Props = {
  queryRef: PreloadedQuery<SearchMovieByTitleQueryType, Record<string, unknown>>
}

const ResultContainer = ({ queryRef }: Props) => {
  const { searchMovieByTitle } = usePreloadedQuery<SearchMovieByTitleQueryType>(SearchMovieByTitleQuery, queryRef)
  const navigate = useNavigate()

  return (
    <VStack
      borderColor={'#ccc'}
    >
      {
        searchMovieByTitle?.edges?.length === 0 &&
        <Box
        >
          no results
        </Box>
      }

      <UnorderedList
        width={'100%'}
        listStyleType={'none'}
        margin={0}
      >

        {
          searchMovieByTitle?.edges?.map((a, index) => {
            return (
              <ListItem
                key={a?.node?.id}
                borderWidth={1}
                tabIndex={0}
                mt={'0.25em'}
                borderRadius={'md'}
              >
                <Box
                  _hover={{
                    backgroundColor: 'blue.600',
                    borderRadius: 'md',
                  }}
                  _focus={{
                    backgroundColor: 'blue.400',
                    borderRadius: 'md',
                  }}
                  padding={2}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  cursor={'pointer'}
                  borderColor={'Highlight'}
                  onClick={() => {
                    navigate('/movie/' + a?.node?.id)
                  }}
                >
                  <Text>{a?.node?.title}</Text>

                  <Text
                    fontSize={'xs'}
                  >
                    {/* TODO: YEAR INSTEAD OF DURATION */}
                    ({a?.node?.duration})
                  </Text>
                </Box>
              </ListItem>
            )
          })
        }
      </UnorderedList>
    </VStack>
  )
}
