const { expect } = require('chai');
const sinon = require('sinon');
const categoriesController = require('../controllers/categoriesController');
const CategoriesModel = require('../models/categoriesModel');

describe('Categories Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all categories', async () => {
    const findAllStub = sinon.stub(CategoriesModel, 'findAll').resolves([{
      id_category: 1,
      name_category: 'Category 1'
    }]);

    const req = {};
    const res = {
      json: sinon.spy()
    };

    await categoriesController.getAllCategories(req, res);

    sinon.assert.calledOnce(findAllStub);
    sinon.assert.calledWith(findAllStub, {
      attributes: ['id_category', 'name_category'],
      order: [['id_category', 'DESC']]
    });

    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith([{
      id_category: 1,
      name_category: 'Category 1'
    }])).to.be.true;
  });
});
