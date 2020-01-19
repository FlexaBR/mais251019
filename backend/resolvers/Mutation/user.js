const bcrypt = require('bcryptjs')
const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { user: obterUser } = require('../Query/user')

const mutations = {
    
    registrarUser(_, { dados }) {
        return mutations.novoUser(_, {
            dados: {
                name: dados.name,
                atividade: dados.atividade,
                email: dados.email,
                password: dados.password,
            }
        })
    },
    async novoUser(_, { dados }, ) {
        try {
            const idsPerfis = []
            
            if(!dados.perfis || !dados.perfis.length) {
                dados.perfis = [{
                    nomep: 'Geral'
                }]
            }

            for(let filtro of dados.perfis) {
                const perfil = await obterPerfil(_, {
                    filtro
                })
                if(perfil) idsPerfis.push(perfil.id)
            }

            // criptografar a senha
            const salt = bcrypt.genSaltSync()
            dados.password = bcrypt.hashSync(dados.password, salt)

            delete dados.perfis
            const [ id ] = await db('users')
                .insert(dados)

            for(let perfilId of idsPerfis) {
                await db('users_perfis')
                    .insert({ perfilId, userId: id })
            }

            return db('users')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirUser(_, args, ctx) {
        ctx && ctx.validarAdmin()
        try {
            const user = await obterUser(_, args)
            if(user) {
                const { id } = user
                await db('users_perfis')
                    .where({ userId: id }).delete()
                await db('users')
                    .where({ id }).delete()
            }
            return user
        } catch(e) {
            throw new Error(e.sqlMessage)
        }

    },
    async alterarUser(_, { filtro, dados }, ctx) {
        ctx && ctx.validarUserFiltro(filtro)
        try {
            const user = await obterUser(_, { filtro })
            if(user) {
                const { id } = user
                // so permite alterar perfil se admin
                if(ctx.admin && dados.perfis) {
                    await db('users_perfis')
                        .where({ userId: id }).delete()

                    for(let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, {
                            filtro
                        })
                        
                        if(perfil) {
                            await db('users_perfis')
                                .insert({
                                    perfilId: perfil.id,
                                    userId: id
                                })
                        }
                    }
                }

                if(dados.password) {
                    // criptografar a senha
                    const salt = bcrypt.genSaltSync()
                    dados.password = bcrypt.hashSync(dados.password, salt)
                }

                delete dados.perfis
                await db('users')
                    .where({ id })
                    .update(dados)
            }
            return !user ? null : { ...user, ...dados }
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = mutations