import { GraphQLTaggedNode, PreloadedQuery, usePreloadedQuery } from 'react-relay'

type Props = {
  query: GraphQLTaggedNode,
  queryReference: any
}

export const SearchList = ({ queryReference, query, }: Props) => {
  const data = usePreloadedQuery(query, queryReference)

  const { searchMovieByTitle } = data

  return (
    <>
      {
        searchMovieByTitle?.edges?.map(edge => {
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