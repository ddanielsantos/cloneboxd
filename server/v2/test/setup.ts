import { connectToDatabase, disconnectFromDatabase } from '../src/db/mongoose'

beforeAll(connectToDatabase)

afterAll(disconnectFromDatabase)
