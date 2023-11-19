const { expect } = require('chai');
const sinon = require('sinon');
const AddedProductsModel = require('../models/addedProductsModel');
const {
  getAllHistory,
  getProductsByCotization,
  createClient,
  updateClient
} = require('../controllers/addedProductsController');

describe('Added Products Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all history', async () => {
    const findAllStub = sinon.stub(AddedProductsModel, 'findAll').resolves([]);
    const res = {
      json: sinon.spy()
    };

    await getAllHistory({}, res);

    expect(findAllStub.calledOnce).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith([])).to.be.true;
  });

  it('should get products by cotization', async () => {
    const findAllStub = sinon.stub(AddedProductsModel, 'findAll').resolves([]);
    const req = {
      params: { id: 1 }
    };
    const res = {
      json: sinon.spy()
    };

    await getProductsByCotization(req, res);

    expect(findAllStub.calledOnce).to.be.true;
    expect(findAllStub.calledWith({
      where: { id_quotation: req.params.id }
    })).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith([])).to.be.true;
  });

  it('should create a client', async () => {
    const createStub = sinon.stub(AddedProductsModel, 'create').resolves({});
    const req = {
      body: {}
    };
    const res = {
      json: sinon.spy()
    };

    await createClient(req, res);

    expect(createStub.calledOnce).to.be.true;
    expect(createStub.calledWith(req.body)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Cliente registrado con éxito' })).to.be.true;
  });

  it('should update a client', async () => {
    const updateStub = sinon.stub(AddedProductsModel, 'update').resolves({});
    const req = {
      params: { id: 1 },
      body: {}
    };
    const res = {
      json: sinon.spy()
    };

    await updateClient(req, res);

    expect(updateStub.calledOnce).to.be.true;
    expect(updateStub.calledWith(req.body, {
      where: { id: req.params.id }
    })).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Cliente actualizado con éxito' })).to.be.true;
  });
});

  

