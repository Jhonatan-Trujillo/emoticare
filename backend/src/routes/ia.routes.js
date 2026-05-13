const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ia.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — requieren token JWT
router.post('/mensaje',   verificarToken, ctrl.enviarMensaje);
router.get('/historial',  verificarToken, ctrl.historialIA);

module.exports = router;