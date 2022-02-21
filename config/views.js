const VIEW = {
    HOME : "index",
    ADMIN:{
        HOME: 'admin/index'
    },
    CATEGORY : {
        CREATE: "admin/categories/new",
        LIST: "admin/categories/index",
        EDIT: "admin/categories/edit"
    },
    ARTICLE : {
        CREATE: "admin/articles/new",
        LIST: "admin/articles/index",
        EDIT: "admin/articles/edit",
        VIEW: "article"
    },
}

module.exports = VIEW