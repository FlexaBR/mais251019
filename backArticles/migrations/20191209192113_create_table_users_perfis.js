exports.up = function(knex, Promise) {
    return knex.schema.createTable('users_perfis', table => {
        table.integer('userId').unsigned()
        table.integer('perfilId').unsigned()
        table.foreign('userId').references('users.id')
        table.foreign('perfilId').references('perfis.id')
        table.primary(['userId', 'perfilId'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_perfis')
};