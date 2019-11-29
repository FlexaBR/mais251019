const db = require('../../config/db')

module.exports = {
    
    categories() {
        return db('categories')
    },
    category(_, { filtro }) {
        if(!filtro) return null
        const { id } = filtro
        if(id) {
            return db('categories')
                .where({ id })
                .first()
        } else {
            return null
        }
    }
}