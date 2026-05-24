const EspecialistasModel = require('../models/especialistas.model');

const listarEspecialistas = async (req, res, next) => {
  try {
    const { nombre, especialidad, condicion, modalidad } = req.query;
    const lista = await EspecialistasModel.listar({ nombre, especialidad, condicion, modalidad });
    res.json({ ok: true, data: lista });
  } catch (err) {
    next(err);
  }
};

const obtenerEspecialista = async (req, res, next) => {
  try {
    const especialista = await EspecialistasModel.buscarPorId(req.params.id);
    if (!especialista) {
      return res.status(404).json({ ok: false, msg: 'Especialista no encontrado o no aprobado' });
    }
    res.json({ ok: true, data: especialista });
  } catch (err) {
    next(err);
  }
};

const crearEspecialista = async (req, res, next) => {
  try {
    const { usuarioId, especialidad, condiciones, modalidad, precioPorHora } = req.body;

    if (!usuarioId || !especialidad || !modalidad || !precioPorHora) {
      return res.status(400).json({ ok: false, msg: 'Faltan campos: usuarioId, especialidad, modalidad, precioPorHora' });
    }

    const resultado = await EspecialistasModel.crear({ usuarioId, especialidad, condiciones, modalidad, precioPorHora });
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.status(201).json({ ok: true, data: resultado.data });
  } catch (err) {
    next(err);
  }
};

const actualizarEspecialista = async (req, res, next) => {
  try {
    const { especialidad, condiciones, modalidad, precioPorHora } = req.body;

    const especialista = await EspecialistasModel.actualizar(req.params.id, { especialidad, condiciones, modalidad, precioPorHora });
    if (!especialista) {
      return res.status(404).json({ ok: false, msg: 'Especialista no encontrado' });
    }

    res.json({ ok: true, data: especialista });
  } catch (err) {
    next(err);
  }
};

const eliminarEspecialista = async (req, res, next) => {
  try {
    const resultado = await EspecialistasModel.eliminar(req.params.id);
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.json({ ok: true, msg: 'Especialista eliminado correctamente.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { listarEspecialistas, obtenerEspecialista, crearEspecialista, actualizarEspecialista, eliminarEspecialista };