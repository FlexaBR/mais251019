const db = require('../../config/db')

module.exports = {
    perfis(parent, args, ) {
        return db('perfis')
    },
    perfil(_, { filtro }, ) {
        
        if(!filtro) return null
        const { id, nomep } = filtro
        if(id) {
            return db('perfis')
                .where({ id })
                .first()
        } else if(nomep) {
            return db('perfis')
                .where({ nomep })
                .first()
        } else {
            return null
        }
    }
}