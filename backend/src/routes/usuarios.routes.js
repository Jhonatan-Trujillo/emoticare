const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuarios.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — requieren token JWT
router.get('/perfil',  verificarToken, ctrl.obtenerPerfil);
router.put('/perfil',  verificarToken, ctrl.actualizarPerfil);

module.exports = router;