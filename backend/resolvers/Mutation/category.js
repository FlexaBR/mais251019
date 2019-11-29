const db = require('../../config/db')
const { category: obterCategory } = require('../Query/category')

module.exports = {
    async novoCategory(_, { dados }, ctx) {
       
        try {
            const [ id ] = await db('categories')
                .insert(dados)
            return db('categories')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirCategory(_, args, ctx) {

        try {
            const category = await obterCategory(_, args)
            if(category) {
                const { id } = category
                await db('categories')
                    .where({ id }).delete()
            }
            return category
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarCategory(_, { filtro, dados }, ctx) {

        try {
            const category = await obterCategory(_, { filtro })
            if(category) {
                const { id } = category
                await db('categories')
                    .where({ id })
                    .update(dados)
            }
            return { ...category, ...dados }
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}