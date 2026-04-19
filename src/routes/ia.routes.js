const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ia.controller');

router.post('/mensaje', ctrl.enviarMensaje);    // POST /api/v1/ia/mensaje
router.get('/historial', ctrl.historialIA);     // GET  /api/v1/ia/historial

module.exports = router;
