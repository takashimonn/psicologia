"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _citas = require("../controllers/citas.controller");
var router = (0, _express.Router)();
router.get('/citas', _citas.GetCitas);
router.get('/citas/:id_cita', _citas.GetCita);
router.post('/citas', _citas.CreateCita);
router["delete"]('/citas/:id_cita', _citas.DeleteCita);
router.put('/citas/:id_cita', _citas.PutCita);
router.get('/citas/paciente/:id_paciente', _citas.GetCitasPaciente);
router.put('/citas/confirmar/:id_cita', _citas.ConfirmarCita);
router.put('/citas/:id_cita/cancelar', _citas.CancelarCita);
var _default = exports["default"] = router;