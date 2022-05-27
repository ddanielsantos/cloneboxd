import { GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { CrewModel } from '../crewModel'
import { crewInputType, crewType } from '../crewTypes'

export const crewCreate = mutationWithClientMutationId({
  name: 'crewCreate',
  description: 'Add a crew member',
  inputFields: {
    ...crewInputType
  },
  outputFields: {
    crew: {
      type: crewType,
      resolve: response => response.crew
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async (payload) => {
    const document = new CrewModel(payload)

    try {
      await document.validate()
      await document.save()

      return {
        crew: document
      }
    } catch {
      return {
        crew: null,
        error: 'Invalid crew member'
      }
    }
  }
})
