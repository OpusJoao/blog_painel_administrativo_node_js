const ROUTES = {
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
    HOME : "/"
}

module.exports = ROUTES