import { Request, Response } from 'express';
import { genericQuery } from '../genericQuery';

const getPerson = async (req: Request, res: Response) => {
  return res.send(await genericQuery('person'))
}

export { getPerson }
