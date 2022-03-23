import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const url = process.env.MONGODB_URL

if (!url) {
  throw new Error('No database url was provided')
}

export const client = new MongoClient(url)
