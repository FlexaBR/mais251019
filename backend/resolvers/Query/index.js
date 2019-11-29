
const article = require('./article')
const category = require('./category')
const fatura = require('./fatura')
const pedido = require('./pedido')
const perfil = require('./perfil')
const usuario = require('./usuario')

 module.exports = {
   ...article,
   ...category,
   ...fatura,
   ...pedido,
   ...perfil,
   ...usuario,
 }