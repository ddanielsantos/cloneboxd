import { GraphQLID, GraphQLNonNull } from 'graphql'
import { CrewModel } from '../crewModel'
import { crewType } from '../crewTypes'

export const singleCrewMember = {
  type: crewType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return await CrewModel.findOne({
      _id: args.id
    })
  }
}
