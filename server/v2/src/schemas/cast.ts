import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

export const cast = new GraphQLObjectType({
  name: 'Cast',
  description: 'Cast type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier of the member',
      resolve: cast => cast.id
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's name`,
      resolve: cast => cast.name
    },
    nacionality: {
      type: GraphQLString,
      description: `Member's nacionality`,
      resolve: cast => cast.nacionality
    },
    dateOfBirth: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's date of birth`,
      resolve: cast => cast.dateOfBirth
    }
  })
})
