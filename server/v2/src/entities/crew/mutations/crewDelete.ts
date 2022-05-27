import { CrewModel } from '../crewModel'
import { GraphQLNonNull, GraphQLString } from 'graphql'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

export const crewDelete = mutationWithClientMutationId({
  name: 'crewDelete',
  description: 'Delete a crew member using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's id`
    }
  },
  outputFields: {
    deletedCount: {
      type: GraphQLString,
      resolve: response => response.deletedCount
    }
  },
  mutateAndGetPayload: async ({ id }) => {
    const response = await CrewModel.deleteOne({
      _id: fromGlobalId(id).id
    })

    return response
  }
})
