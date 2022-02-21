const express = require('express');
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views');
const Category = require('../categories/Category');
const Article = require('../articles/Article');
const slugify = require('slugify')
const router = express.Router();

router.get(ROUTES.ARTICLE.LIST,(req,res) => {
    Article.findAll({
        include: [{model: Category}]
    })
    .then(articles =>{
        res.render(VIEW.ARTICLE.LIST, {ROUTES:ROUTES,articles: articles})
    })
    .catch((reason)=>{
        console.error(`[ GET -> ArticlesController on ${ROUTES.ARTICLE.LIST}] Erro ao listar Artigos`, reason)
        res.redirect('/')
    })
    
})

router.get(ROUTES.ARTICLE.CREATE,(req,res) => {
    Category.findAll()
    .then((categories)=>{
        res.render(VIEW.ARTICLE.CREATE, {ROUTES: ROUTES, categories: categories})
    })
    .catch(reason =>{
        console.error(`[ GET -> ArticlesController on ${ROUTES.ARTICLE.CREATE}] Erro ao buscar categorias`, reason)
        res.redirect('/')
    })
})

router.get(ROUTES.ARTICLE.EDIT.GET,(req,res) => {
    let { id } = req.params

    if(isNaN(id)){
        res.redirect(ROUTES.ARTICLE.LIST)
    }

    Article.findByPk(id).
    then(article => {
        if(article){
            Category.findAll()
            .then((categories)=>{
                res.render(VIEW.ARTICLE.EDIT, {ROUTES:ROUTES, article: article, categories:categories})
            })
            .catch(reason =>{
                console.error(`[ GET -> ArticlesController on ${ROUTES.ARTICLE.EDIT.GET}] Erro ao buscar categorias`, reason)
                res.redirect(ROUTES.ARTICLE.LIST)
            })
        }else{
            res.redirect(ROUTES.ARTICLE.LIST)
        }
    }).catch(reason => {
        console.error(`[ GET -> ArticlesController on ${ROUTES.ARTICLE.EDIT.GET}] ARtigo não encontrado ao editar`, reason)
        res.redirect(ROUTES.ARTICLE.LIST)
    })
})

router.post(ROUTES.ARTICLE.SAVE,(req,res) => {
    const {title, text:body, category:categoryId} = req.body
    
    if(title && title != undefined && title != ""){
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: categoryId
        })
        .then(()=>{
            res.redirect(ROUTES.ARTICLE.LIST)
        })
        .catch((reason)=>{
            console.error(`[ POST -> ArticlesController on ${ROUTES.ARTICLE.SAVE}] Não foi possivel criar um novo artigo`, reason)
            res.redirect(ROUTES.ARTICLE.CREATE)
        })
    }else{
        res.redirect(ROUTES.ARTICLE.CREATE);
    }
})

router.post(ROUTES.ARTICLE.DELETE,(req,res) => {
    let {id} = req.body
    if(id && id != undefined && id != ""){
        Article.destroy({
            where:{
                id:id
            }
        })
        .then(()=>{
            res.redirect(ROUTES.ARTICLE.LIST)
        })
        .catch((reason)=>{
            console.error(`[ POST -> ArticlesController on ${ROUTES.ARTICLE.DELETE}] Não foi possivel deletar artigo`, reason)
            res.render(VIEW.ARTICLE.LIST, {error: {title:'Erro ao deletar', body: 'Não foi possivel deletar artigo'}});

        })
    }else{
        console.error(`[ POST -> ArticlesController on ${ROUTES.ARTICLE.DELETE}] ID de artigo inválido`)
        res.render(VIEW.ARTICLE.LIST, {error: {title:'Erro ao deletar', body: 'ID de artigo inválido'}});
    }
})

router.post(ROUTES.ARTICLE.EDIT.SAVE,(req,res) => {
    let {id,title, text:body, category:categoryId} = req.body
    if(id && id != undefined && id != ""){
        Article.update(
            {
                title: title,
                slug: slugify(title),
                body:body,
                categoryId: categoryId
            },{
            where:{
                id:id
            }
        })
        .then(()=>{
            res.redirect(ROUTES.ARTICLE.LIST)
        })
        .catch((reason)=>{
            console.error(`[ POST -> ArticlesController on ${ROUTES.ARTICLE.EDIT.SAVE}] Não foi possivel editar artigo`, reason)
            res.render(VIEW.ARTICLE.LIST, {error: {title:'Erro ao editar', body: 'Não foi possivel editar artigo'}});

        })
    }else{
        console.error(`[ POST -> CategoriesController on ${ROUTES.ARTICLE.EDIT.SAVE}] ID de artigo inválido`)
        res.redirect(ROUTES.ARTICLE.LIST);
    }
})

module.exports = router