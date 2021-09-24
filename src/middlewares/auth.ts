import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token === null) {
    return res.status(400).send('Cannot authenticate')
  }

  jwt.verify(token, jwtSecret)
}
