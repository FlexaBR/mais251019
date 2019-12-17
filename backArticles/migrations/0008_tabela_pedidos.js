exports.up = function(knex, Promise) {
    return knex.schema.createTable('pedidos', table => {
        table.increments('id').primary()
        table.integer('clienteId').unsigned()
        table.foreign('clienteId').references('clientes.id')
        table.integer('fabricaId').unsigned()
        table.foreign('fabricaId').references('fabricas.id')
        table.integer('prepostoId').unsigned()
        table.foreign('prepostoId').references('prepostos.id')
        table.integer('situacao').notNull()
            .defaultTo(1)
        table.dateTime('dataOrca')
            .defaultTo(knex.fn.now())
        table.decimal('total', 6, 2)
        table.decimal('desconto', 6, 2)
        table.string('cadasPor')
        table.timestamp('dataCadas')
            .defaultTo(knex.fn.now())
        table.string('atualPor')
        table.dateTime('dataAtual')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('pedidos').insert([
            { clienteId: 1, fabricaId: 1, prepostoId: 1, atualPor: 'Ricardo' }
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pedidos')
};