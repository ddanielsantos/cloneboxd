import { GraphQLID, GraphQLNonNull } from 'graphql'
import { movieRepository } from '../movieRepository'
import { movieType } from '../movieTypes'

export const singleMovie = {
  type: movieType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return await movieRepository.findOne(args.id)
  }
}
