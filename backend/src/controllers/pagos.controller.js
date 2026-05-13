const PagosModel = require('../models/pagos.model');

const procesarPago = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const { citaId, metodoPago } = req.body;
    if (!citaId || !metodoPago) {
      return res.status(400).json({ ok: false, msg: 'citaId y metodoPago son requeridos' });
    }

    const resultado = await PagosModel.procesarPago({ usuarioId, citaId, metodoPago });
    if (!resultado.ok) {
      return res.status(400).json(resultado);
    }

    res.status(201).json({ ok: true, data: resultado.transaccion });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const historialPagos = async (req, res) => {
  try {
    const usuarioId = req.headers['x-usuario-id'];
    if (!usuarioId) {
      return res.status(401).json({ ok: false, msg: 'No autorizado. Token requerido.' });
    }

    const historial = await PagosModel.historialPorUsuario(usuarioId);
    res.json({ ok: true, data: historial });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { procesarPago, historialPagos };