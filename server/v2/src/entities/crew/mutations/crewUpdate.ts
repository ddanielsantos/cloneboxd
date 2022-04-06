import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { crewRepository } from '../crewRepository'
import { crewInputType } from '../crewTypes'

export const crewUpdate = mutationWithClientMutationId({
  name: 'crewUpdate',
  description: 'Update a crew member using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's id`
    },
    crew: {
      type: crewInputType
    }
  },
  outputFields: {
    updatedId: {
      type: GraphQLString,
      resolve: response => response.updatedId
    }
  },
  mutateAndGetPayload: async (payload) => {
    return (await crewRepository.updateOne(payload.id, payload.crew))
  }
})
