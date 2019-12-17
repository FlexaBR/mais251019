const { dbp } = require('./.env')

module.exports = {
    client: 'postgresql',
    connection: dbp,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
}
