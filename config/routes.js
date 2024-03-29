const ROUTES = {
    HOME : {
        HOME: "/",
        PAGE: "/page/:page",
        PAGE_WITHOUT_PARAMS: "/page",
        ARTICLE: "/article/:article_id/:article_slug",
        ARTICLE_WITHOUT_PARAMS: "/article",
        CATEGORY: "/category/:category_id/:category_slug",
        CATEGORY_WITHOUT_PARAMS: "/category",
        ERROR: "/error"
    },
    ADMIN : {
        HOME: "/admin",
    },
    USER : {
        LIST: '/admin/users/',
        SAVE: '/admin/user/',
        CREATE: '/admin/user/new',
        EDIT : {
            GET: "/admin/user/edit/:id",
            GET_WITHOUT_PARAM: "/admin/user/edit/",
            SAVE: "/admin/user/edit/:id"
        },
        LOGIN: '/login',
        LOGOUT: '/logout'
    },
    CATEGORY : {
        CREATE : "/admin/category/new",
        SAVE : "/admin/category/",
        LIST: "/admin/categories/",
        DELETE: "/admin/category/delete",
        EDIT : {
            GET: "/admin/category/edit/:id",
            GET_WITHOUT_PARAM: "/admin/category/edit/",
            SAVE: "/admin/category/edit/:id"
        }
    },
    ARTICLE: {
        CREATE : "/admin/article/new",
        SAVE : "/admin/article/",
        LIST: "/admin/articles/",
        LIST_PAGE: "/admin/articles/page/:page",
        LIST_PAGE_WITHOUT_PARAMS: "/admin/articles/page/",
        DELETE: "/admin/article/delete",
        EDIT : {
            GET: "/admin/article/edit/:id",
            GET_WITHOUT_PARAM: "/admin/article/edit/",
            SAVE: "/admin/article/edit/:id"
        }
    },
}

module.exports = ROUTES