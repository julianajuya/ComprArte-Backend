import Products from '../models/productModel'
import Categories  from '../models/categoriesModel.js'
import Quotes  from '../models/quotationModel.js'
import Clients  from '../models/clientModel.js'
import AddedProducts  from '../models/addedProductsModel.js'

Products.belongsTo(Categories, {foreignKey: "id_category", as:'associated_category'});
Categories.hasMany(Products,{foreignKey: "id_category"});

Quotes.belongsTo(Clients, {foreignKey: "id_customer",as:'customer_data'})
Clients.hasMany(Quotes,{foreignKey: "id_customer"});

AddedProducts.belongsTo(Quotes, {foreignKey: "id_quotation"})
Quotes.hasMany(AddedProducts,{foreignKey: "id_quotation",sourceKey: 'id_quotation', as:'added_products'});

AddedProducts.belongsTo(Products, {foreignKey: "id_product"})
Products.hasMany(AddedProducts,{foreignKey: "id_product"});

export {
    Products, 
    Categories,
    Quotes,
    Clients,
    AddedProducts
}