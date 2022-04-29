import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { crewInputType } from '../crewTypes'
import { Crew, crewRepository } from '../crewRepository'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'

export const crewUpdate = mutationWithClientMutationId({
  name: 'crewUpdate',
  description: 'Update a crew member using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Member's id`
    },
    ...crewInputType
  },
  outputFields: {
    updatedId: {
      type: GraphQLString,
      resolve: response => response.updatedId
    }
  },
  mutateAndGetPayload: async ({ id, ...crew }: Crew & { id: string }) => {
    return (await crewRepository.updateOne(fromGlobalId(id).id, crew))
  }
})
