import { knex } from '../../knex/knex'

const genericQuery = (table: string): {} => knex(table).select()

export { genericQuery }
