import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('role', (table) => {
    table.bigIncrements('id', { primaryKey: true })
    table.string('name').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('role')
}
