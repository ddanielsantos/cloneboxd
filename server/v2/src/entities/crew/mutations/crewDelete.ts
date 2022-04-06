import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { crewRepository } from '../crewRepository'

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
    deletedId: {
      type: GraphQLString,
      resolve: response => response.deletedId
    }
  },
  mutateAndGetPayload: async (payload) => {
    return (await crewRepository.deleteOne(payload.id))
  }
})
