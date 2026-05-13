const EspecialistasModel = require('../models/especialistas.model');

const listarEspecialistas = async (req, res) => {
  try {
    const { nombre, especialidad, condicion, modalidad } = req.query;
    const lista = await EspecialistasModel.listar({ nombre, especialidad, condicion, modalidad });
    res.json({ ok: true, data: lista });
  } catch (err) {
    next(err);
  }
};

const obtenerEspecialista = async (req, res) => {
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

module.exports = { listarEspecialistas, obtenerEspecialista };