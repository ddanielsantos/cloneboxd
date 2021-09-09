import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { user } from '../../../types/types'
import { genericInsert } from '../genericInsert'
import { knex } from '../../../knex/knex'

const createUser = async (req: Request, res: Response) => {
  const user: user = req.body
  // const salt = await bcrypt.genSalt()
  const hasheada = await bcrypt.hash(user.password, 10)

  try {
    const result = await knex('system-user').where('email', user.email)
    if (result.length > 0) return res.status(500).send('E-mail already in use')

    await genericInsert('system-user', {
      email: user.email,
      password: hasheada
    })

    res.send('User added')
  } catch {
    res.status(500).send('An error occured')
  }
  // return res.send({senha: hasheada})
  // const a = genericInsert('system-user', user)
}
export { createUser }
