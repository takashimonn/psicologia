"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _psicologos = require("../controllers/psicologos.controller");
var router = (0, _express.Router)();
router.get('/psicologos', _psicologos.GetPsicologos);
router.get('/psicologos/:id_psicologo', _psicologos.GetPsicologo);
router.post('/psicologos', _psicologos.CreatePsicologo);
router["delete"]('/psicologos/:id_psicologo', _psicologos.DeletePsicologo);
router.put('/psicologos/:id_psicologo', _psicologos.PutPsicologo);
var _default = exports["default"] = router;