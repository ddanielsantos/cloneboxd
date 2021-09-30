import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.alterTable('system-user', (table) => {
    table.uuid('uuid').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.alterTable('system-user', (table) => {
    table.dropColumn('uuid')
  })
}
