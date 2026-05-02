const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/admin.controller');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — solo administradores
router.get('/usuarios',                      verificarToken, verificarRol('administrador'), ctrl.listarUsuarios);
router.put('/especialistas/:id/aprobar',   verificarToken, verificarRol('administrador'), ctrl.aprobarEspecialista);
router.get('/reportes',                      verificarToken, verificarRol('administrador'), ctrl.obtenerReportes);

module.exports = router;