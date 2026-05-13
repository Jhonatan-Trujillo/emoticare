const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/especialistas.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas PÚBLICAS — cualquiera puede ver especialistas
router.get('/',    ctrl.listarEspecialistas);
router.get('/:id', ctrl.obtenerEspecialista);

module.exports = router;