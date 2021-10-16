import { Request, Response } from 'express'
import MovieRepository from 'repositories/MovieRepository'

type MovieRequestParams = Request & {
  params: {
    movieId: number
  }
}

export const deleteMovie = async (req: MovieRequestParams, res: Response): Promise<Response<any, Record<string, any>>> => {
  const toDelete = await MovieRepository.findOne(req.params.movieId)

  try {
    if (toDelete == null) {
      return res.status(500).send("movie didn't exist")
    } else {
      await MovieRepository.delete(toDelete.id)
      return res.status(200).send('movie deleted')
    }
  } catch {
    return res.status(500).send('an error ocurred')
  }
}
