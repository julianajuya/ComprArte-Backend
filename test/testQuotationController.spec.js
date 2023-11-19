const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('getAllProducts', () => {
    it('debería devolver una lista de productos', async () => {
        const productsMock = [
            // Datos simulados de productos
        ];

        const ProductModelMock = {
            findAll: sinon.stub().resolves(productsMock),
        };

        const productController = proxyquire('../controllers/productController', {
            '../database/indexDB.js': { Product: ProductModelMock }
        });

        const req = {};
        const res = {
            json: sinon.spy()
        };

        await productController.getAllProducts(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.deep.equal(productsMock);
    });
});


