const environment = process.env.ENVIRONMENT || 'zap'
const config = require('../knexfile.ts')[environment]
module.exports = require('knex')(config)