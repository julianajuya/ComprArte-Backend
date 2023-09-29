const db = require("../database/db")
const { DataTypes } = require("sequelize")
import ClientModel from "./clientModel.js";

const quotationModel = db.define('MARKET_RATES', {

    id_client: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_customer"
    },
    id_market_rates: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id_quote"
    },
    number_quote: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "number_quote"
    },
    date_quote: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "date_quote"
    },
    subtotal_quote: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "subtotal_quote"
    },
    total_quote: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "total_quote"
    },
    status_quote: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "status_quote"
    },
    email_user: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "email_user"
    }

})

module.exports =   quotationModel