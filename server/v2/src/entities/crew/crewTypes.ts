import {
  ThunkObjMap,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface } from '../../graphql/nodeInterface'

export const crewType = new GraphQLObjectType({
  name: 'Crew',
  description: 'Crew type',
  interfaces: () => [nodeInterface],
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
      type: new GraphQLNonNull(GraphQLString),
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

export const crewInputType: ThunkObjMap<GraphQLInputFieldConfig> = {
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
}
