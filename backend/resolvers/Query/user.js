const db = require('../../config/db')
const bcrypt = require('bcryptjs')
const { getUsuarioLogado } = require('../comum/user')

module.exports = {

    async login(_, { dados }) {
        const user = await db('users')
            .where({ email: dados.email })
            .first()
        if(!user) {
            throw new Error('Usuário inválido')
        }

        const saoIguais = bcrypt.compareSync(dados.password,
            user.password)
        if(!saoIguais) {
            throw new Error('Senha inválido')
        }
        
        const ehAtivo = user.ativo
        if(!ehAtivo) {
            throw new Error('Usuário inativo. Contate o administrador.')
        }

        return getUsuarioLogado(user)
    },

    users(parent, args, ctx) {
        return db('users')
    },
    user(_, { filtro }, ctx) {
        ctx && ctx.validarUserFiltro(filtro)
        
        if(!filtro) return null
        const { id, email } = filtro
        if(id) {
            return db('users')
                .where({ id })
                .first()
        } else if(email) {
            return db('users')
                .where({ email })
                .first()
        } else {
            return null
        }
    }
}