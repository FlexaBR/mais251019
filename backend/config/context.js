const { authSecret } = require('../.env')

const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    // Em desenvolvimento
    // await require('./simularUsuarioLogado')(req)

    const auth = req.headers.authorization
    const token = auth && auth.substring(7)

    let user = null
    let admin = false
    let cliente = false
    let diretor = false
    let preposto = false

    if(token) {
        try {
            let conteudoToken = jwt.decode(token,
                authSecret)
            if(new Date(conteudoToken.exp * 1000) > new Date()) {
                user = conteudoToken
            }
        } catch(e) {
            // token inválido
        }
    }
    
    if(user && user.perfis) {
        admin = user.perfis.includes('Admin')
        cliente = user.perfis.includes('Cliente')
        diretor = user.perfis.includes('Diretor')
        preposto = user.perfis.includes('Preposto')
    }

    const err = new Error('Acesso negado!')

    return {
        user,
        admin,
        cliente,
        diretor,
        preposto,
        validarUser() {
            if(!user) throw err
        },
        validarAdmin() {
            if(!admin) throw err
        },
        validarCliente() {
            if(!cliente) throw err
        },
        validarDiretor() {
            if(!diretor) throw err
        },
        validarPreposto() {
            if(!preposto) throw err
        },
        validarUserFiltro(filtro) {
            if(admin) return
            if(!user) throw err
            if(!filtro) throw err

            const { id, email } = filtro
            if(!id && !email) throw err
            if(id && id !== user.id) throw err
            if(email && email !== user.email) throw err
        }
    }
}