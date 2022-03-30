import { MongoClient } from 'mongodb'
import { generateEnvironmentVariables } from '../config/env'

const { URL, DB_NAME } = generateEnvironmentVariables()
const client = new MongoClient(URL);

(
  async () => {
    await client.connect()
  }
)()

export const db = client.db(DB_NAME)
