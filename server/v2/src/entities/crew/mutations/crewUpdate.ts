import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { personInputType } from '../personTypes'
import { CrewModel } from '../crewModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

export const crewUpdate = mutationWithClientMutationId({
  name: 'crewUpdate',
  description: 'Update a crew member using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's id`
    },
    ...personInputType
  },
  outputFields: {
    updatedId: {
      type: GraphQLString,
      resolve: response => response.updatedId
    }
  },
  mutateAndGetPayload: async ({ id, ...crew }) => {
    return (await CrewModel.updateOne({
      _id: fromGlobalId(id).id
    }, {
      $set: crew
    }))
  }
})
