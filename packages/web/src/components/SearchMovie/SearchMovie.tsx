import {
  Input,
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Spinner
} from '@chakra-ui/react'
import { graphql } from 'relay-runtime'
import { Suspense, useState } from 'react'
import { useQueryLoader } from 'react-relay'
import { useFormContext } from 'react-hook-form'
import { SearchList } from '../SearchList/SearchList'
import { useTimedSearch } from '../../hooks/useTimedSearch'

import type { FormData } from '../../pages/NewReview/NewReview'
import type { SearchMovieQuery as SearchMovieQueryType } from './__generated__/SearchMovieQuery.graphql'

export const SearchMovieQuery = graphql`
  query SearchMovieQuery($title: String!) {
    searchMovieFromTMDB(title: $title){
      edges {
        node {
          id
          title
          releaseDate
        }
      }
    }
  }
`

export const SearchMovie = () => {
  const { register, formState: { errors } } = useFormContext<FormData>()
  const [titleToSearch, setTitleToSearch] = useState('')

  const [queryRef, loadQuery] = useQueryLoader<SearchMovieQueryType>(SearchMovieQuery)

  useTimedSearch({
    titleToSearch,
    searchFunction: (props) => loadQuery(props),
    delay: 1500
  })

  return (
    <Suspense fallback={'searching...'}>
      <FormLabel
        htmlFor="movie"
      >
        search for a movie
      </FormLabel>

      <Input
        type={'search'}
        id={'search'}
        placeholder={'search for a movie'}
        onChange={(e) => {
          setTitleToSearch(e.target.value)
        }}
      />

      <FormControl
        isInvalid={!!errors.movie}
      >
        <FormLabel
          htmlFor="movie"
        >
          select a movie
        </FormLabel>

        <Suspense fallback={<Spinner />}>
          <Select
            id="movie"
            placeholder="select a movie"
            _placeholder={{
              color: 'gray.500'
            }}
            {...register('movie')}
          >
            {
              queryRef != null &&
              <SearchList
                query={SearchMovieQuery}
                queryReference={queryRef}
              />
            }
          </Select>
        </Suspense>

        {
          errors.movie && (
            <FormErrorMessage>
              {errors.movie.message}
            </FormErrorMessage>
          )
        }

      </FormControl>

    </Suspense>
  )
}
