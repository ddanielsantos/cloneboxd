import {
  ThunkObjMap,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig
} from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { nodeInterface } from '../../graphql/nodeInterface'

export const personType = new GraphQLObjectType({
  name: 'Person',
  description: 'Person type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('Person', person => person.id),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Person's name`,
      resolve: person => person.name
    },
    nacionality: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Person's nacionality`,
      resolve: person => person.nacionality
    },
    dateOfBirth: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Person's date of birth`,
      resolve: person => person.dateOfBirth
    }
  })
})

export const personInputType: ThunkObjMap<GraphQLInputFieldConfig> = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Person's name`
  },
  nacionality: {
    type: GraphQLString,
    description: `Person's nacionality`
  },
  dateOfBirth: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Person's date of birth`
  }
}

export const { connectionType: PersonConnection, edgeType: PersonEdge } = connectionDefinitions({
  nodeType: personType
})
