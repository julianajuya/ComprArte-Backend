const AddedProductsModel = require("../models/addedProductsModel")

exports.getAllHistory = async (req, res) => {
    try {
        const history = await AddedProductsModel.findAll()
        res.json(history)
    } catch (error) {
        res.json({"message": "Error al obtener historial"})
    }
}

exports.getProductsByCotization = async (req, res) => {
    try {
        const productsList = await AddedProductsModel.findAll({
            where: {
                id_quotation: req.params.id
            }
        })
        res.json(productsList)
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.createClient = async (req, res) =>{
    try {
        await AddedProductsModel.create(req.body)
        res.json({"message": "Cliente registrado con éxito"})
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.updateClient = async (req, res)=>{
    try {
        await AddedProductsModel.update(req.body,{
            where: {id: req.params.id}
        })
        res.json({"message": "Cliente actualizado con éxito"})
    } catch (error) {
        res.json({ message: error.message })
    }
}

