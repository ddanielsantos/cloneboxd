import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const requestRoles = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(await genericQuery('role'))
}

export { requestRoles }
