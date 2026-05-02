const UsuariosModel = require('../models/usuarios.model');

const obtenerPerfil = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;

    const usuario = await UsuariosModel.buscarPorId(usuarioId);
    if (!usuario) {
      return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    }

    res.json({ ok: true, data: usuario });
  } catch (err) {
    next(err);
  }
};

const actualizarPerfil = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;
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
    next(err);
  }
};

module.exports = { obtenerPerfil, actualizarPerfil };