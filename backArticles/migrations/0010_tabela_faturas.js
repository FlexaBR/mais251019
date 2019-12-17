exports.up = function(knex, Promise) {
    return knex.schema.createTable('faturas', table => {
        table.increments('id').primary()
        table.integer('pedidoId').unsigned()
        table.foreign('pedidoId').references('pedidos.id')
        table.boolean('cancelado')
            .notNull().defaultTo(false)
        table.string('nf')    
        table.dateTime('dataFatu')
        table.decimal('valFatu', 6, 2)
        table.string('cadasPor')
        table.timestamp('dataCadas')
            .defaultTo(knex.fn.now())
        table.string('atualPor')
        table.dateTime('dataAtual')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('faturas').insert([
            { pedidoId: 1, nf: 'nf 1 tst'}
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('faturas')
};