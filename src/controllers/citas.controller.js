const CitasModel = require('../models/citas.model');

const agendarCita = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;
    const { especialistaId, fecha, hora, modalidad } = req.body;

    if (!especialistaId || !fecha || !hora || !modalidad) {
      return res.status(400).json({ ok: false, msg: 'Faltan campos: especialistaId, fecha, hora, modalidad' });
    }

    const resultado = await CitasModel.agendar({ pacienteId: usuarioId, especialistaId, fecha, hora, modalidad });
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.status(201).json({ ok: true, data: resultado.cita });
  } catch (err) {
    next(err);
  }
};

const listarCitas = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;
    const { estado, fechaInicio, fechaFin } = req.query;

    const citas = await CitasModel.listarPorUsuario(usuarioId, { estado, fechaInicio, fechaFin });
    res.json({ ok: true, data: citas });
  } catch (err) {
    next(err);
  }
};

const obtenerCita = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;

    const cita = await CitasModel.buscarPorId(req.params.id, usuarioId);
    if (!cita) {
      return res.status(404).json({ ok: false, msg: 'Cita no encontrada o sin permiso para verla' });
    }

    res.json({ ok: true, data: cita });
  } catch (err) {
    next(err);
  }
};

const cancelarCita = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;

    const resultado = await CitasModel.cancelar(req.params.id, usuarioId);
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.json({ ok: true, msg: 'Cita cancelada correctamente.', data: resultado.cita });
  } catch (err) {
    next(err);
  }
};

const modificarCita = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;
    const { fecha, hora, modalidad } = req.body;

    const resultado = await CitasModel.modificar(req.params.id, usuarioId, { fecha, hora, modalidad });
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.json({ ok: true, data: resultado.cita });
  } catch (err) {
    next(err);
  }
};

module.exports = { agendarCita, listarCitas, obtenerCita, cancelarCita, modificarCita };