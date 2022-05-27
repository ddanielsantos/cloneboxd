import { GraphQLID, GraphQLNonNull } from 'graphql'
import { MovieModel } from '../movieModel'
import { movieType } from '../movieTypes'

export const singleMovie = {
  type: movieType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_: any, args: { id: string }) => {
    return await MovieModel.findOne({
      _id: args.id
    })
  }
}
