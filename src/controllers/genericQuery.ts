import { Knex } from 'knex'
import { knex } from '../../knex/knex'

const genericQuery = (table: string): Knex.QueryBuilder => knex(table).select()

export { genericQuery }
