const PagosModel = require('../models/pagos.model');

const procesarPago = async (req, res) => {
  try {
    const usuarioId = req.usuario.id

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
    next(err);
  }
};

const historialPagos = async (req, res) => {
  try {
    const usuarioId = req.usuario.id
    
    const historial = await PagosModel.historialPorUsuario(usuarioId);
    res.json({ ok: true, data: historial });
  } catch (err) {
    next(err);
  }
};

module.exports = { procesarPago, historialPagos };