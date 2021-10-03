import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('cast', (table) => {
    table.integer('idMovie')
    table.integer('idPerson')
    table.integer('role').notNullable()
    table.foreign('idMovie').references('id').inTable('movie')
    table.foreign('idPerson').references('id').inTable('person')
    table.foreign('role').references('id').inTable('role')
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('cast')
}
