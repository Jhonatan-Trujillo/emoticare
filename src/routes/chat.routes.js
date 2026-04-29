const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/chat.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas PROTEGIDAS — requieren token JWT
router.get('/conversaciones',                 verificarToken, ctrl.listarConversaciones);
router.get('/conversaciones/:id/mensajes',    verificarToken, ctrl.obtenerMensajes);

module.exports = router;