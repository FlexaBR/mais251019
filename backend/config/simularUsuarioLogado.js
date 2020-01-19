const db = require('./db')
const { getUsuarioLogado } = require('../resolvers/comum/user')

const sql = `
    select
        u.*
    from
        users u,
        users_perfis up,
        perfis p
    where
        up.user_id = u.id and
        up.perfil_id = p.id and
        u.ativo = 1 and
        p.nomep = :nomePerfil
    limit 1
`

const getUser = async nomePerfil => {
    const res = await db.raw(sql, { nomePerfil })
    return res ? res[0][0] : null
}

module.exports = async req => {
    const user = await getUser('Admin')
    if(user) {
        const { token } = await getUsuarioLogado(user)
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}