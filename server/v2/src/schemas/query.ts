import { GraphQLObjectType } from 'graphql'
import { movieQueries } from '../entities/movie/queries/queries'
import { crewQueries } from '../entities/crew/queries/queries'
import { userQueries } from '../entities/user/queries/queries'
import { reviewQueries } from '../entities/review/queries/queries'

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The root query type',
  fields: () => ({
    ...movieQueries,
    ...crewQueries,
    ...userQueries,
    ...reviewQueries
  })
})
