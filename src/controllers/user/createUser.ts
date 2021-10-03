import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { User } from '../../../types/types'
import { genericInsert } from '../genericInsert'
import { knex } from '../../../knex/knex'
import { v4 as uuid } from 'uuid'

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user: User = req.body

  if (user.email == null || user.password == null) {
    return res.status(500).send('email or password was not sent')
  }

  const cryptedPass = await bcrypt.hash(user.password, 10)

  try {
    const result = await knex('system-user').where('email', user.email)

    if (result.length > 0) {
      return res.status(500).send('e-mail already in use')
    }

    await genericInsert('system-user', {
      uuid: uuid(),
      email: user.email,
      password: cryptedPass
    })

    return res.status(200).send('user added')
  } catch {
    return res.status(500).send('an error occurred')
  }
}

export { createUser }
