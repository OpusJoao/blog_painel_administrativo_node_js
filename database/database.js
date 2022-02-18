const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress','root','root',{
    host: 'mysql',
    dialect: 'mysql',
    port: 3306
})

module.exports = connection 
