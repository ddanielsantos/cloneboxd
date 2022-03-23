import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('movie', (table) => {
    table.bigIncrements('id', { primaryKey: true })
    table.string('title').notNullable()
    table.string('duration').notNullable()
    table.integer('year').notNullable()
    table.string('origin').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('movie')
}
