import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../../../types/types'
import { knex } from '../../../knex/knex'

dotenv.config()

const secret = process.env.JWT_SECRET ?? 'wrong secret'

const auth = async (req: Request, res: Response): Promise<Response> => {
  const credentials: User = req.body

  for (const prop in credentials) {
    if (credentials[prop] == null) {
      return res.status(401).send('fill all the fields')
    }
  }
  const result = await knex('system-user').select().where('email', credentials.email)

  if (result.length < 1) {
    return res.status(401).send("the e-mail didn't match")
  }

  try {
    const passComparation = await bcrypt.compare(credentials.password, result[0].password)

    if (!passComparation) return res.status(500).send("the credentials didn't match")

    const oneMinuteToken: string = jwt.sign({ uuid: result[0].uuid }, secret, {
      expiresIn: '15min'
    })

    return res.status(200).send({ token: oneMinuteToken })
  } catch {
    return res.status(500).send('an error occurred')

    // usar o midd auth nas rotas e checar o funcionamento
  }
}

export { auth }
