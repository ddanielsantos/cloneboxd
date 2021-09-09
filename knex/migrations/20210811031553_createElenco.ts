import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.raw(`
        CREATE TABLE "cast" (
            "idMovie" integer,
            "idPerson" integer,
            "role" integer NOT NULL,
            CONSTRAINT "FK_cast.role"
            FOREIGN KEY ("role")
                REFERENCES "role"("id"),
            CONSTRAINT "FK_cast.idPerson"
            FOREIGN KEY ("idPerson")
                REFERENCES "person"("id"),
            CONSTRAINT "FK_cast.idMovie"
            FOREIGN KEY ("idMovie")
                REFERENCES "movie"("id")
        );
    `)
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('cast')
}
