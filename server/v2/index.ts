import app from './server'
import { getEnvironmentVariables } from './src/config/env'

const { SERVER_PORT } = getEnvironmentVariables()

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
})
