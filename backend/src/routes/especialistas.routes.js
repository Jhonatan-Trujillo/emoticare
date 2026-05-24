const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/especialistas.controller');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas PÚBLICAS — cualquiera puede ver especialistas
router.get('/',    ctrl.listarEspecialistas);
router.get('/:id', ctrl.obtenerEspecialista);

// Rutas PROTEGIDAS — solo administradores
router.post('/',      verificarToken, verificarRol('administrador'), ctrl.crearEspecialista);
router.put('/:id',    verificarToken, verificarRol('administrador'), ctrl.actualizarEspecialista);
router.delete('/:id', verificarToken, verificarRol('administrador'), ctrl.eliminarEspecialista);

module.exports = router;