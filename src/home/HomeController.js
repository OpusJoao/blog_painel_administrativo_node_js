const express = require('express');
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views');
const APP = require('../../config/app');
const Category = require('../categories/Category');
const Article = require('../articles/Article');
const router = express.Router();

router.get(ROUTES.HOME.HOME,(req,res) => {
    const next_page = 1;
    const current_page = 0;
    const can_get_next_page = true;
    Article.findAll({
        order: [
            ['id','DESC']
        ],
        limit: APP.HOME_LIMIT_ITENS,
        include: [{model: Category}]
    })
    .then(articles =>{
        Category.findAll().then((categories)=>{
            res.render(
                VIEW.HOME, 
                {
                    ROUTES:ROUTES,
                    articles: articles, 
                    categories: categories,
                    page:{
                        current_page: current_page,
                        can_get_next_page: can_get_next_page,
                        next_page: next_page
                    }
                })
        }).catch(reason=>{
            console.error(`[ GET -> HomeController on ${ROUTES.HOME.HOME}] Erro ao listar Categorias`, reason)
            res.redirect(ROUTES.HOME.ERROR)    
        })
    })
    .catch((reason)=>{
        console.error(`[ GET -> HomeController on ${ROUTES.HOME.HOME}] Erro ao listar Artigos`, reason)
        res.redirect(ROUTES.HOME.HOME)
    })
    
})

router.get(ROUTES.HOME.PAGE,(req,res) => {
    const  {page} = req.params
    const next_page = page + 1;
    const previous_page = page - 1; 
    let offset= 0;
    let limit = APP.HOME_LIMIT_ITENS;
    offset = page * limit;
    
    Article.findAndCountAll({
        order: [
            ['id','DESC']
        ],
        offset : offset,
        limit: limit,
        include: [{model: Category}]
    })
    .then(articles =>{
        let can_get_previous_page = (offset >= 4)
        let can_get_next_page = (offset + 4 <= articles.count)
        Category.findAll().then((categories)=>{
            res.render(
                VIEW.HOME,
                {
                    ROUTES:ROUTES,
                    articles: articles,
                    categories: categories,
                    page:{
                        current_page:page,
                        can_get_previous_page: can_get_previous_page, 
                        can_get_next_page: can_get_next_page,
                        previous_page: previous_page,
                        next_page: next_page
                    }
                })
        }).catch(reason=>{
            console.error(`[ GET -> HomeController on ${ROUTES.HOME.HOME}] Erro ao listar Categorias`, reason)
            res.redirect(ROUTES.HOME.ERROR)    
        })
    })
    .catch((reason)=>{
        console.error(`[ GET -> HomeController on ${ROUTES.HOME.HOME}] Erro ao listar Artigos`, reason)
        res.redirect(ROUTES.HOME.HOME)
    })
    
})


router.get(ROUTES.HOME.ARTICLE,(req,res) => {
    let { article_id, article_slug } = req.params

    Article.findOne({
        where: {
            slug: article_slug,
            id: article_id
        }
    })
    .then(article => {
        if(article){
            Category.findAll().then((categories)=>{
                res.render(VIEW.ARTICLE.VIEW, {ROUTES:ROUTES, article: article, categories:categories})
            }).catch(reason=>{
                console.error(`[ GET -> HomeController on ${ROUTES.HOME.ARTICLE}] Erro ao listar Categorias`, reason)
                res.redirect(ROUTES.HOME.ERROR)    
            })
            
        }else{
            console.error(`[ GET -> HomeController on ${ROUTES.HOME.ARTICLE}] Artigo não encontrado ou inválido`, reason)
            res.redirect(ROUTES.HOME.HOME)
        }
    }).catch(reason => {
        console.error(`[ GET -> HomeController on ${ROUTES.HOME.ARTICLE}] Artigo não encontrado`, reason)
        res.redirect(ROUTES.HOME.HOME)
    })
})

router.get(ROUTES.HOME.CATEGORY,(req,res) => {
    let { category_id, category_slug } = req.params

    Category.findOne({
        where: {
            slug: category_slug,
            id: category_id
        },
        include: [{model:Article}]
    })
    .then(category => {
        if(category){
            Category.findAll().then((categories)=>{
                res.render(VIEW.HOME, {ROUTES:ROUTES, articles: category.articles, categories:categories, category: category})
            }).catch(reason=>{
                console.error(`[ GET -> HomeController on ${ROUTES.HOME.CATEGORY}] Erro ao listar Categorias`, reason)
                res.redirect(ROUTES.HOME.ERROR)    
            })
            
        }else{
            console.error(`[ GET -> HomeController on ${ROUTES.HOME.ARTICLE}] Artigo não encontrado ou inválido`, reason)
            res.redirect(ROUTES.HOME.HOME)
        }
    }).catch(reason => {
        console.error(`[ GET -> HomeController on ${ROUTES.HOME.ARTICLE}] Artigo não encontrado`, reason)
        res.redirect(ROUTES.HOME.HOME)
    })
})

module.exports = router