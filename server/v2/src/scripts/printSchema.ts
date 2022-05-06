// import path from 'path'
import { writeFileSync } from 'fs'
import { printSchema } from 'graphql'
import { schema } from '../schemas/schema'

async function execute() {
  const schemaInSchemaLanguage = printSchema(schema)

  writeFileSync('../../web/data/schema.graphql', schemaInSchemaLanguage)
}

execute()
  .then(() => process.exit(0))
