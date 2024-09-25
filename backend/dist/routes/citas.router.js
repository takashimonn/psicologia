"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _citasController = require("../controllers/citas.controller.js");
var router = (0, _express.Router)();
router.get('/citas', _citasController.GetCitas);
router.get('/citas/:id_cita', _citasController.GetCita);
router.post('/citas', _citasController.CreateCita);
router["delete"]('/citas/:id_cita', _citasController.DeleteCita);
router.put('/citas/:id_cita', _citasController.PutCita);
router.get('/citas/paciente/:id_paciente', _citasController.GetCitasPaciente);
router.put('/citas/confirmar/:id_cita', _citasController.ConfirmarCita);
router.put('/citas/:id_cita/cancelar', _citasController.CancelarCita);
var _default = exports["default"] = router;