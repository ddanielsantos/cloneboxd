import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql'
import { movie } from './movie'

const movies = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    duration: '2h 22min',
    releaseDate: '14 October 1994',
    genres: ['Crime', 'Drama'],
    ageGroup: '15+',
    rating: '9.3',
    actors: [
      {
        id: '1',
        name: 'Tim Robbins',
        nacionality: 'USA',
        dateOfBirth: '1957-08-17'
      },
      {
        id: '2',
        name: 'Morgan Freeman',
        nacionality: 'USA',
        dateOfBirth: '1937-06-01'
      },
      {
        id: '3',
        name: 'Bob Gunton',
        nacionality: 'USA',
        dateOfBirth: '1954-01-01'
      }
    ],
    directors: [
      {
        id: '1',
        name: 'Frank Darabont',
        nacionality: 'USA',
        dateOfBirth: '1954-01-01'
      }
    ]
  },
  {
    id: '2',
    title: 'The Godfather',
    duration: '2h 55min',
    releaseDate: '24 March 1972',
    genres: ['Crime', 'Drama'],
    ageGroup: '15+',
    rating: '9.2',
    actors: [
      {
        id: '1',
        name: 'Marlon Brando',
        nacionality: 'USA',
        dateOfBirth: '1924-09-25'
      },
      {
        id: '2',
        name: 'Al Pacino',
        nacionality: 'USA',
        dateOfBirth: '1940-04-25'
      },
      {
        id: '3',
        name: 'James Caan',
        nacionality: 'USA',
        dateOfBirth: '1940-04-25'
      }
    ],
    directors: [
      {
        id: '1',
        name: 'Francis Ford Coppola',
        nacionality: 'USA',
        dateOfBirth: '1939-04-25'
      }
    ]
  }
]

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      allMovies: {
        type: new GraphQLList(movie),
        resolve: () => movies
      },
      singleMovie: {
        type: movie,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve: (root, args) => {
          return movies.find(movie => movie.id === args.id)
        }
      }
    }
  })
})
