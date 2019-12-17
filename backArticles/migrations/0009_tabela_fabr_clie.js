exports.up = function(knex, Promise) {
    return knex.schema.createTable('fabr_clie', table => {
        table.increments('id').primary()
        table.integer('fabricaId').unsigned()
        table.foreign('fabricaId').references('fabricas.id')
        table.integer('clienteId').unsigned()
        table.foreign('clienteId').references('clientes.id')
        table.integer('prepostoId').unsigned()
        table.foreign('prepostoId').references('prepostos.id')
        table.decimal('comiClie', 6, 2)
        table.string('tabela')
        table.string('atualPor')
        table.dateTime('dataAtual')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('fabr_clie').insert([
            { fabricaId: 1, clienteId: 1, prepostoId: 1, comiClie: 5 }
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fabr_clie')
};