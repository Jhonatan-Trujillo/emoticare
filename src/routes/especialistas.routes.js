const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/especialistas.controller');

router.get('/', ctrl.listarEspecialistas);        // GET /api/v1/especialistas
router.get('/:id', ctrl.obtenerEspecialista);     // GET /api/v1/especialistas/:id

module.exports = router;
