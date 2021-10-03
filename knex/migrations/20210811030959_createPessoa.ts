import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('person', (table) => {
    table.bigIncrements('id', { primaryKey: true })
    table.string('name').notNullable()
    table.string('gender').notNullable()
    table.date('bornAt').notNullable()
    table.string('nacionality').notNullable()
    table.text('bio')
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('person')
}
