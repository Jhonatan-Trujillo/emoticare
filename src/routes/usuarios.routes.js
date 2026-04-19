const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuarios.controller');

router.get('/perfil', ctrl.obtenerPerfil);    // GET  /api/v1/usuarios/perfil
router.put('/perfil', ctrl.actualizarPerfil); // PUT  /api/v1/usuarios/perfil

module.exports = router;
