"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _pacientes = require("../controllers/pacientes.controller");
var router = (0, _express.Router)();
router.get('/pacientes', _pacientes.getPacientes);
router.get('/pacientes/:id_paciente', _pacientes.getPaciente);
router.post('/pacientes', _pacientes.createPaciente);
router["delete"]('/pacientes/:id_paciente', _pacientes.deletePaciente);
router.put('/pacientes/:id_paciente', _pacientes.putPaciente);
var _default = exports["default"] = router;