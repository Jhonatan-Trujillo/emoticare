const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/citas.controller');

router.post('/', ctrl.agendarCita);                    // POST  /api/v1/citas
router.get('/', ctrl.listarCitas);                     // GET   /api/v1/citas
router.get('/:id', ctrl.obtenerCita);                  // GET   /api/v1/citas/:id
router.patch('/:id/cancelar', ctrl.cancelarCita);      // PATCH /api/v1/citas/:id/cancelar
router.put('/:id', ctrl.modificarCita);                // PUT   /api/v1/citas/:id

module.exports = router;
