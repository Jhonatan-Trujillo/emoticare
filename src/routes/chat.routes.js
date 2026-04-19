const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/chat.controller');

router.get('/conversaciones', ctrl.listarConversaciones);                       // GET /api/v1/chat/conversaciones
router.get('/conversaciones/:id/mensajes', ctrl.obtenerMensajes);               // GET /api/v1/chat/conversaciones/:id/mensajes

module.exports = router;