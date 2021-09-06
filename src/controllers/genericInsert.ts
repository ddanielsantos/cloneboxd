import { Knex } from "knex"

const knex = require("../../knex/knex") as Knex

const genericInsert = (table: string, data: object) => knex(table).insert(data)

export { genericInsert }