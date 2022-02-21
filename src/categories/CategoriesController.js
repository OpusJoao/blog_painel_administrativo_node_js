const express = require('express');
const Category = require('./Category');
const slugify = require('slugify')
const router = express.Router();
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views');

router.get(ROUTES.CATEGORY.CREATE,(req,res) => {
    res.render(VIEW.CATEGORY.CREATE, {ROUTES: ROUTES})
})

router.get(ROUTES.CATEGORY.LIST,(req,res) => {
    Category.findAll()
    .then(categories =>{
        res.render(VIEW.CATEGORY.LIST, {ROUTES:ROUTES,categories: categories})
    })
    .catch((reason)=>{
        console.error(`[ GET -> CategoriesController on ${ROUTES.CATEGORY.LIST}] Erro ao listar categorias`, reason)
        res.redirect('/')
    })
})

router.get(ROUTES.CATEGORY.EDIT.GET,(req,res) => {
    let { id } = req.params

    if(isNaN(id)){
        res.redirect(ROUTES.CATEGORY.LIST)
    }

    Category.findByPk(id).
    then(category => {
        if(category){
            res.render(VIEW.CATEGORY.EDIT, {ROUTES:ROUTES, category: category})
        }else{
            res.redirect(ROUTES.CATEGORY.LIST)
        }
    }).catch(reason => {
        console.error(`[ GET -> CategoriesController on ${ROUTES.CATEGORY.EDIT}] Categoria não encontrada ao editar`, reason)
        res.redirect(ROUTES.CATEGORY.LIST)
    })
})
// --------------------------------- POST ------------------------------
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
            console.error(`[ POST -> CategoriesController on ${ROUTES.CATEGORY.SAVE}] Não foi possivel criar uma nova categoria`, reason)
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
            console.error(`[ POST -> CategoriesController on ${ROUTES.CATEGORY.DELETE}] Não foi possivel deletar categoria`, reason)
            res.render(VIEW.CATEGORY.LIST, {error: {title:'Erro ao deletar', body: 'Não foi possivel deletar categoria'}});

        })
    }else{
        console.error(`[ POST -> CategoriesController on ${ROUTES.CATEGORY.DELETE}] ID de categoria inválido`)
        res.render(VIEW.CATEGORY.LIST, {error: {title:'Erro ao deletar', body: 'ID de categoria inválido'}});
    }
})


router.post(ROUTES.CATEGORY.EDIT.SAVE,(req,res) => {
    let {id,title} = req.body
    if(id && id != undefined && id != ""){
        Category.update(
            {
                title: title,
                slug: slugify(title),
            },{
            where:{
                id:id
            }
        })
        .then(()=>{
            res.redirect(ROUTES.CATEGORY.LIST)
        })
        .catch((reason)=>{
            console.error(`[ POST -> CategoriesController on ${ROUTES.CATEGORY.EDIT.SAVE}] Não foi possivel editar categoria`, reason)
            res.render(VIEW.CATEGORY.LIST, {error: {title:'Erro ao editar', body: 'Não foi possivel editar categoria'}});

        })
    }else{
        console.error(`[ POST -> CategoriesController on ${ROUTES.CATEGORY.EDIT.SAVE}] ID de categoria inválido`)
        res.redirect(ROUTES.CATEGORY.LIST)
    }
})

module.exports = router