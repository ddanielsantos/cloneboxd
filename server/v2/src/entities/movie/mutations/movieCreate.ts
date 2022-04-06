import {
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { movieRepository } from '../movieRepository'

export const movieCreate = mutationWithClientMutationId({
  name: 'movieCreate',
  description: 'Add a movie',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    duration: {
      type: new GraphQLNonNull(GraphQLString)
    },
    releaseDate: {
      type: new GraphQLNonNull(GraphQLString)
    },
    genres: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
    },
    ageGroup: {
      type: new GraphQLNonNull(GraphQLString)
    },
    rating: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    actors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
    },
    directors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
    }
  },
  outputFields: {
    insertedId: {
      type: GraphQLString,
      resolve: response => response.insertedId
    }
  },
  mutateAndGetPayload: async (payload) => {
    return (await movieRepository.insertOne({ ...payload }))
  }
})
