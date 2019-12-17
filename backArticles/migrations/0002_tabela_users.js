exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.string('atividade')
        table.boolean('ativo').notNull().defaultTo(true)
        table.timestamp('dataCriacao')
            .defaultTo(knex.fn.now())        
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
