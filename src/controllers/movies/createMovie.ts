import { Request, Response } from 'express'
import { Movie } from '../../../types/types'
import { genericInsert } from '../genericInsert'

const createMovie = async (req: Request, res: Response): Promise<any> => {
  const data: Movie = req.body

  for (const el in data) {
    if (data[el] === '') {
      return res.status(500).send('fill all the fields')
    }

    if (data.year === 0) {
      return res.status(500).send('the year of release cannot be 0')
    }
  }

  try {
    // console.log(data)
    await genericInsert('movie', {
      ...data
    })
    return res.send('movie added')
  } catch {
    return res.status(500).send('an error occurred')
  }
}

export { createMovie }
