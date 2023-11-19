const {Product, Category} = require("../database/indexDB.js")
const { Op } = require("sequelize")
const { fileUrl } = require("./autenticationDrive.js")

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{model:Category, as: 'categoryAssociated'}],
      order: [['id_category', 'DESC']]
    }
      );
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        id_product: req.params.id,
      },
    });
    res.json(product[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getProductByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        id_category: req.params.id_category,
      },
    });
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.searchProduct = async (req, res ) => {
    try {
        const foundProducts = await Product.findAll({
          include:[{model:Category, as: 'categoryAssociated'}],
            where:{
                [Op.or]: [
                    {name_product: {[Op.like]: `%${req.body.stringToSearch}%`}},
                    {description_product: {[Op.like]: `%${req.body.stringToSearch}%`}}
                ]
            }
        })
        res.json(foundProducts)
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.createProduct = async (req, res) => {
  const file = await fileUrl(req);
  try {
    if (file) {
      console.log("IMAGEN QUE LLEGA", req)
      if(req.body.product_picture !== ''){
        req.body.product_picture = file;
      }else{
        req.body.product_picture = 'https://drive.google.com/uc?id=1hIWa3QsBVlAeAzKO9rcYKi_z_BDJ812I&export=download'
      }
      await Product.create(req.body);
      res.json({ message: "Producto creado con éxito" });

    } else {
      res.json({ message: "El archivo no está disponible" });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  if(req.body.product_picture !== ''){
    const file = await fileUrl(req);
    req.body.product_picture = file;
  }else{
    delete req.body.product_picture
  }
  try {
    await Product.update(req.body, {
      where: { id_product: req.params.id },
    });
    res.json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando producto', error: error.message });
  }
};

exports.changeStateProduct = async (req, res) => {
  try {
    const { status_product } = req.body;
    if (status_product !== undefined) {
      // Actualiza solo el estado del producto
      await Product.update(
        { status_product },
        {
          where: { id_product: req.params.id },
        }
      );
      res.json({ message: "Estado del producto actualizado con éxito" });
    } else {
      res.status(400).json({ message: "El campo 'status_product' es requerido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Metodo que elimina un producto de la base de datos
exports.deleteProduct = async (req, res) => {
  try {
      await Product.destroy({
          where: {id_product: req.params.id}
      })
      res.json({"message": "Producto eliminado con éxito"});
  } catch (error) {
      res.json({ message: error.message });
  }
}