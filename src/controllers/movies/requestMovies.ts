import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const getMovies = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  return res.send(await genericQuery('movie'))
}

export { getMovies }
