"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _pacientesController = require("../controllers/pacientes.controller.js");
var router = (0, _express.Router)();
router.get('/pacientes', _pacientesController.getPacientes);
router.get('/pacientes/:id_paciente', _pacientesController.getPaciente);
router.post('/pacientes', _pacientesController.createPaciente);
router["delete"]('/pacientes/:id_paciente', _pacientesController.deletePaciente);
router.put('/pacientes/:id_paciente', _pacientesController.putPaciente);
var _default = exports["default"] = router;