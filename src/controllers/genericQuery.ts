import knex from "../../knex/knex.js"

const genericQuery = (table: string) => knex(table).select()

export { genericQuery }