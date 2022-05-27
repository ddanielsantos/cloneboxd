import { connectToDatabase, disconnectFromDatabase } from '../src/db/mongoose'

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await disconnectFromDatabase()
})
