exports.up = function(knex, Promise) {
    return knex.schema.createTable('perfis', table => {
        table.increments('id').primary()
        table.string('nomep').notNull().unique()
        table.timestamp('dataCriacao')
            .defaultTo(knex.fn.now())  
    }).then(function () {
        return knex('perfis').insert([
            { nomep: 'Admin' },
            { nomep: 'Geral' },
            { nomep: 'Diretor' },
            { nomep: 'Preposto' },
            { nomep: 'Cliente' }
        ])
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('perfis')
  };