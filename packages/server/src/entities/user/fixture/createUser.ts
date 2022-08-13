import { UserModel } from '../userModel'
import { genSaltSync, hashSync } from 'bcrypt'

type Options = {
  username: string
}

export async function createUser(options: Options) {
  const user = await UserModel.findOne({ username: options.username })

  if (user) return user

  const salt = genSaltSync()

  const document = new UserModel({
    fullName: 'chad admin',
    email: `${options.username}@mail.com`,
    username: options.username,
    isAdmin: false,
    password: '123456'
  })

  await document.save()

  const hashedPassword = hashSync(document.password, salt)

  document.update({ password: hashedPassword })

  return document
}
