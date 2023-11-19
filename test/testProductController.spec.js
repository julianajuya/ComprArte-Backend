const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { Product, Category } = require("../database/indexDB.js");

const productMock = {
    findAll: sinon.stub(),
    create: sinon.stub(),
    update: sinon.stub(),
    destroy: sinon.stub(),
  };
  
  const categoryMock = {
    findAll: sinon.stub(),
  };
  
  const fileUrlMock = sinon.stub();
  describe('Products Controller', () => {
    let productsController;
  
    beforeEach(() => {
      productsController = proxyquire('../controllers/productController', {
        '../database/indexDB.js': {
          Product: productMock,
          Category: categoryMock,
        },
        '../controllers/autenticationDrive.js': {
          fileUrl: fileUrlMock,
        },
      });
    });
  
    describe('getAllProducts', () => {
      it('debería devolver una lista de productos', async () => {
        const mockProducts = [{ id_product: 1, name_product: 'Producto 1' }];
        productMock.findAll.resolves(mockProducts);
  
        const req = {};
        const res = {
          json: sinon.stub(),
        };
  
        await productsController.getAllProducts(req, res);
  
        expect(productMock.findAll.calledOnce).to.be.true;
        expect(res.json.calledWith(mockProducts)).to.be.true;
      });
    });
  
  });
    