exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000)
        table.binary('content').notNull()
        table.integer('usuario_id').unsigned().notNull()
        table.foreign('usuario_id').references('usuarios.id')
        table.integer('category_id').unsigned().notNull()
        table.foreign('category_id').references('categories.id')
        table.timestamp('dataCadas')
            .defaultTo(knex.fn.now())
        table.dateTime('dataAtual')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};