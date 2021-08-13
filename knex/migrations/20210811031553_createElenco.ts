import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        CREATE TABLE "cast" (
            "idMovie" integer,
            "idPerson" integer,
            CONSTRAINT "FK_cast.idPerson"
            FOREIGN KEY ("idPerson")
                REFERENCES "person"("id"),
            CONSTRAINT "FK_cast.idMovie"
            FOREIGN KEY ("idMovie")
                REFERENCES "movie"("id")
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cast')
}

