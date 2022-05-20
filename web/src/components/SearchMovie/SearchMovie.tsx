import {
  Input,
  Select,
  FormLabel,
  InputGroup,
  IconButton,
  FormControl,
  FormErrorMessage,
  InputRightElement
} from "@chakra-ui/react"
import { graphql } from "relay-runtime"
import { Suspense, useState } from "react"
import { useQueryLoader } from "react-relay"
import { BiSearchAlt } from "react-icons/bi"
import { useFormContext } from "react-hook-form"
import { SearchList } from "../SearchList/SearchList"
import { SearchMovieByTitleQuery } from "./__generated__/SearchMovieByTitleQuery.graphql"

import type { FormData } from "../../pages/Review/Review"

export const SearchMovie = () => {
  const { register, formState: { errors } } = useFormContext<FormData>()
  const [titleToSearch, setTitleToSearch] = useState('')

  const SearchMovieBytTitleQuery = graphql`
    query SearchMovieByTitleQuery($title: String!) {
      searchMovieByTitle(title: $title, first: 5){
        edges {
          node {
            id
            title
            duration
          }
        }
      }
    }
  `

  const [queryRef, loadQuery] = useQueryLoader<SearchMovieByTitleQuery>(SearchMovieBytTitleQuery)

  return (
    <Suspense fallback={'searching...'}>
      <FormLabel
        htmlFor="movie"
      >
        search for a movie
      </FormLabel>

      <InputGroup>
        <Input
          type={'search'}
          id={'search'}
          placeholder={'search for a movie'}
          onChange={(e) => {
            setTitleToSearch(e.target.value)
          }}
        />
        <InputRightElement>
          <IconButton
            aria-label="search"
            borderLeftRadius={0}
            onClick={() => {
              loadQuery({ title: titleToSearch })
            }}
          >
            <BiSearchAlt />
          </IconButton>
        </InputRightElement>
      </InputGroup>

      <FormControl
        isInvalid={!!errors.movie}
      >
        <FormLabel
          htmlFor="movie"
        >
          select a movie
        </FormLabel>
        <Select
          id="movie"
          placeholder="select a movie"
          _placeholder={{
            color: 'gray.500',
          }}
          {...register('movie')}
        >
          {
            queryRef != null &&
            <SearchList
              query={SearchMovieBytTitleQuery}
              queryReference={queryRef}
            />
          }
        </Select>

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