const db = require("../database/db")
const { DataTypes } = require("sequelize")
const userModel = db.define('MY_USER', {
//Creacion del esquema de usuarios para la base de datos
    email_user: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
        field: "email_user"
	},
    user_name:{
        type: DataTypes.STRING,
		allowNull: false,		
        field: "user_name"
    },
    user_lastname:{
        type: DataTypes.STRING,
		allowNull: false,		
        field: "user_lastname"
    },    
    user_password:{
        type: DataTypes.STRING,
		allowNull: false,		
        field: "user_password"
    },
    user_rol:{
        type: DataTypes.STRING,
		allowNull: false,		
        field: "user_rol"
    }, 
    status_user:{
        type: DataTypes.STRING,
        allowNull: false,		
        field: "status_user"
    }
})

module.exports =  userModel
