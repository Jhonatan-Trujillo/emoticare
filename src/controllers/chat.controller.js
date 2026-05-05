const ChatModel = require('../models/chat.model');

const listarConversaciones = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    
    const conversaciones = await ChatModel.listarConversaciones(usuarioId);
    res.json({ ok: true, data: conversaciones });
  } catch (err) {
    next(err);
  }
};

const obtenerMensajes = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    
    const resultado = await ChatModel.obtenerMensajes(req.params.id, usuarioId);
    if (!resultado.ok) {
      return res.status(403).json(resultado);
    }

    res.json({ ok: true, data: resultado.mensajes });
  } catch (err) {
    next(err);
  }
};

module.exports = { listarConversaciones, obtenerMensajes };