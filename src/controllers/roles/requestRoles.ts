import { Request, Response } from 'express';
import { genericQuery } from '../genericQuery';

const getRoles = async (req: Request, res: Response) => {
  return res.send(await genericQuery('role'))
}

export { getRoles }
