const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();

router.get('/categories',(req,res) => {
    res.send('categories')
})

router.get('/admin/categories',(req,res) => {
    res.send('admin categories')
})

router.post('/categories',(req,res) => {
    res.send('create categories')
})


module.exports = router