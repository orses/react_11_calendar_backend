const { response } = require('express');

const createUser = (req, res = express.response) => {
  const { name, email, password } = req.body;
  res.status(201).json({
    ok: true,
    email,
    message: 'register',
    name,
    password,
  });
};

const loginUser = (req, res = express.response) => {
  const { email, password } = req.body;
  res.status(201).json({ ok: true, email, message: 'login', password });
};

const renewToken = (req, res = express.response) => {
  console.log(`${req.method}${req.path} - ${req.ip}`);
  console.log(req);
  res.json({
    authenticated: true,
    message: 'token',
    requestData: `${req.method}${req.path} - ${req.ip}`,
  });
};

module.exports = { createUser, loginUser, renewToken };
