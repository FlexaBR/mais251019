const article = require('./article')
const category = require('./category')

const perfil = require('./perfil')
const user = require('./user')

 module.exports = {
    ...article,
    ...category,
    ...perfil,
    ...user    
 }