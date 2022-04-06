import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID
} from 'graphql'

export const crewType = new GraphQLObjectType({
  name: 'Crew',
  description: 'Crew type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Member's unique identifier`,
      resolve: crew => crew._id
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's name`,
      resolve: crew => crew.name
    },
    nacionality: {
      type: GraphQLString,
      description: `Member's nacionality`,
      resolve: crew => crew.nacionality
    },
    dateOfBirth: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's date of birth`,
      resolve: crew => crew.dateOfBirth
    }
  })
})

export const crewInputType = new GraphQLInputObjectType({
  name: 'CrewInput',
  description: 'Crew input type',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's name`
    },
    nacionality: {
      type: GraphQLString,
      description: `Member's nacionality`
    },
    dateOfBirth: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's date of birth`
    }
  })
})
