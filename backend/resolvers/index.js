const Query = require('./Query')
const Mutation = require('./Mutation')

const Category = require('./Type/Category')
const Pedido = require('./Type/Pedido')
const Perfil = require('./Type/Perfil')
const Usuario = require('./Type/Usuario')


module.exports = {
    Query,
    Mutation,
    Category,
    Pedido,
    Perfil,
    Usuario
}