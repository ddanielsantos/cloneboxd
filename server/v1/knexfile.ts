// Update with your config settings.
import path = require('path')

const knexfile = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'boxd',
      user: 'postgres',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'knex', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'knex', 'seeds')
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'knex', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'knex', 'seeds')
    }
  }

}

module.exports = knexfile
