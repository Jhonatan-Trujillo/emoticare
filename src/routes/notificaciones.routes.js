const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/notificaciones.controller');

router.get('/', ctrl.listarNotificaciones);             // GET   /api/v1/notificaciones
router.patch('/:id/leer', ctrl.marcarLeida);            // PATCH /api/v1/notificaciones/:id/leer

module.exports = router;
