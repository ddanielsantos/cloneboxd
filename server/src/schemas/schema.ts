import { GraphQLSchema } from 'graphql'
import { query } from './query'
import { mutation } from './mutation'

export const schema = new GraphQLSchema({ query, mutation })
