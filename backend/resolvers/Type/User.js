const db = require('../../config/db')

module.exports = {
    perfis(user) {
        return db('perfis')
            .join(
                'users_perfis',
                'perfis.id',
                'users_perfis.perfilId'
            )
            .where({ userId: user.id })
    }
}