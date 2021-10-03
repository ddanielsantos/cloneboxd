import { Knex } from 'knex'
import { knex } from '../../knex/knex'

const genericInsert = (table: string, data: object): Knex.QueryBuilder => knex(table).insert(data)

export { genericInsert }
