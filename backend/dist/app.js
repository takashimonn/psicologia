"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _psicologos = _interopRequireDefault(require("./routes/psicologos.router"));
var _pacientes = _interopRequireDefault(require("./routes/pacientes.router"));
var _citas = _interopRequireDefault(require("./routes/citas.router"));
var _diagnosticos = _interopRequireDefault(require("./routes/diagnosticos.router"));
var _notas = _interopRequireDefault(require("./routes/notas.router"));
var _login = _interopRequireDefault(require("./routes/login.router"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])());
app.use(_express["default"].json());
app.use(_login["default"]);
app.use(_login["default"]);
app.use(_psicologos["default"]);
app.use(_citas["default"]);
app.use(_pacientes["default"]);
app.use(_diagnosticos["default"]);
app.use(_notas["default"]);
var _default = exports["default"] = app;