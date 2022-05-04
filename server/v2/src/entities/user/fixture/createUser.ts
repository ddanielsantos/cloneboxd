import { genSaltSync, hashSync } from 'bcrypt'
import { WithId } from 'mongodb'
import { User, userRepository } from '../userRepository'

export async function createUser(): Promise<WithId<User>> {
  const [user] = await userRepository.findByProperty({ email: 'tester@mail.com' })

  if (user) return user

  const userAttributes = {
    fullName: 'chad admin',
    email: 'tester@mail.com',
    isAdmin: true,
    password: '123456'
  }

  const salt = genSaltSync()
  const hashedPassword = hashSync(userAttributes.password, salt)

  const { insertedId } = await userRepository.insertOne({
    ...userAttributes,
    password: hashedPassword
  })

  return {
    _id: insertedId,
    fullName: 'chad admin',
    email: 'tester@mail.com',
    isAdmin: true,
    password: hashedPassword
  }
}
