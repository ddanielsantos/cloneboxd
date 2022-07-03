import { personType } from '../crew/personTypes'
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'

export const creditType = new GraphQLObjectType({
  name: 'Credit',
  description: 'Credit type',
  fields: () => ({
    person: {
      type: new GraphQLNonNull(personType),
      description: `Credit's actor`,
      resolve: cast => cast.person
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Person's role`,
      resolve: cast => cast.role
    }
  })
})
