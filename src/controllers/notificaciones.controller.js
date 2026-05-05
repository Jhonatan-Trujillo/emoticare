const NotificacionesModel = require('../models/notificaciones.model');

const listarNotificaciones = async (req, res) => {
  try {
    const usuarioId = req.usuario.id
    

    const notificaciones = await NotificacionesModel.listarPorUsuario(usuarioId);
    res.json({ ok: true, data: notificaciones });
  } catch (err) {
    next(err);
  }
};

const marcarLeida = async (req, res) => {
  try {
    const usuarioId = req.usuario.id
    

    const resultado = await NotificacionesModel.marcarLeida(req.params.id, usuarioId);
    if (!resultado.ok) {
      return res.status(404).json(resultado);
    }

    res.json({ ok: true, msg: 'Notificación marcada como leída.', data: resultado.notificacion });
  } catch (err) {
    next(err);
  }
};

module.exports = { listarNotificaciones, marcarLeida };