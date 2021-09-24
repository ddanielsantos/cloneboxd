import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const getMovie = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  return res.send(await genericQuery('movie'))
}

export { getMovie }
