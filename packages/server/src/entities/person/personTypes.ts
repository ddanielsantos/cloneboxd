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
    }   
  })
})

export const personInputType: ThunkObjMap<GraphQLInputFieldConfig> = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
    description: `Person's name`
  }
}

export const { connectionType: PersonConnection, edgeType: PersonEdge } = connectionDefinitions({
  nodeType: personType
})
