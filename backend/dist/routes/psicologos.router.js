"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _psicologosController = require("../controllers/psicologos.controller.js");
// import { Router } from 'express';
// import {CreatePsicologo, DeletePsicologo, GetPsicologo, GetPsicologos, PutPsicologo } from '../controllers/psicologos.controller';

// const router = Router();

// router.get('/psicologos', GetPsicologos);

// router.get('/psicologos/:id_psicologo', GetPsicologo);
// router.post('/psicologos', CreatePsicologo);
// router.delete('/psicologos/:id_psicologo', DeletePsicologo);
// router.put('/psicologos/:id_psicologo', PutPsicologo);

// export default router

// Asegúrate de que la ruta y la extensión sean correctas

var router = (0, _express.Router)();

// Rutas de Psicólogos
router.get('/', _psicologosController.GetPsicologos); // Cambié la ruta para evitar duplicación, ya que el prefijo '/psicologos' viene del index.js
router.get('/:id_psicologo', _psicologosController.GetPsicologo);
router.post('/', _psicologosController.CreatePsicologo);
router["delete"]('/:id_psicologo', _psicologosController.DeletePsicologo);
router.put('/:id_psicologo', _psicologosController.PutPsicologo);
var _default = exports["default"] = router;