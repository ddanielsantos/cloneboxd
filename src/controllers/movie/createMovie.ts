import { Request, Response } from 'express'
import { Movie } from '../../../types/types'
import MovieRepository from 'repositories/MovieRepository'

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const data: Movie = req.body

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
  } catch (err) {
    if (err.code === '23502') {
      return res.status(400).send('some data wasnt sent')
    }
    return res.status(400).send('an error occurred')
  }
}

export { createMovie }
