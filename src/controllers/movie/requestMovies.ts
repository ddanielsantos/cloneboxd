import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const requestMovies = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(await genericQuery('movie'))
}

export { requestMovies }
