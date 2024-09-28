"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _diagnosticos = require("../controllers/diagnosticos.controller");
var router = (0, _express.Router)();
router.get('/diagnosticos', _diagnosticos.GetDiagnosticos);
router.get('/diagnosticos/:id_diagnostico', _diagnosticos.GetDiagnostico);
router.post('/diagnosticos', _diagnosticos.CreateDiagnostico);
router["delete"]('/diagnosticos/:id_diagnostico', _diagnosticos.DeleteDiagnostico);
router.put('/diagnosticos/:id_diagnostico', _diagnosticos.PutDiagnostico);
router.get('/diagnosticos/psicologo/:id_psicologo', _diagnosticos.GetDiagnosticosByPsicologo);
router.get('/diagnosticos/pacientes/:id_paciente', _diagnosticos.GetDiagnosticosByPaciente);
var _default = exports["default"] = router;