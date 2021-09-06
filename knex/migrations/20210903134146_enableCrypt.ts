import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`CREATE EXTENSION pgcrypto;`)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`DROP EXTENSION pgcrypto;`)
}

