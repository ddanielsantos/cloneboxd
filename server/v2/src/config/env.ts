import dotenv from 'dotenv'

dotenv.config()

export function getEnvironmentVariables() {
  const SERVER_PORT = Number(process.env.SERVER_PORT)
  const { MONGODB_URL, DB_NAME, JWT_SECRET } = process.env

  const envArray = [
    SERVER_PORT,
    MONGODB_URL,
    DB_NAME,
    JWT_SECRET
  ]

  for (const key of envArray) {
    if (key === '') {
      throw new Error('One or more environment variables are missing')
    }
  }

  return { SERVER_PORT, MONGODB_URL, DB_NAME, JWT_SECRET }
}
