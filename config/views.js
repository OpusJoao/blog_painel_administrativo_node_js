const VIEW = {
    HOME : 'index',
    ADMIN:{
        HOME: 'admin/index'
    },
    USER:{
        LIST: 'admin/users/index',
        CREATE: 'admin/users/new',
        EDIT: 'admin/users/edit',
        LOGIN: 'admin/users/login'
    },
    CATEGORY : {
        CREATE: 'admin/categories/new',
        LIST: 'admin/categories/index',
        EDIT: 'admin/categories/edit'
    },
    ARTICLE : {
        CREATE: 'admin/articles/new',
        LIST: 'admin/articles/index',
        EDIT: 'admin/articles/edit',
        VIEW: 'article'
    },
}

module.exports = VIEW