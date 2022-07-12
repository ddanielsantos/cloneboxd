import {
  GraphQLObjectType
} from 'graphql'

import { userMutations } from '../entities/user/mutations/user'
import { reviewMutations } from '../entities/review/mutations/review'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    ...userMutations,
    ...reviewMutations
  }
})
