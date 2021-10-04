import express from 'express'
import cors from 'cors'
import { router } from '@routes/routes'
require('dotenv/config')
const port = process.env.PORT ?? 2020
const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(express.json()) // SEMPRE LEMBRAR DESSA PORCARIA ANTES DE QUALQUER UTILIZAÇÃO DO REQUEST

app.use(router)

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
