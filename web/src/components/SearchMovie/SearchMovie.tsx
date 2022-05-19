import { graphql } from "relay-runtime"
import { Suspense, useState } from "react"
import { useQueryLoader } from "react-relay"
import { Input, Button } from "@chakra-ui/react"
import { SearchList } from "../SearchList/SearchList"

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

  const [queryRef, loadQuery] = useQueryLoader(SearchMovieBytTitleQuery)

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