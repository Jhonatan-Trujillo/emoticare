const AgendaModel = require('../models/agenda.model');

const agregarDisponibilidad = async (req, res) => {
  try {
    const especialistaId = req.headers['x-usuario-id'];
    if (!especialistaId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const { fechaInicio, fechaFin } = req.body;
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ ok: false, msg: 'fechaInicio y fechaFin son requeridos' });
    }

    const resultado = await AgendaModel.agregarFranja({ especialistaId, fechaInicio, fechaFin });
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.status(201).json({ ok: true, data: resultado.franja });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const eliminarDisponibilidad = async (req, res) => {
  try {
    const especialistaId = req.headers['x-usuario-id'];
    if (!especialistaId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const resultado = await AgendaModel.eliminarFranja(req.params.id, especialistaId);
    if (!resultado.ok) {
      return res.status(resultado.status || 400).json(resultado);
    }

    res.json({ ok: true, msg: 'Franja de disponibilidad eliminada.' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { agregarDisponibilidad, eliminarDisponibilidad };