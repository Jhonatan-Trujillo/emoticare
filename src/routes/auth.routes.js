const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth.controller');

// Rutas PÚBLICAS — no requieren token
router.post('/registro', ctrl.registro);
router.post('/verificar-correo', ctrl.verificarCorreo);
router.post('/login', ctrl.login);
router.post('/login/tercero', ctrl.loginTercero);

module.exports = router;