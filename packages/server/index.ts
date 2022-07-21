import app from './server'
import { connectToDatabase } from './src/db/mongoose'
import { getEnvironmentVariables } from './src/config/env'

const { PORT } = getEnvironmentVariables()

app.listen(PORT, async () => {
  await connectToDatabase()

  console.log(`Server is listening on port ${PORT}`)
})
