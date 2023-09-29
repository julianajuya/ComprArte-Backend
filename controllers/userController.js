const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Metodo getAllUser extrae todos los usuarios de la base de datos
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Metodo extrae un usuario por el email
exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findAll({
      where: {
        email_user: req.params.email_user,
      },
    });
    res.json(user[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Metodo que crea un usuario en la base de datos
exports.createUser = async (req, res) => {
  const saltRounds = 10;
  const plainPassword = req.body.user_password;
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    await userModel.create({
      ...req.body,
      user_password: hashedPassword 
    });
    res.json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// Metodo que actualiza el usuario
exports.updateUser = async (req, res) => {
  try {
    const plainPassword = req.body.user_password; // Obtén la contraseña sin encriptar del cuerpo de la solicitud
    if (plainPassword) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      req.body.user_password = hashedPassword; // Reemplaza la contraseña sin encriptar con la contraseña encriptada en el cuerpo de la solicitud
    }
    await userModel.update(req.body, {
      where: { email_user: req.params.email_user },
    });
    res.json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Metodo que elimina un usuario de la base de datos
exports.deleteUser = async (req, res) => {
  try {
    await userModel.destroy({
      where: { email_user: req.params.email_user },
    });
    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Metodo de login
exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  try {
    const user = await UserModel.findAll({ where: {
      email: email,
    }, });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const passwordMatch = await bcrypt.compare(password, user[0].password );
    const rol = user[0].rol
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token, rol});
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};