import { Request, Response } from 'express'
import MovieRepository from 'repositories/MovieRepository'

const requestMovies = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(await MovieRepository.findAll())
}

export { requestMovies }
