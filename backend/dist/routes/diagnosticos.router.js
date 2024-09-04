"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _diagnosticos = require("../controllers/diagnosticos.controller");
var router = (0, _express.Router)();
router.get('/diagnosticos', _diagnosticos.GetDiagnosticos);
var _default = exports["default"] = router;