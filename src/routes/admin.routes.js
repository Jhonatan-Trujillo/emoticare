const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/admin.controller');

router.get('/usuarios', ctrl.listarUsuarios);                           // GET   /api/v1/admin/usuarios
router.patch('/especialistas/:id/aprobar', ctrl.aprobarEspecialista);   // PATCH /api/v1/admin/especialistas/:id/aprobar
router.get('/reportes', ctrl.obtenerReportes);                          // GET   /api/v1/admin/reportes

module.exports = router;
