import { movieRepository } from './movieRepository'

export async function validadeMovies(ids: string[]) {
  try {
    await movieRepository.findMany(ids)

    return {
      error: null
    }
  } catch {
    return {
      error: 'Invalid movie/s'
    }
  }
}
