import { GraphQLTaggedNode, usePreloadedQuery } from 'react-relay'
import type { SearchMovieQuery } from '../SearchMovie/__generated__/SearchMovieQuery.graphql'

type Props = {
  query: GraphQLTaggedNode,
  queryReference: any
}

export const SearchList = ({ queryReference, query }: Props) => {
  const data = usePreloadedQuery<SearchMovieQuery>(query, queryReference)

  const { searchMovieFromTMDB } = data

  return (
    <>
      {
        searchMovieFromTMDB?.edges?.map((edge: any) => {
          return (
            <option
              // id="movie"
              key={edge?.node?.id}
              value={edge?.node?.id}
            >
              {edge?.node?.title}
            </option>
          )
        })
      }
    </>
  )
}
