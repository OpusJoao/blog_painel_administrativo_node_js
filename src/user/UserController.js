const express = require('express');
const User = require('./User');
const router = express.Router();
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views')
const bcrypt = require('bcryptjs')
const adminAuth = require('../../middlewares/adminAuth')


router.get(ROUTES.USER.LIST,adminAuth,(req,res) => {
    User.findAll()
    .then(users =>{
        res.render(VIEW.USER.LIST, {ROUTES: ROUTES, users: users})
    })
    .catch((reason)=>{
        console.error(`[ GET -> UserController on ${ROUTES.USER.LIST}] Erro ao listar usuários`, reason)
        res.redirect(ROUTES.HOME.HOME)
    })
})

router.get(ROUTES.USER.CREATE,adminAuth,(req,res) => {
    res.render(VIEW.USER.CREATE, {ROUTES: ROUTES})
})

router.get(ROUTES.USER.LOGIN,(req,res)=>{
    res.render(VIEW.USER.LOGIN, {ROUTES:ROUTES})
})

router.post(ROUTES.USER.LOGIN, async (req,res)=>{
    const {email, password} = req.body
    
    try{
        const user = await User.findOne({
            email: email
        })
        const isValidUser = user && bcrypt.compareSync(password, user.password)
        
        if(isValidUser){
            req.session.user = {
                id: user.id,
                email: user.email
            }
            res.redirect(ROUTES.ADMIN.HOME)
            return
        }

        res.redirect(ROUTES.HOME.HOME)
        return
    }catch(reason){
        console.error(`[ POST -> UserController on ${ROUTES.USER.LOGIN}] Erro ao fazer login`, {payload: {email: email},reason: reason})
        res.redirect(ROUTES.HOME.HOME)
        return
    }
})


router.post(ROUTES.USER.SAVE,adminAuth, (req,res) => {
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

router.get(ROUTES.USER.LOGOUT,(req,res)=>{
    req.session.user = undefined
    res.redirect(ROUTES.HOME.HOME)
})

module.exports = router;