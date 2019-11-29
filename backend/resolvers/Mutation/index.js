const article = require('./article')
const category = require('./category')

const perfil = require('./perfil')
const usuario = require('./usuario')

 module.exports = {
    ...article,
    ...category,
    ...perfil,
    ...usuario    
 }