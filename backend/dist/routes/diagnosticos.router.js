"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _diagnosticosController = require("../controllers/diagnosticos.controller.js");
var router = (0, _express.Router)();
router.get('/diagnosticos', _diagnosticosController.GetDiagnosticos);
router.get('/diagnosticos/:id_diagnostico', _diagnosticosController.GetDiagnostico);
router.post('/diagnosticos', _diagnosticosController.CreateDiagnostico);
router["delete"]('/diagnosticos/:id_diagnostico', _diagnosticosController.DeleteDiagnostico);
router.put('/diagnosticos/:id_diagnostico', _diagnosticosController.PutDiagnostico);
router.get('/diagnosticos/psicologo/:id_psicologo', _diagnosticosController.GetDiagnosticosByPsicologo);
var _default = exports["default"] = router;