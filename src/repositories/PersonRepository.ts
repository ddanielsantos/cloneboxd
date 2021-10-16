import { knex } from '../../knex/knex'
import { Person } from '../../types/types'

const PersonRepository = {
  findAll: async (): Promise<Person[]> => {
    const resultSet = await knex('person').select()

    return resultSet
  }
}

export default PersonRepository
