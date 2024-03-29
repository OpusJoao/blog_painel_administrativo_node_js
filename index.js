const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')
const categoriesController = require('./src/categories/CategoriesController')
const articlesController = require('./src/articles/ArticlesController')
const homeController = require('./src/home/HomeController')
const adminController = require('./src/admin/AdminController')
const userController = require('./src/user/UserController')
const session = require('express-session')
const PORT = 8080; 

//View engine
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 30000
    }
}))

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


app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', homeController)
app.use('/', adminController)
app.use('/', userController)

app.listen(PORT,()=>{
    console.log(`Servidor is running on PORT ${PORT}`)
})