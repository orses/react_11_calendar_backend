const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          reject('No se pudo generar un token');
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
