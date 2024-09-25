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

// app.use(cors());
app.use((0, _cors["default"])({
  origin: "https://psicologia.vercel.app",
  credentials: true
}));
app.get('/', function (req, res) {
  res.send('API en funcionamiento'); // O cualquier mensaje que desees
});
app.use((0, _morgan["default"])());
app.use(_express["default"].json());
app.use(_loginRouter["default"]);
app.use('/login', _loginRouter["default"]);
app.use('/psicologos', _psicologosRouter["default"]);
app.use('/citas', _citasRouter["default"]);
app.use('/pacientes', _pacientesRouter["default"]);
app.use('/diagnosticos', _diagnosticosRouter["default"]);
app.use('/notas', _notasRouter["default"]);
// import app from './app';

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server on port ".concat(PORT));
});
var _default = exports["default"] = app;