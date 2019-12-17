exports.up = function(knex, Promise) {
    return knex.schema.createTable('pedi_prod', table => {
        table.increments('id').primary()
        table.integer('pedidoId').unsigned().notNull()
        table.foreign('pedidoId').references('pedidos.id')
        table.integer('produtoId').unsigned().notNull()
        table.foreign('produtoId').references('produtos.id')
        table.boolean('cancelado')
            .notNull().defaultTo(false)
        table.string('detalhes')
        table.integer('quantidade').unsigned().notNull()
        table.decimal('preco', 6, 2)
        table.decimal('subT', 6, 2)
        table.string('cadasPor')
        table.timestamp('dataCadas')
            .defaultTo(knex.fn.now())
        table.string('atualPor')
        table.dateTime('dataAtual')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('pedi_prod').insert([
            { pedidoId: 1, produtoId: 1, detalhes: 'Vermelho', quantidade: 5 }
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pedi_prod')
};