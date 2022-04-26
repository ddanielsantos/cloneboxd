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
    // TODO: Add validation and change filter to be perfomed in the database
    const possibleCrewMembers = (await crewRepository.findAll()).map(member => member._id.toString())

    const isntAValidMember = (id: string) => !possibleCrewMembers.includes(id)

    if (payload.actors.some(isntAValidMember)) {
      throw new Error('Actors field must have at least one valid actor id')
    }

    if (payload.directors.some(isntAValidMember)) {
      throw new Error('Directors field must have at least one valid director id')
    }

    return (await movieRepository.insertOne({ ...payload }))
  }
})
