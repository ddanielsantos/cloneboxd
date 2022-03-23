import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('system-user', (table) => {
    table.bigIncrements('id', { primaryKey: true })
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.uuid('uuid').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('system-user')
}
