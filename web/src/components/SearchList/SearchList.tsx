import { GraphQLTaggedNode, PreloadedQuery, usePreloadedQuery } from 'react-relay'

type Props = {
  query: GraphQLTaggedNode,
  queryReference: any
}

export const SearchList = ({ queryReference, query, }: Props) => {
  const data = usePreloadedQuery(query, queryReference)

  // TODO: avoid using any
  const { searchMovieByTitle } = data as any

  return (
    <>
      {
        searchMovieByTitle?.edges?.map((edge: any) => {
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