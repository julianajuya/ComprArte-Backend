const db = require("../database/db")
const { DataTypes } = require("sequelize")

const productModel = db.define('PRODUCT', {

    id_product: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
        field: "id_product"
	},
    id_categorie:{
        type: DataTypes.INTEGER,
		allowNull: true,			
        field: "id_category"
    },
    name_product:{
        type: DataTypes.STRING,
		allowNull: false,		
        field: "name_product"
    },
    description_product :{
        type: DataTypes.STRING,
		allowNull: true,		
        field: "description_product"
    },
    quantity:{
        type: DataTypes.INTEGER,
		allowNull: false,		
        field: "quantity"
    },
    product_reference:{
        type: DataTypes.STRING,
		allowNull: false,		
        field: "product_reference"
    },
    unit_price:{
        type: DataTypes.FLOAT,
		allowNull: false,		
        field: "unit_price"  
    },
    product_picture:{
        type: DataTypes.STRING,
		allowNull: true,		
        field: "product_picture"
    },
    product_state:{
        type: DataTypes.CHAR,
		allowNull: false,		
        field: "status_product"
    }
    
})

module.exports =  productModel