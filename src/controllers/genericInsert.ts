import { knex } from '../../knex/knex'

const genericInsert = (table: string, data: object) => knex(table).insert(data)

export { genericInsert }
