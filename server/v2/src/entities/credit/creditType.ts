import { personType } from '../crew/personTypes'
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface } from '../../graphql/nodeInterface'

export const creditType = new GraphQLObjectType({
  name: 'Credit',
  description: 'Credit type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('Credit', cast => cast.id),
    person: {
      type: new GraphQLNonNull(personType),
      description: `Credit's actor`,
      resolve: cast => cast.actor
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Person's role`,
      resolve: cast => cast.role
    }
  })
})
