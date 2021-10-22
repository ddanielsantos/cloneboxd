import { knex } from '@knex/knex'
import { Movie } from '../../types/types'

const MovieRepository = {
  insert: async (movie: Movie): Promise<void> => {
    await knex('movie').insert(movie)
  },

  findAll: async (): Promise<Movie[]> => {
    const resultSet = await knex('movie').select()

    return resultSet
  },

  findOne: async (movieId: number): Promise<Movie> => {
    const result = await knex('movie').select().where('id', movieId)

    return result[0]
  },

  delete: async (movieId: number): Promise<void> => {
    await knex('movie').delete().where('id', movieId)
  },

  update: async (movieId: number, newMovieData: Movie): Promise<void> => {
    await knex('movie').where('id', movieId).update(newMovieData)
  }
}

export default MovieRepository
