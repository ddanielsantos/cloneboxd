import { GraphQLID, GraphQLNonNull } from 'graphql'
import { CrewModel } from '../crewModel'
import { personType } from '../personTypes'

export const singleCrewMember = {
  type: personType,
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
