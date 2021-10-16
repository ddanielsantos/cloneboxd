import { knex } from '../../knex/knex'
import { User } from '../../types/types'

const UserRepository = {
  findByEmail: async (email: string): Promise<User[]> => {
    const resultSet = await knex('system-user').select().where('email', email)

    return resultSet
  },

  insertUser: async (user: User): Promise<void> => {
    await knex('system-user').insert(user)
  }
}

export default UserRepository
