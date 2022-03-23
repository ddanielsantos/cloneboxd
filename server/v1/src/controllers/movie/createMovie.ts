import { Request, Response } from 'express'
import { Movie } from '../../../types/types'
import { databaseErrorList } from 'helpers/errors/errors'
import MovieRepository from 'repositories/MovieRepository'
import { validateMovie } from 'helpers/validators/validateMovie'

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).send('the content type must be "application/json"')
  }

  const data: Movie = req.body

  const validMovie = validateMovie(data)

  if ('error' in validMovie) {
    return res.status(400).send(validMovie.error)
  }

  try {
    await MovieRepository.insert(data)

    return res.status(201).send('movie added')
  } catch (insertionError) {
    for (const element of databaseErrorList) {
      if (element.code === insertionError.code) {
        return res.status(400).send(element.message)
      }
    }

    return res.status(500).send('an error occurred')
  }
}

export { createMovie }
