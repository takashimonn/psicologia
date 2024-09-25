"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _psicologosRouter = _interopRequireDefault(require("./routes/psicologos.router.js"));
var _pacientesRouter = _interopRequireDefault(require("./routes/pacientes.router.js"));
var _citasRouter = _interopRequireDefault(require("./routes/citas.router.js"));
var _diagnosticosRouter = _interopRequireDefault(require("./routes/diagnosticos.router.js"));
var _notasRouter = _interopRequireDefault(require("./routes/notas.router.js"));
var _loginRouter = _interopRequireDefault(require("./routes/login.router.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import PsicologosRouter from './routes/psicologos.router';

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])());
app.use(_express["default"].json());
app.use(_loginRouter["default"]);
app.use(_loginRouter["default"]);
app.use(_psicologosRouter["default"]);
app.use(_citasRouter["default"]);
app.use(_pacientesRouter["default"]);
app.use(_diagnosticosRouter["default"]);
app.use(_notasRouter["default"]);
var _default = exports["default"] = app;