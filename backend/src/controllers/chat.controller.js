const ChatModel = require('../models/chat.model');

const listarConversaciones = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const conversaciones = await ChatModel.listarConversaciones(usuarioId);
    res.json({ ok: true, data: conversaciones });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const obtenerMensajes = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const resultado = await ChatModel.obtenerMensajes(req.params.id, usuarioId);
    if (!resultado.ok) {
      return res.status(403).json(resultado);
    }

    res.json({ ok: true, data: resultado.mensajes });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { listarConversaciones, obtenerMensajes };