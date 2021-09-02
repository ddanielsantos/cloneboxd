require('dotenv/config')
const environment = process.env.ENVIRONMENT 
// || 'development'

const config = require('../knexfile')[environment]
console.log(config)
module.exports = require('knex')(config)