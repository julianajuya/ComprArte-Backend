const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

describe('User Controller Tests', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const req = {};
      const res = {
        json: sinon.stub(),
      };

      await userController.getAllUsers(req, res);

      // Asegura que se llame al método json con los datos esperados
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe('getUser', () => {
    it('should return a user by email', async () => {
      const req = {
        params: {
          email: 'admin@gmail.com',
        },
      };
      const res = {
        json: sinon.stub(),
      };

      await userController.getUser(req, res);

      // Asegura que se llame al método json con los datos esperados
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const req = {
        params: {
          email: 'admin@gmail.com',
        },
        body: {
          user_rol: 'Administrador'
        },
      };
      const res = {
        json: sinon.stub(),
      };

      await userController.updateUser(req, res);

      // Asegura que se llame al método json con el mensaje esperado
      expect(res.json.calledOnceWith({ message: "Usuario actualizado con éxito" })).to.be.true;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const req = {
        params: {
          email: 'maria.sanchez02@uptc.edu.co',
        },
      };
      const res = {
        json: sinon.stub(),
      };

      await userController.deleteUser(req, res);

      // Asegura que se llame al método json con el mensaje esperado
      expect(res.json.calledOnceWith({ message: "Usuario eliminado con éxito" })).to.be.true;
    });
  });

  describe('updateUserPassword', () => {
    it('should update user password', async () => {
      const req = {
        params: {
          email: 'julian.obando@uptc.edu.co',
        },
        body: {
          new_password: '123abc',
        },
      };
      const res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      const bcryptStub = sinon.stub(bcrypt, 'hash').resolves('hashed_password');
      const updateStub = sinon.stub(userModel, 'update').resolves();

      await userController.updateUserPassword(req, res);

      // Asegura que se llame al método json con el mensaje esperado
      expect(res.json.calledOnceWith({ message: "Contraseña actualizada con éxito" })).to.be.true;
      // Asegura que bcrypt.hash se llame con la nueva contraseña
      expect(bcryptStub.calledOnceWith(req.body.new_password, 10)).to.be.true;
      // Asegura que userModel.update se llame con la nueva contraseña encriptada
      expect(updateStub.calledOnceWith({ user_password: 'hashed_password' }, { where: { email_user: req.params.email } })).to.be.true;

      bcryptStub.restore();
      updateStub.restore();
    });

  describe('logIn', () => {
    it('should log in a user', async () => {
      const req = {
        body: {
          email_user: 'admin@gmail.com',
          user_password: '13245',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findOneStub = sinon.stub(userModel, 'findOne').resolves({
        email_user: 'example@example.com',
        user_password: 'hashed_password',
        user_rol: 'user_role',
      });

      const compareStub = sinon.stub(bcrypt, 'compare').resolves(true);

      const signStub = sinon.stub(jwt, 'sign').returns('token');

      await userController.logIn(req, res);

      // Asegura que se llame al método status con el código de estado 200
      expect(res.status.calledOnceWith(200)).to.be.true;
      // Asegura que se llame al método json con el token y el rol esperados
      expect(res.json.calledOnceWith({ token: 'token', rol: 'user_role' })).to.be.true;
      // Asegura que userModel.findOne se llame con el email proporcionado
      expect(findOneStub.calledOnceWith({ where: { email_user: req.body.email_user } })).to.be.true;
      // Asegura que bcrypt.compare se llame con la contraseña proporcionada y la contraseña encriptada almacenada en la base de datos
      expect(compareStub.calledOnceWith(req.body.user_password, 'hashed_password')).to.be.true;
      // Asegura que jwt.sign se llame con el objeto de usuario y la clave secreta, y expiresIn: '1h'
      expect(signStub.calledOnceWith({ userId: 'example@example.com' }, 'secret_key', { expiresIn: '1h' })).to.be.true;

      findOneStub.restore();
      compareStub.restore();
      signStub.restore();
    });

    it('should handle invalid credentials', async () => {
      const req = {
        body: {
          email_user: 'example@example.com',
          user_password: 'wrong_password',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findOneStub = sinon.stub(userModel, 'findOne').resolves({
        email_user: 'example@example.com',
        user_password: 'hashed_password',
      });

      const compareStub = sinon.stub(bcrypt, 'compare').resolves(false);

      await userController.logIn(req, res);

      // Asegura que se llame al método status con el código de estado 401
      expect(res.status.calledOnceWith(401)).to.be.true;
      // Asegura que se llame al método json con el mensaje esperado
      expect(res.json.calledOnceWith({ message: "Credenciales inválidas" })).to.be.true;

      findOneStub.restore();
      compareStub.restore();
    });

    it('should handle non-existing user', async () => {
      const req = {
        body: {
          email_user: 'nonexisting@example.com',
          user_password: 'password',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findOneStub = sinon.stub(userModel, 'findOne').resolves(null);

      await userController.logIn(req, res);

      // Asegura que se llame al método status con el código de estado 401
      expect(res.status.calledOnceWith(401)).to.be.true;
      // Asegura que se llame al método json con el mensaje esperado
      expect(res.json.calledOnceWith({ message: "Credenciales inválidas" })).to.be.true;

      findOneStub.restore();
    });
});
});
});
