const IAModel = require('../models/ia.model');

const enviarMensaje = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;
    const { mensaje } = req.body;

    if (!mensaje || mensaje.trim() === '') {
      return res.status(400).json({ ok: false, msg: 'El mensaje no puede estar vacío' });
    }

    const respuesta = await IAModel.generarRespuesta(usuarioId, mensaje);
    res.json({ ok: true, data: respuesta });
  } catch (err) {
    next(err);
  }
};

const historialIA = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;

    const historial = await IAModel.obtenerHistorial(usuarioId);
    if (!historial.length) {
      return res.status(404).json({ ok: false, msg: 'No hay mensajes previos en esta sesión' });
    }

    res.json({ ok: true, data: historial });
  } catch (err) {
    next(err);
  }
};


module.exports = { enviarMensaje, historialIA };