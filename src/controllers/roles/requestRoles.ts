import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const getRoles = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(genericQuery('role'))
}

export { getRoles }
