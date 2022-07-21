import dotenv from 'dotenv'

dotenv.config()

export function getEnvironmentVariables() {
  const PORT = Number(process.env.PORT)
  const { MONGODB_URL, DB_NAME, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, TMDB_API_KEY } = process.env

  const envArray = [
    PORT,
    MONGODB_URL,
    DB_NAME,
    TMDB_API_KEY,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
  ]

  for (const key of envArray) {
    if (key === '') {
      throw new Error('One or more environment variables are missing')
    }
  }

  return { PORT, MONGODB_URL, DB_NAME, ACCESS_TOKEN_SECRET, TMDB_API_KEY, REFRESH_TOKEN_SECRET }
}
