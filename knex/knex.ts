const environment = process.env.ENVIRONMENT || 'zap'

const config = require('../knexfile')[environment]
console.log(config)
module.exports = require('knex')(config)