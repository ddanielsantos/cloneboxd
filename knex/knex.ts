import { knex as knexDependency } from 'knex'
import { knexfile } from '../knexfile'
require('dotenv/config')
const environment = process.env.ENVIRONMENT ?? 'development'

const config = knexfile[environment]
console.log(config)

const knex = knexDependency(config)

export { knex }
