const express = require('express');
const { send } = require('express/lib/response');
const Category = require('./Category');
const slugify = require('slugify')
const router = express.Router();
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views')

router.get(ROUTES.CATEGORY.CREATE,(req,res) => {
    res.render(VIEW.CATEGORY.CREATE)
})

router.get(ROUTES.CATEGORY.LIST,(req,res) => {
    Category.findAll()
    .then(categories =>{
        res.render(VIEW.CATEGORY.LIST, {ROUTES:ROUTES,categories: categories})
    })
    .catch((reason)=>{
        console.error('[ GET -> CategoriesController on /admin/category/] Erro ao listar categorias', reason)
        res.redirect('/')
    })
})

router.post(ROUTES.CATEGORY.SAVE,(req,res) => {
    let title = req.body.title
    if(title && title != undefined && title != ""){
        Category.create({
            title: title,
            slug: slugify(title),
        })
        .then(()=>{
            res.redirect(ROUTES.CATEGORY.LIST)
        })
        .catch((reason)=>{
            console.error(`[ POST -> CategoriesController on ${ROUTES.CATEGORY.SAVE}] Can't create a new category`, reason)
            res.redirect(ROUTES.CATEGORY.CREATE)
        })
    }else{
        res.redirect(ROUTES.CATEGORY.CREATE);
    }
})


router.post(ROUTES.CATEGORY.DELETE,(req,res) => {
    let {id} = req.body
    if(id && id != undefined && id != ""){
        Category.destroy({
            where:{
                id:id
            }
        })
        .then(()=>{
            res.redirect(ROUTES.CATEGORY.LIST)
        })
        .catch((reason)=>{
            console.error(`[ DELETE -> CategoriesController on ${ROUTES.CATEGORY.DELETE}] Can't create a new category`, reason)
            res.redirect(ROUTES.CATEGORY.LIST)
        })
    }else{
        res.redirect(ROUTES.CATEGORY.LIST);
    }
})

module.exports = router