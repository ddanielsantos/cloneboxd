import dotenv from 'dotenv'

dotenv.config()

export function getEnvironmentVariables() {
  const PORT = Number(process.env.PORT)
  const { MONGODB_URL, DB_NAME, JWT_SECRET } = process.env

  const envArray = [
    PORT,
    MONGODB_URL,
    DB_NAME,
    JWT_SECRET
  ]

  for (const key of envArray) {
    if (key === '') {
      throw new Error('One or more environment variables are missing')
    }
  }

  return { PORT, MONGODB_URL, DB_NAME, JWT_SECRET }
}
