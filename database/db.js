const {DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_DIALECT, DB_PORT} = require('../config.js'); 
const Sequelize = require('sequelize');

const db = new Sequelize(DB_NAME, DB_USER ,DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
})
module.exports = db
// const db = new Sequelize('process.env.DB_NAME','root','23937378D!',{
//     host:'127.0.0.1',
//     dialect:'mysql',
//     port:'3306',
// })
