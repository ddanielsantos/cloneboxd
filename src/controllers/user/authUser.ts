import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../../../types/types'
import { knex } from '../../../knex/knex'

const auth = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const credentials: User = req.body
  const result = await knex('system-user').select().where('email', credentials.email)

  if (result.length < 1) {
    return res.status(401).send("E-mail didn't match")
  }

  try {
    const comp = await bcrypt.compare(credentials.password, result[0].password)
    return res.send(comp)
  } catch {
    return res.status(401).send('Wrong password')
  }
}

export { auth }
