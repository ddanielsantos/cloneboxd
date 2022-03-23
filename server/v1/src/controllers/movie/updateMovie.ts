import { Request, Response } from 'express'
import { Movie } from '../../../types/types'
import MovieRepository from '@repositories/MovieRepository'

export const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const data: Movie = req.body

  if (data.id == null) {
    return res.status(400).send('you need to specify an movie id')
  }
  // Fazer tratativa para caso nao mande nada { id, titulo, origem, nacion }

  const toUpdate = await MovieRepository.findOne(data.id)

  try {
    if (toUpdate == null) {
      return res.status(500).send("movie didn't exist")
    } else {
      // await MovieRepository.update(data.id, data)
      return res.status(200).send('movie updated')
    }
  } catch {
    return res.status(500).send('an error ocurred')
  }
}
