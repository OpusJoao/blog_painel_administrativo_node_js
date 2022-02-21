const express = require('express');
const User = require('./User');
const router = express.Router();
const ROUTES = require('../../config/routes')
const VIEW = require('../../config/views');

router.get(ROUTES.USER.LIST,(req,res) => {
    User.findAll()
    .then(users =>{
        res.render(VIEW.USER.LIST, {ROUTES: ROUTES, users: users})
    })
    .catch((reason)=>{
        console.error(`[ GET -> UserController on ${ROUTES.USER.LIST}] Erro ao listar usuários`, reason)
        res.redirect('/')
    })
})

router.get(ROUTES.USER.CREATE,(req,res) => {
    res.render(VIEW.USER.CREATE, {ROUTES: ROUTES})
})


module.exports = router;