import { MongoClient } from 'mongodb'
import { getEnvironmentVariables } from '../config/env'

const { MONGODB_URL, DB_NAME } = getEnvironmentVariables()
export const client = new MongoClient(MONGODB_URL!);

(
  async () => {
    await client.connect()
  }
)()

export const db = client.db(DB_NAME)
