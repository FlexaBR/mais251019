const db = require('../../config/db')

module.exports = {
    articles(category) {
        return db('articles')
            .join(
                'categories',
                'categories.id',
                'articles.category_id'
            )
            .where({ category_id: category.id })
    }
}