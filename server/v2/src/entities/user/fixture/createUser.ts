import { UserModel } from '../userModel'
import { genSaltSync, hashSync } from 'bcrypt'

type Options = {
  admin: boolean
}

export async function createUser(options: Options) {
  const user = await UserModel.findOne({ email: 'tester@mail.com', isAdmin: options.admin })

  if (user) return user

  const salt = genSaltSync()

  const document = new UserModel({
    fullName: 'chad admin',
    email: 'tester@mail.com',
    isAdmin: options.admin,
    password: '123456'
  })

  await document.save()

  const hashedPassword = hashSync(document.password, salt)

  document.update({ password: hashedPassword })

  return document
}
