const { response } = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
const generateJWT = require('../helpers/generateJWT');

const createUser = async (req, res = express.response) => {
  const { name, email, password } = req.body;
  try {
    // toString() is for validate input data
    let user = await UserModel.findOne({ email: email.toString() });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'El usuario ya existe.',
      });
    }

    user = new UserModel({ name, email, password });
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message:
        'No es posible el registro. Por favor, inténtelo más tarde o póngase en contacto con el administrador',
    });
  }
};

const loginUser = async (req, res = express.response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email.toString() });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'El usuario no existe.',
      });
    }

    // confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'El email o la contraseña es incorrecto.',
      });
    }

    const token = await generateJWT(user.id, user.name);
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message:
        'No es posible el inicio de sesión. Por favor, inténtelo más tarde o póngase en contacto con el administrador',
    });
  }
};
const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // generate a new token
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    message: 'renew',
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
