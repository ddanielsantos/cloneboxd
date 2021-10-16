import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { User } from '../../../types/types'
import UserRepository from '../../repositories/UserRepository'
import { v4 as uuid } from 'uuid'

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user: User = req.body

  if (user.email == null || user.password == null) {
    return res.status(500).send('email or password was not sent')
  }

  const cryptedPass = await bcrypt.hash(user.password, 10)

  try {
    const result = await UserRepository.findByEmail(user.email)

    if (result.length > 0) {
      return res.status(500).send('e-mail already in use')
    }

    await UserRepository.insertUser({
      email: user.email,
      password: cryptedPass,
      admin: false,
      uuid: uuid()
    })

    return res.status(200).send('user added')
  } catch {
    return res.status(500).send('an error occurred')
  }
}

export { createUser }
