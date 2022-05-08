import app from './server'
import { getEnvironmentVariables } from './src/config/env'

const { PORT } = getEnvironmentVariables()

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
