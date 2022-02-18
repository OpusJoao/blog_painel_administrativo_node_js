const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')
const categoriesController = require('./src/categories/CategoriesController')
const PORT = 8080; 

const Article = require('./src/articles/Article')
const Category = require('./src/categories/Category');
const { path } = require('express/lib/application');

//View engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'))

//connection
connection
    .authenticate()
    .then(()=>{
        console.log('Successfully connected on database')
    })
    .catch(error => {
        console.log(error)
    })

//body parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.render('index');
})

app.use('/', categoriesController)

app.listen(PORT,()=>{
    console.log(`Servidor is running on PORT ${PORT}`)
})