const express = require('express');
const User = require('./User');
const router = express.Router();
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views')
const bcrypt = require('bcryptjs')

router.get(ROUTES.USER.LIST,(req,res) => {
    User.findAll()
    .then(users =>{
        res.render(VIEW.USER.LIST, {ROUTES: ROUTES, users: users})
    })
    .catch((reason)=>{
        console.error(`[ GET -> UserController on ${ROUTES.USER.LIST}] Erro ao listar usuários`, reason)
        res.redirect(ROUTES.HOME.HOME)
    })
})

router.get(ROUTES.USER.CREATE,(req,res) => {
    res.render(VIEW.USER.CREATE, {ROUTES: ROUTES})
})

router.get(ROUTES.USER.LOGIN,(req,res)=>{
    res.render(VIEW.USER.LOGIN, {ROUTES:ROUTES})
})

router.post(ROUTES.USER.LOGIN,(req,res)=>{
    const {email, password} = req.params

    User.findOne({
        email: email
    }).then((user)=>{

    }).catch((reason)=>{

    })
})


router.post(ROUTES.USER.SAVE,(req,res) => {
    const {email, password} = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    User.findOne({
        email:email
    }).then((user)=>{
        if(!user){
            User.create({
                email:email,
                password:hash
            }).then(()=>{
                res.redirect(ROUTES.HOME.HOME)
            })
            .catch((reason)=>{
                console.error(`[ POST -> UserController on ${ROUTES.USER.SAVE}] Erro ao cadastrar usuários`, {payload: {email: email, password: hash},reason: reason})
                res.redirect(ROUTES.HOME.HOME)
            })
        }else{
            console.error(`[ POST -> UserController on ${ROUTES.USER.SAVE}] Erro ao cadastrar usuários`, {payload: {email: email, password: hash}, reason: 'usuario já existe'})
            res.render(VIEW.USER.CREATE, {ROUTES: ROUTES, error: {title: 'Erro ao cadastrar',body: 'Usuário já existe.'}})
        }
    })
})

module.exports = router;