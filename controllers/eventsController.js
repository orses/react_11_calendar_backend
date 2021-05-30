const { response } = require('express');
const EventModel = require('../models/EventModel');

const createEvent = async (req, res = response) => {
  const event = new EventModel(req.body);

  try {
    event.user = req.uid;
    const saveEvent = await event.save();

    res.status(200).json({
      ok: true,
      event: saveEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message:
        'No se pudo guardar el evento. Consulte al administrador para más ayuda.',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id.toString();
  const uid = req.uid.toString();

  try {
    const event = await EventModel.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        message: 'El identificador de evento proporcionado no existe.',
      });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        message: 'No tiene privilegio para eliminar este evento.',
      });

    // when the new event is updated, the old document is returned
    // with new: true, return the new document in DB
    await EventModel.findByIdAndDelete(eventId);

    res.status(200).json({
      ok: true,
      message: 'deleteEvent',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message:
        'No se ha podido eliminar el evento. Contacte con el administrador',
    });
  }
};

const getEvents = async (req, res = response) => {
  const events = await EventModel.find().populate('user', 'name');

  res.status(200).json({
    ok: true,
    message: 'getEvents',
    events,
  });
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id.toString();
  const uid = req.uid.toString();

  try {
    const event = await EventModel.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        message: 'El identificador de evento proporcionado no existe.',
      });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        message: 'No tiene privilegio para editar este evento.',
      });

    const newEvent = {
      ...req.body,
      user: uid,
    };

    // when the new event is updated, the old document is returned
    // with new: true, return the new document in DB
    const eventUpdated = await EventModel.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      message: 'updateEvent',
      envento: eventUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message:
        'No se ha podido actualizar el evento. Contacte con el administrador',
    });
  }
};

module.exports = { createEvent, deleteEvent, getEvents, updateEvent };
