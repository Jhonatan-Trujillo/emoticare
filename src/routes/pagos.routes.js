const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pagos.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — requieren token JWT
router.post('/procesar',  verificarToken, ctrl.procesarPago);
router.get('/historial',  verificarToken, ctrl.historialPagos);

module.exports = router;