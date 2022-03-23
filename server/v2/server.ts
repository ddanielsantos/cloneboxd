import Koa from 'koa'
import cors from '@koa/cors'
import dotenv from 'dotenv'
import { router } from './src/routes'

dotenv.config()

const app = new Koa()
const PORT = Number(process.env.SERVER_PORT)

if (!PORT) {
  throw new Error('No API Port was defined')
}

function getOrigin() {
  return process.env.ORIGIN ?? `http://localhost:${PORT}`
}

app.use(cors({ origin: getOrigin() }))
app.use(router.routes())
app.listen(PORT, () => console.log(`server running on: http://localhost:${PORT}`))
