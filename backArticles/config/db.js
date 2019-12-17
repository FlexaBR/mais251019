const config = require('../knexfile.js')
const knex = require('knex')(config)

// para fazer as migrations automaticamente... não é muito seguro para sistemas em produção e grandes..
// knex.migrate.latest([config])
module.exports = knex