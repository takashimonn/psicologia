"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _notasController = require("../controllers/notas.controller.js");
var router = (0, _express.Router)();
router.get("/notas", _notasController.GetNotas);
router.get("/notas/:id_nota", _notasController.GetNota);
router.post('/notas', _notasController.CreateNota);
router["delete"]("/notas/:id_nota", _notasController.DeleteNota);
router.put("/notas/:id_nota", _notasController.PutNota);
var _default = exports["default"] = router;