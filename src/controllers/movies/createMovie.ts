import { Request, Response } from 'express'
import { Movie } from '../../../types/types'
import { genericInsert } from '../genericInsert'

const createMovie = async (req: Request, res: Response): Promise<any> => {
  const data: Movie = req.body

  for (const el in data) {
    if (!data[el]) return res.status(500).send('Fill all the fields')
  }

  try {
    await genericInsert('movie', {
      ...data
    })
    return res.send('Movie added')
  } catch {
    return res.status(500).send('An error occurred')
  }
}

export { createMovie }
