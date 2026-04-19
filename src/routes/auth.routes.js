const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth.controller');

router.post('/registro', ctrl.registro);                  // POST /api/v1/auth/registro
router.post('/verificar-correo', ctrl.verificarCorreo);   // POST /api/v1/auth/verificar-correo
router.post('/login', ctrl.login);                        // POST /api/v1/auth/login
router.post('/login/tercero', ctrl.loginTercero);         // POST /api/v1/auth/login/tercero

module.exports = router;
