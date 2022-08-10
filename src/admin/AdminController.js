const express = require('express');
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views');
const Category = require('../categories/Category');
const Article = require('../articles/Article');
const router = express.Router();
const adminAuth = require('../../middlewares/adminAuth')

router.get(ROUTES.ADMIN.HOME, adminAuth,(req,res) => {
    Article.findAll({
        order: [
            ['id','DESC']
        ],
        include: [{model: Category}]
    })
    .then(articles =>{
        res.render(VIEW.ADMIN.HOME, {ROUTES:ROUTES,articles: articles})
    })
    .catch((reason)=>{
        console.error(`[ GET -> HomeController on ${ROUTES.ADMIN.HOME}] Erro ao listar Artigos`, reason)
        res.redirect(ROUTES.ADMIN.HOME)
    })
    
})

module.exports = router