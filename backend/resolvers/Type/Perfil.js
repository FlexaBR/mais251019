const db = require('../../config/db')

module.exports = {
    users(perfil) {
        return db('users')
            .join(
                'users_perfis',
                'users.id',
                'users_perfis.userId'
            )
            .where({ perfilId: perfil.id })
    }
}