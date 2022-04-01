import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { movieInput } from '../entities/movie/movieTypes'
import { crewInput } from '../entities/crew/crewTypes'
import { movieRepository } from '../entities/movie/movieRepository'
import { crewRepository } from '../entities/crew/crewRepostitory'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    addMovie: {
      type: new GraphQLObjectType({
        name: 'AddMovie',
        description: 'Add a movie',
        fields: {
          insertedId: {
            type: GraphQLString,
            resolve: response => response.insertedId
          }
        }
      }),
      args: {
        input: {
          type: new GraphQLNonNull(movieInput)
        }
      },
      resolve: async (_root, args) => {
        const newMovie = await movieRepository.insertOne(args.input)
        return newMovie
      }
    },
    deleteMovie: {
      type: new GraphQLObjectType({
        name: 'DeleteMovie',
        description: 'Delete a movie using its id',
        fields: {
          deletedCount: {
            type: GraphQLInt,
            resolve: response => response.deletedCount
          }
        }
      }),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_root, args) => {
        return await movieRepository.deleteOne(args.id)
      }
    },
    updateMovie: {
      type: new GraphQLObjectType({
        name: 'UpdateMovie',
        description: 'Update a movie using its id',
        fields: {
          modifiedCount: {
            type: GraphQLInt,
            resolve: response => response.modifiedCount
          }
        }
      }),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        movie: {
          type: movieInput
        }
      },
      resolve: async (_root, args) => {
        return await movieRepository.updateOne(args.id, args.movie)
      }
    },
    addCrew: {
      type: new GraphQLObjectType({
        name: 'AddCrew',
        description: 'Add a crew member',
        fields: {
          insertedId: {
            type: GraphQLString,
            resolve: response => response.insertedId
          }
        }
      }),
      args: {
        crew: {
          type: crewInput
        }
      },
      resolve: async (_root, args) => {
        const newCrew = await crewRepository.insertOne(args.input)
        return newCrew
      }
    }
  }
})
