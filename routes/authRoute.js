/*
  Routes for users
  host + /api/auth 
*/
const { Router } = require('express');
const { check } = require('express-validator');
const helmet = require('helmet');
const router = Router();
router.use(helmet());
const {
  createUser,
  loginUser,
  renewToken,
} = require('../controllers/authController');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

router.post(
  '/',
  [
    // middlewares
    check('email', 'The email is required').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({
      min: 6,
      max: 18,
    }),
    validateFields,
  ],
  loginUser
);

router.post(
  '/register',
  [
    // middlewares
    check('name', 'The name is required').not().isEmpty(),
    check('name', 'Name must contain at least 3 characters').isLength({
      min: 3,
    }),
    check('email', 'The email is required').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({
      min: 6,
      max: 18,
    }),
    validateFields,
  ],
  createUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
