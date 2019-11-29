const db = require('../../config/db')

module.exports = {
    
    articles() {
        return db('articles')
    },
    article(_, { filtro }) {
        if(!filtro) return null
        const { id } = filtro
        if(id) {
            return db('articles')
                .where({ id })
                .first()
        } else {
            return null
        }
    }
}