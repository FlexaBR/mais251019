exports.up = function(knex, Promise) {
    return knex.schema.createTable('prepostos', table => {
        table.increments('id').primary()
        table.integer('userId').unsigned()
        table.foreign('userId').references('users.id')
        table.integer('cidadeId').unsigned()
        table.foreign('cidadeId').references('cidades.id')
        table.integer('situacao').notNull()
            .defaultTo(1)
        table.string('nome').notNull()
        table.string('cadasPor')
        table.timestamp('dataCadas')
            .defaultTo(knex.fn.now())
        table.string('atualPor')
        table.dateTime('dataAtual')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('prepostos').insert([
            { cidadeId: 10, nome: 'Preposto Teste 1' }
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('prepostos')
};