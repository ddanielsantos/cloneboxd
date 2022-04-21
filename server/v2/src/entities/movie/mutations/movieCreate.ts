import {
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { Movie, movieRepository } from '../movieRepository'
import { crewRepository } from '../../crew/crewRepository'

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
  mutateAndGetPayload: async (payload: Movie) => {
    // TODO: the same thing to reviews
    // and also to mutations
    const possibleCrewMembers = (await crewRepository.findAll()).map(member => member._id.toString())

    if (payload.actors.some(id => !possibleCrewMembers.includes(id))) {
      throw new Error('Actors field must have at least one valid actor id')
    }

    if (payload.directors.some(id => !possibleCrewMembers.includes(id))) {
      throw new Error('Directors field must have at least one valid director id')
    }

    return (await movieRepository.insertOne({ ...payload }))
  }
})
