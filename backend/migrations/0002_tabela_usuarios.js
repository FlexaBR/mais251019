exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('sobreNome').notNull()
        table.string('email').notNull().unique()
        table.string('senha', 60)
        table.boolean('ativo').notNull().defaultTo(true)
        table.timestamp('dataCriacao')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios')
};