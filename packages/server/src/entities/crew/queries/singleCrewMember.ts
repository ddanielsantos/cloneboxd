import { GraphQLID, GraphQLNonNull } from 'graphql'
import { personType } from '../personTypes'

export const singleCrewMember = {
  type: personType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return []
  }
}
