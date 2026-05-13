const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/citas.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — requieren token JWT
router.post('/',              verificarToken, ctrl.agendarCita);
router.get('/',               verificarToken, ctrl.listarCitas);
router.get('/:id',            verificarToken, ctrl.obtenerCita);
router.put('/:id/cancelar', verificarToken, ctrl.cancelarCita);
router.put('/:id',            verificarToken, ctrl.modificarCita);

module.exports = router;