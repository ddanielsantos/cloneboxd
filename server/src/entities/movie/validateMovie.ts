import { searchMovieById } from '../../services/tmdb/api'

export async function validateMovies(id: string) {
  try {
    await searchMovieById(id)

    return {
      error: null
    }
  } catch {
    return {
      error: 'Invalid movie/s'
    }
  }
}
