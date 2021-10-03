import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const getPerson = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(genericQuery('person'))
}

export { getPerson }
