import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const requestPersons = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(await genericQuery('person'))
}

export { requestPersons }
