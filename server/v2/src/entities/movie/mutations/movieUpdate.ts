import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { movieInputType } from '../movieTypes'
import { MovieModel } from '../movieModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { validateCrewMembers } from '../../crew/validateCrewMembers'

export const movieUpdate = mutationWithClientMutationId({
  name: 'movieUpdate',
  description: 'Update a movie using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ...movieInputType
  },
  outputFields: {
    result: {
      type: GraphQLString,
      resolve: response => response.result
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ id, ...movie }) => {
    const { error } = await validateCrewMembers([...movie.actors, ...movie.directors])

    if (error) {
      return {
        error
      }
    }

    const result = await MovieModel.updateOne({
      _id: fromGlobalId(id).id
    }, { $set: movie })

    return {
      result
    }
  }
})
