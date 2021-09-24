import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import { User } from '../../../types/types'
import { knex } from '../../../knex/knex'

const auth = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const credentials: User = req.body

  if (credentials.password == null || credentials.email == null) {
    return res.status(401).send('email or password was not sent')
  }

  const result = await knex('system-user').select().where('email', credentials.email)

  if (result.length < 1) {
    return res.status(401).send("the e-mail didn't match")
  }

  try {
    const passComparation = await bcrypt.compare(credentials.password, result[0].password)

    if (!passComparation) return res.status(500).send("the credentials didn't match")

    return res.send('logged')
  } catch {
    return res.status(500).send('an error occurred')
  }
}

export { auth }
