import { GraphQLTaggedNode, PreloadedQuery, usePreloadedQuery } from 'react-relay'

import type { SearchMovieByTitleQuery } from '../SearchMovie/__generated__/SearchMovieByTitleQuery.graphql'

type Props = {
  query: GraphQLTaggedNode,
  queryReference: PreloadedQuery<SearchMovieByTitleQuery>
}

export const SearchList = ({ queryReference, query }: Props) => {
  const data = usePreloadedQuery(query, queryReference)

  const { searchMovieByTitle } = data

  return (
    <ul>
      {
        searchMovieByTitle?.edges?.map((edge) => {
          return (
            <li key={edge?.node?.id}>
              {edge?.node?.title}
            </li>
          )
        })
      }
    </ul>
  )
}