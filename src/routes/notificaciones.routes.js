const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/notificaciones.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — requieren token JWT
router.get('/',             verificarToken, ctrl.listarNotificaciones);
router.patch('/:id/leer',   verificarToken, ctrl.marcarLeida);

module.exports = router;