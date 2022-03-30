import dotenv from 'dotenv'

dotenv.config()

export function getEnvironmentVariables() {
  const PORT = Number(process.env.SERVER_PORT)
  const URL = process.env.MONGODB_URL
  const DB_NAME = process.env.DATABASE_NAME

  if (!PORT) {
    throw new Error('No API Port was defined')
  }

  if (!URL) {
    throw new Error('No database url was provided')
  }

  if (!DB_NAME) {
    throw new Error('No database name was provided')
  }

  return {
    PORT,
    URL,
    DB_NAME
  }
}
