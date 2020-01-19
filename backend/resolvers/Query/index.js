
const article = require('./article')
const category = require('./category')
const fatura = require('./fatura')
const pedido = require('./pedido')
const perfil = require('./perfil')
const user = require('./user')

 module.exports = {
   ...article,
   ...category,
   ...fatura,
   ...pedido,
   ...perfil,
   ...user,
 }