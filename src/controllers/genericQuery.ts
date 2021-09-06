import { Knex } from "knex"

const knex = require("../../knex/knex") as Knex

const genericQuery = (table: string) => knex(table).select()

export { genericQuery }