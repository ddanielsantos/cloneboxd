import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

export const cast = new GraphQLObjectType({
  name: 'Cast',
  description: 'Cast type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the actor'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Actor name'
    },
    nacionality: {
      type: GraphQLString,
      description: 'Actor nacionality'
    },
    dateOfBirth: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Actor date of birth'
    }
  })
})
