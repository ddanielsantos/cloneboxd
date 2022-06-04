import { GraphQLString } from 'graphql'
import { CrewModel, ICrew } from '../crewModel'
import { crewInputType, crewType } from '../crewTypes'
import { mutationWithClientMutationId } from 'graphql-relay'
import { BetaMongoose2GQLInput } from '../../../types/types'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'

type Crew = BetaMongoose2GQLInput<ICrew>

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
  mutateAndGetPayload: async ({ ...crew }: Crew, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload?.admin !== true) {
      return {
        error: 'Unauthorized'
      }
    }

    const document = new CrewModel(crew)

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
