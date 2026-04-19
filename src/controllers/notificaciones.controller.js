const NotificacionesModel = require('../models/notificaciones.model');

const listarNotificaciones = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const notificaciones = await NotificacionesModel.listarPorUsuario(usuarioId);
    res.json({ ok: true, data: notificaciones });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const marcarLeida = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const resultado = await NotificacionesModel.marcarLeida(req.params.id, usuarioId);
    if (!resultado.ok) {
      return res.status(404).json(resultado);
    }

    res.json({ ok: true, msg: 'Notificación marcada como leída.', data: resultado.notificacion });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { listarNotificaciones, marcarLeida };