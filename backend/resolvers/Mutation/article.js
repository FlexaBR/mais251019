const db = require('../../config/db')
const { article: obterArticle } = require('../Query/article')

module.exports = {
    async novoArticle(_, { dados }, ctx) {
        
        try {
            const [ id ] = await db('articles')
                .insert(dados)
            return db('articles')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirArticle(_, args, ctx) {
        
        try {
            const article = await obterArticle(_, args)
            if(article) {
                const { id } = article
                await db('articles')
                    .where({ id }).delete()
            }
            return article
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarArticle(_, { filtro, dados }, ctx) {
        
        try {
            const article = await obterArticle(_, { filtro })
            if(article) {
                const { id } = article
                await db('articles')
                    .where({ id })
                    .update(dados)
            }
            return { ...article, ...dados }
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}