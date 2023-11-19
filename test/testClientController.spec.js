const { expect } = require('chai');
const sinon = require('sinon');
const clientController = require('../controllers/clientController');
const ClientModel = require('../models/clientModel.js');

describe('Client Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all clients', async () => {
    const findAllStub = sinon.stub(ClientModel, 'findAll').resolves([
      { id_customer: 1, name_customer: 'John Doe' },
      { id_customer: 2, name_customer: 'Jane Smith' }
    ]);

    const req = {};
    const res = {
      json: sinon.spy()
    };

    await clientController.getAllClients(req, res);

    sinon.assert.calledOnce(findAllStub);
    expect(res.json.calledWith([
      { id_customer: 1, name_customer: 'John Doe' },
      { id_customer: 2, name_customer: 'Jane Smith' }
    ])).to.be.true;
  });

  it('should get client by ID', async () => {
    const findOneStub = sinon.stub(ClientModel, 'findAll').resolves([
      { id_customer: 1, name_customer: 'John Doe' }
    ]);

    const req = { params: { id: 1 } };
    const res = {
      json: sinon.spy()
    };

    await clientController.getClient(req, res);

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWith(findOneStub, {
      where: { id_customer: req.params.id }
    });

    expect(res.json.calledWith({ id_customer: 1, name_customer: 'John Doe' })).to.be.true;
  });

  // Escribe pruebas similares para las otras funciones del controlador.
});
