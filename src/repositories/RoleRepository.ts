import { knex } from '@knex/knex'
import { Role } from '../../types/types'

const RoleRepository = {
  findAll: async (): Promise<Role[]> => {
    const resultSet = await knex('role').select()

    return resultSet
  }
}

export default RoleRepository
