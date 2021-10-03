import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const getMovie = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(genericQuery('movie'))
}

export { getMovie }
