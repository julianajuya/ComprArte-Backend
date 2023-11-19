const { expect } = require('chai');
const sinon = require('sinon');
const workshopController = require('../controllers/workshopController');
const Workshop = require('../models/workshopsModel');

describe('Workshop Controller', () => {
    describe('createWorkshop', () => {
      it('debería crear un nuevo taller', async () => {
        const req = { body: { /* datos del taller */ } };
        const res = { json: sinon.stub() };
  
        sinon.stub(Workshop, 'create').resolves(req.body);
  
        await workshopController.createWorkshop(req, res);
  
        sinon.assert.calledWith(res.json, { message: 'Taller creado con éxito' });
        Workshop.create.restore();
      });
  
      it('debería manejar errores al crear un nuevo taller', async () => {
        const req = { body: { /* datos del taller */ } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  
        sinon.stub(Workshop, 'create').rejects(new Error('Error al crear taller'));
  
        await workshopController.createWorkshop(req, res);
  
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { error: 'Fallo al crear un nuevo taller' });
        Workshop.create.restore();
      });
    });
  
    describe('getAllWorkshops', () => {
      it('debería obtener todos los talleres', async () => {
        const req = {};
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  
        sinon.stub(Workshop, 'findAll').resolves([]);
  
        await workshopController.getAllWorkshops(req, res);
  
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledWith(res.json, []);
        Workshop.findAll.restore();
      });
  
      it('debería manejar errores al obtener todos los talleres', async () => {
        const req = {};
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  
        sinon.stub(Workshop, 'findAll').rejects(new Error('Error al obtener talleres'));
  
        await workshopController.getAllWorkshops(req, res);
 
      });
      describe('getWorkshopById', () => {
        it('debería obtener un taller por su ID', async () => {
          const req = { params: { id: 1 } };
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
          sinon.stub(Workshop, 'findByPk').resolves({ id: 1, /* datos del taller */ });
    
          await workshopController.getWorkshopById(req, res);
    
          sinon.assert.calledWith(res.status, 200);
          sinon.assert.calledWith(res.json, { id: 1, /* datos del taller */ });
          Workshop.findByPk.restore();
        });
    
        it('debería manejar errores al obtener un taller por su ID', async () => {
          const req = { params: { id: 1 } };
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
          sinon.stub(Workshop, 'findByPk').rejects(new Error('Error al obtener taller por ID'));
    
          await workshopController.getWorkshopById(req, res);
    
          sinon.assert.calledWith(res.status, 500);
          sinon.assert.calledWith(res.json, { error: 'Error de Servidor' });
          Workshop.findByPk.restore();
        });
    
        it('debería manejar el caso cuando un taller no se encuentra por su ID', async () => {
          const req = { params: { id: 1 } };
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
          sinon.stub(Workshop, 'findByPk').resolves(null);
    
          await workshopController.getWorkshopById(req, res);
    
          sinon.assert.calledWith(res.status, 404);
          sinon.assert.calledWith(res.json, { error: 'Taller no encontrado' });
          Workshop.findByPk.restore();
        });
      });
    });
  
  });
  