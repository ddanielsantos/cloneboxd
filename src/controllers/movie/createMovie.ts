import { Request, Response } from 'express'
import { Movie } from '../../../types/types'
import { databaseErrorList } from 'helpers/errors/errors'
import { isMovie } from 'helpers/validators/runtimeTypeGuards'
import MovieRepository from 'repositories/MovieRepository'

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const data: Movie = req.body

  if (!isMovie(data)) {
    return res.status(400).send('cacetes')
  }

  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).send('the content type must be "application/json"')
  }

  if (data.id != null) {
    return res.status(400).send('you cannot specify an id')
  }

  for (const property in data) {
    if (data[property] === '') {
      return res.status(400).send('fill all the fields')
    }

    if (data.year === 0) {
      return res.status(400).send('the year of release cannot be 0')
    }
  }

  try {
    await MovieRepository.insert(data)

    return res.status(200).send('movie added')
  } catch (insertionError) {
    for (const element of databaseErrorList) {
      if (element.code === insertionError.code) {
        return res.status(400).send(element.message)
      }
    }
    return res.status(400).send('an error occurred')
  }
}

export { createMovie }
