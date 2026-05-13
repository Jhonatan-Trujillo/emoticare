const EspecialistasModel = require('../models/especialistas.model');

const listarEspecialistas = async (req, res) => {
  try {
    const { nombre, especialidad, condicion, modalidad } = req.query;
    const lista = await EspecialistasModel.listar({ nombre, especialidad, condicion, modalidad });
    res.json({ ok: true, data: lista });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
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
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { listarEspecialistas, obtenerEspecialista };