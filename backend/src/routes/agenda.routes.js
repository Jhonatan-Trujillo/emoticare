const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/agenda.controller');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — solo especialistas
router.post('/disponibilidad',      verificarToken, verificarRol('especialista'), ctrl.agregarDisponibilidad);
router.delete('/disponibilidad/:id', verificarToken, verificarRol('especialista'), ctrl.eliminarDisponibilidad);

module.exports = router;