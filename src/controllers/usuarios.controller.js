const UsuariosModel = require('../models/usuarios.model');

const obtenerPerfil = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const usuario = await UsuariosModel.buscarPorId(usuarioId);
    if (!usuario) {
      return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    }

    res.json({ ok: true, data: usuario });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const actualizarPerfil = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const { nombre, telefono, fotoPerfil } = req.body;

    if (nombre !== undefined && nombre.trim() === '') {
      return res.status(400).json({ ok: false, msg: 'El nombre no puede estar vacío' });
    }

    const resultado = await UsuariosModel.actualizarPerfil(usuarioId, { nombre, telefono, fotoPerfil });
    if (!resultado.ok) {
      return res.status(404).json(resultado);
    }

    res.json({ ok: true, data: resultado.usuario });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { obtenerPerfil, actualizarPerfil };