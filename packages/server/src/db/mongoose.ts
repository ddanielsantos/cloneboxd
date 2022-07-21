import mongoose from 'mongoose'
import { getEnvironmentVariables } from '../config/env'

const { MONGODB_URL } = getEnvironmentVariables()

export async function connectToDatabase() {
  mongoose.connection
    .on('error', err => console.error(err))
    .once('open', () => {
      if (process.env.TESTING !== 'true') console.log('Connected to database')
    })

  await mongoose.connect(MONGODB_URL!)
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close()
}
