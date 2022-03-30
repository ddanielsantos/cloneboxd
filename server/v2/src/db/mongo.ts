import { MongoClient } from 'mongodb'
import { getEnvironmentVariables } from '../config/env'

const { URL, DB_NAME } = getEnvironmentVariables()
const client = new MongoClient(URL);

(
  async () => {
    await client.connect()
  }
)()

export const db = client.db(DB_NAME)
