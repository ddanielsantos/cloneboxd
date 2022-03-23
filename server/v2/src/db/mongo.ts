import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const url = process.env.MONGODB_URL

if (!url) {
  throw new Error('No database url was provided')
}

const client = new MongoClient(url);

(
  async () => {
    await client.connect()
  }
)()

const dbName = process.env.DATABASE_NAME

if (!dbName) {
  throw new Error('No database name was provided')
}

export const db = client.db(dbName)
