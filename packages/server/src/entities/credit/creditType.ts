import { personType } from '../person/personTypes'
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'

export const creditType = new GraphQLObjectType({
  name: 'Credit',
  description: 'Who made what on this movie development',
  fields: () => ({
    person: {
      type: new GraphQLNonNull(personType),
      description: `Who played this role`,
      resolve: cast => cast.person
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
      description: `What was the role of this person on this movie development`,
      resolve: cast => cast.role
    }
  })
})
