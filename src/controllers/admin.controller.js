const AdminModel = require('../models/admin.model');

const listarUsuarios = async (req, res, next) => {
  try {
    const { rol, estado } = req.query;
    const usuarios = await AdminModel.listarUsuarios({ rol, estado });
    res.json({ ok: true, data: usuarios });
  } catch (err) {
    next(err);
  }
};

const aprobarEspecialista = async (req, res, next) => {
  try {
    const { decision } = req.body;
    if (!decision || !['aprobado', 'rechazado'].includes(decision)) {
      return res.status(400).json({ ok: false, msg: 'decision debe ser "aprobado" o "rechazado"' });
    }

    const resultado = await AdminModel.cambiarEstadoEspecialista(req.params.id, decision);
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.json({ ok: true, msg: `Especialista ${decision} correctamente.`, data: resultado.especialista });
  } catch (err) {
    next(err);
  }
};

const obtenerReportes = async (req, res, next) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const reportes = await AdminModel.generarReportes({ fechaInicio, fechaFin });
    res.json({ ok: true, data: reportes });
  } catch (err) {
    next(err);
  }
};

module.exports = { listarUsuarios, aprobarEspecialista, obtenerReportes };