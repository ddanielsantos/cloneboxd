import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { crewRepository } from '../crewRepository'

export const crewCreate = mutationWithClientMutationId({
  name: 'crewCreate',
  description: 'Add a crew member',
  inputFields: {
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
  },
  outputFields: {
    insertedId: {
      type: GraphQLString,
      resolve: response => response.insertedId
    }
  },
  mutateAndGetPayload: async (payload) => {
    return (await crewRepository.insertOne({ ...payload }))
  }
})
