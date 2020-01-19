const jwt = require('jwt-simple')
const { perfis: obterPerfis } = require('../Type/User')

module.exports = {
    async getUsuarioLogado(user) {
        const perfis = await obterPerfis(user)
        const agora = Math.floor(Date.now() / 1000)

        const userInfo = {
            id: user.id,
            name: user.name,
            atividade: user.atividade,
            email: user.email,
            ativo: user.ativo,
            perfis: perfis.map(p => p.nomep),
            iat: agora,
            exp: agora + (3 * 24 * 60 * 60)
        }
        
        return {
            ...userInfo,
            token: jwt.encode(userInfo,
                process.env.APP_AUTH_SECRET)
        }
    }
}