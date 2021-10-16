import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  if (req.headers.authorization == null) {
    return res.status(400).send('Cannot authenticate')
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null || jwtSecret == null) {
    return res.status(400).send('Cannot authenticate')
  }

  try {
    jwt.verify(token, jwtSecret)

    next()
  } catch {
    return res.status(500).send('invalid token')
  }
}

export default authMiddleware
