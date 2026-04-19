const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pagos.controller');

router.post('/procesar', ctrl.procesarPago);    // POST /api/v1/pagos/procesar
router.get('/historial', ctrl.historialPagos);  // GET  /api/v1/pagos/historial

module.exports = router;
