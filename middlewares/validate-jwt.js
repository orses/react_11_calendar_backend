const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  // x-token headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Origen de petición no válido',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      ok: false,
      message: 'Origen no válido',
    });
  }

  next();
};

module.exports = validateJWT;
