const ClientModel = require("../models/clientModel.js")


exports.getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.findAll()
        res.json(clients)
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.getClient = async (req, res) => {
    try {
        const client = await ClientModel.findAll({
            where: {
                id_cliente: req.params.id
            }
        })
        res.json(client[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.getClientByDocument = async (req, res) => {
    try {
        const client = await ClientModel.findAll({
            where: {
                numero_documento: req.body.numero_documento,
                tipo_documento: req.body.tipo_documento
            }
        })
        console.log("CLIENTE OBTENIDO",client)
        if(client.length !== 0)
            res.status(200).json(client[0])
        else
        res.status(204).json({message: "El cliente no se encuentra registrado aún." })
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.createClient = async (req, res) =>{
    try {
        const newClient = await ClientModel.create(req.body)
        res.json({"message": "Cliente registrado con éxito", "id_client": newClient.id})
    } catch (error) {
        res.json({ message: error.message })    
    }
}

exports.updateClient = async (req, res)=>{
    try {
        await ClientModel.update(req.body,{
            where: {id_cliente: req.params.id}
        })
        res.json({"message": "Cliente actualizado con éxito"})
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.changeStateClient = async (req, res)=>{
    try {
        await ClientModel.update(req.body,{
            where: {id_cliente: req.params.id}
        })
        res.json({"message": "Estado del cliente actualizado con éxito"})
    } catch (error) {
        res.json({ message: error.message })
    }
}