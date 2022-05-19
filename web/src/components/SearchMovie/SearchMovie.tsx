import { graphql } from "relay-runtime"
import { Suspense, useState } from "react"
import { useQueryLoader } from "react-relay"
import { Input, Button } from "@chakra-ui/react"
import { SearchList } from "../SearchList/SearchList"
import { SearchMovieByTitleQuery } from "./__generated__/SearchMovieByTitleQuery.graphql"

export const SearchMovie = () => {
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
    <Suspense fallback={'loading...'}>
      <Input
        type={'search'}
        id="movieid"
        onChange={(e) => {
          setTitleToSearch(e.target.value)
        }}
      />

      <Button
        onClick={() => {
          loadQuery({ title: titleToSearch })
        }}
      >
        Pesquisar
      </Button>
      {
        queryRef != null &&
        <SearchList
          query={SearchMovieBytTitleQuery}
          queryReference={queryRef}
        />
      }
    </Suspense>
  )
}