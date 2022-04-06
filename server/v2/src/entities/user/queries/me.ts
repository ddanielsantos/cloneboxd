import { GraphQLID, GraphQLNonNull } from 'graphql'
import { userRepository } from '../userRepository'
import { userType } from '../userTypes'

export const me = {
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return await userRepository.findOne(args.id)
  }
}
