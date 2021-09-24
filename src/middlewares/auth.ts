import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

export const auth = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> => {
  if (req.headers.authorization === null) {
    return res.status(400).send('Cannot authenticate')
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null || jwtSecret == null) {
    return res.status(400).send('Cannot authenticate')
  }

  const a = jwt.verify(token, jwtSecret)

  return res.send({ r: a })
}
