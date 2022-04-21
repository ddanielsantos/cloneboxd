import { GraphQLID, GraphQLNonNull } from 'graphql'
import { crewRepository } from '../crewRepository'
import { crewType } from '../crewTypes'

export const singleCrewMember = {
  type: crewType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return await crewRepository.findOne(args.id)
  }
}
