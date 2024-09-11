"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _notas = require("../controllers/notas.controller");
var router = (0, _express.Router)();
router.get("/notas", _notas.GetNotas);
router.get("/notas/:id_nota", _notas.GetNota);
router.post('/notas', _notas.CreateNota);
router["delete"]("/notas/:id_nota", _notas.DeleteNota);
router.put("/notas/:id_nota", _notas.PutNota);
var _default = exports["default"] = router;