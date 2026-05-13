const AgendaModel = require('../models/agenda.model');

const agregarDisponibilidad = async (req, res) => {
  try {
    const especialistaId = req.usuario.id;
   
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
    next(err);
  }
};

const eliminarDisponibilidad = async (req, res) => {
  try {
    const especialistaId = req.usuario.id;
    
    const resultado = await AgendaModel.eliminarFranja(req.params.id, especialistaId);
    if (!resultado.ok) {
      return res.status(resultado.status || 400).json(resultado);
    }

    res.json({ ok: true, msg: 'Franja de disponibilidad eliminada.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { agregarDisponibilidad, eliminarDisponibilidad };