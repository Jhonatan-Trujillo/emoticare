const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/agenda.controller');

router.post('/disponibilidad', ctrl.agregarDisponibilidad);         // POST   /api/v1/agenda/disponibilidad
router.delete('/disponibilidad/:id', ctrl.eliminarDisponibilidad);  // DELETE /api/v1/agenda/disponibilidad/:id

module.exports = router;
