"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _login = require("../controllers/login.controller");
var router = (0, _express.Router)();

// Otras rutas
router.post("/login", _login.verificarCredenciales);
var _default = exports["default"] = router;