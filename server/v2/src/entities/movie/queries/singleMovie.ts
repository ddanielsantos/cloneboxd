import { GraphQLID, GraphQLNonNull } from 'graphql'
import { fromGlobalId } from 'graphql-relay'
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
    try {
      const { id } = fromGlobalId(args.id)
      return await MovieModel.findOne({
        _id: id
      })
    } catch {
      return null
    }
  }
}
