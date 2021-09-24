import { Knex } from 'knex'
import { knex } from '../../knex/knex'

const genericInsert = (table: string, data: object): Knex.QueryBuilder<any, number[]> => knex(table).insert(data)

export { genericInsert }
