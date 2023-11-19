const express = require("express");
const {
  changeStateProduct,
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  searchProduct,
  deleteProduct,
  getProductByCategory
} = require("../controllers/ProductController.js");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  logIn,
} = require("../controllers/userController");
const {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  changeStateClient,
  getClientByDocument,
} = require("../controllers/clientController.js");
const { getGoogleToken } = require("../controllers/autenticationDrive");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} = require("../controllers/categoriesController");
const {
  createQuote,
  getAllQuotes,
  printQuote,
  sendEmailQuote,
} = require("../controllers/quotationController.js");
const {
  createWorkshop,
  getAllWorkshops,
  getWorkshopById,
  updateWorkshopById,
  deleteWorkshopById,
} = require("../controllers/workshopController.js");

const router = express.Router();

// Ruta Token Google
router.get("/auth/googleapi", getGoogleToken);

//Ruta Login
router.post("/login", logIn);

// Rutas Usuarios
router.get("/userAll", getAllUsers);
router.get("/user/:email", getUser);
router.post("/userCreate", createUser);
router.put("/user/:email", updateUser);
router.patch("/:email/password", updateUserPassword);
router.delete("/delete/:email", deleteUser);

//Rutas Productos
router.get("/product", getAllProducts);
router.get("/product/:id", getProduct);
router.get('/product/category/:id_category', getProductByCategory)
router.post("/createProduct", createProduct);
router.put("/update/:id", updateProduct);
router.patch("/state/:id", changeStateProduct);
router.post("/searchProducts", searchProduct);
router.delete("/delete-product/:id", deleteProduct);

// Rutas Clientes
router.get("/cients", getAllClients);
router.get("/clients/:id", getClient);
router.post("/clients/search", getClientByDocument);
router.post("/clients/new-client", createClient);
router.put("/clients/update/:id", updateClient);
router.patch("/clients/update-state/:id", changeStateClient);

// Rutas Categorias
router.get("/categoriesAll", getAllCategories);
router.get("/categories/:id", getCategory);
router.post("/categories/new-categories", createCategory);
router.put("/categories/update/:id", updateCategory);
router.delete("/delete-categories/:id", deleteCategory);

// Rutas Cotizaciones
router.get("/quotesAll", getAllQuotes);
router.post("/quotes/print", printQuote);
router.post("/quotes/sendEmail", sendEmailQuote);
router.post("/quotes/newQuote", createQuote);

//Rutas Talleres
router.post("/createWorkshop", createWorkshop);
router.get("/AllWorkshops", getAllWorkshops);
router.get("/WorkshopById/:id", getWorkshopById);
router.put("/updateWorkshop/:id", updateWorkshopById);
router.delete("/deleteWorkshop/:id", deleteWorkshopById);

module.exports = router;
