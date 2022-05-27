import { genSaltSync, hashSync } from 'bcrypt'
import { WithId } from 'mongodb'
import { UserModel } from '../userModel'

export async function createUser() {
  const user = await UserModel.findOne({ email: 'tester@mail.com' })

  if (user) return user

  const salt = genSaltSync()

  const document = new UserModel({
    fullName: 'chad admin',
    email: 'tester@mail.com',
    isAdmin: true,
    password: '123456'
  })

  await document.save()

  const hashedPassword = hashSync(document.password, salt)

  document.update({ password: hashedPassword })

  return document
}
