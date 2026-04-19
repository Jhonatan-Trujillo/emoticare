const IAModel = require('../models/ia.model');

const enviarMensaje = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const { mensaje } = req.body;
    if (!mensaje || mensaje.trim() === '') {
      return res.status(400).json({ ok: false, msg: 'El mensaje no puede estar vacío' });
    }

    const respuesta = await IAModel.generarRespuesta(usuarioId, mensaje);
    res.json({ ok: true, data: respuesta });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const historialIA = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const historial = await IAModel.obtenerHistorial(usuarioId);
    if (!historial.length) {
      return res.status(404).json({ ok: false, msg: 'No hay mensajes previos en esta sesión' });
    }

    res.json({ ok: true, data: historial });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { enviarMensaje, historialIA };