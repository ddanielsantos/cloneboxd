import { MovieModel } from './movieModel'

export async function validateMovies(ids: string[]) {
  try {
    await MovieModel.find({
      _id: {
        $in: ids
      }
    })

    return {
      error: null
    }
  } catch {
    return {
      error: 'Invalid movie/s'
    }
  }
}
