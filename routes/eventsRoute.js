/*
  Routes for CRUD with Calendar events
  host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const helmet = require('helmet');
const isDate = require('../helpers/isDate');

const {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} = require('../controllers/eventsController');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = Router();
router.use(helmet());

router.use(validateJWT);

router.get('/', getEvents);

router.post(
  '/create',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Se requiere una fecha de inicio').custom(isDate),
    check(
      'end',
      'Se requiere una fecha de finalización, que además sea superior a la fecha de inicio.'
    ).custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
