"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PutCita = exports.GetCitasPaciente = exports.GetCitas = exports.GetCita = exports.DeleteCita = exports.CreateCita = exports.ConfirmarCita = exports.CancelarCita = void 0;

var _database = require("../database");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Obtener todas las citas
var GetCitas = exports.GetCitas = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var connection, _yield$connection$que, _yield$connection$que2, rows;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context.sent;
          _context.next = 6;
          return connection.query('SELECT * FROM citas');
        case 6:
          _yield$connection$que = _context.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          rows = _yield$connection$que2[0];
          res.json(rows);
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error al obtener citas:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener las citas.'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function GetCitas(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Obtener una cita por ID
var GetCita = exports.GetCita = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var connection, _yield$connection$que3, _yield$connection$que4, rows;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context2.sent;
          _context2.next = 6;
          return connection.query("SELECT * FROM citas WHERE id_cita = ?", [req.params.id_cita]);
        case 6:
          _yield$connection$que3 = _context2.sent;
          _yield$connection$que4 = _slicedToArray(_yield$connection$que3, 1);
          rows = _yield$connection$que4[0];
          if (rows.length > 0) {
            res.json(rows[0]);
          } else {
            res.status(404).json({
              message: 'Cita no encontrada.'
            });
          }
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error('Error al obtener la cita:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener la cita.'
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function GetCita(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Obtener las citas de un paciente específico
var GetCitasPaciente = exports.GetCitasPaciente = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var connection, _yield$connection$que5, _yield$connection$que6, rows;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context3.sent;
          _context3.next = 6;
          return connection.query("SELECT * FROM citas WHERE id_paciente = ?", [req.params.id_paciente]);
        case 6:
          _yield$connection$que5 = _context3.sent;
          _yield$connection$que6 = _slicedToArray(_yield$connection$que5, 1);
          rows = _yield$connection$que6[0];
          if (rows.length > 0) {
            res.json(rows);
          } else {
            res.status(404).json({
              message: 'No se encontraron citas para el paciente.'
            });
          }
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error('Error al obtener citas del paciente:', _context3.t0);
          res.status(500).json({
            message: 'Error al obtener las citas del paciente.'
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function GetCitasPaciente(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Crear una nueva cita
var CreateCita = exports.CreateCita = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var connection, _yield$connection$que7, _yield$connection$que8, results;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context4.sent;
          _context4.next = 6;
          return connection.query("INSERT INTO citas(id_psicologo, id_paciente, fecha_cita, hora_cita, tipo_cita, estado) VALUES (?,?,?,?,?,?)", [req.body.id_psicologo, req.body.id_paciente, req.body.fecha_cita, req.body.hora_cita, req.body.tipo_cita, req.body.estado]);
        case 6:
          _yield$connection$que7 = _context4.sent;
          _yield$connection$que8 = _slicedToArray(_yield$connection$que7, 1);
          results = _yield$connection$que8[0];
          res.status(201).json(_objectSpread({
            id: results.insertId
          }, req.body));
          _context4.next = 16;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error('Error al crear la cita:', _context4.t0);
          res.status(500).json({
            message: 'Error al crear la cita.'
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function CreateCita(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Eliminar una cita
var DeleteCita = exports.DeleteCita = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var connection, _yield$connection$que9, _yield$connection$que10, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context5.sent;
          _context5.next = 6;
          return connection.query("DELETE FROM citas WHERE id_cita = ?", [req.params.id_cita]);
        case 6:
          _yield$connection$que9 = _context5.sent;
          _yield$connection$que10 = _slicedToArray(_yield$connection$que9, 1);
          result = _yield$connection$que10[0];
          if (result.affectedRows > 0) {
            res.sendStatus(204);
          } else {
            res.status(404).json({
              message: 'Cita no encontrada.'
            });
          }
          _context5.next = 16;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          console.error('Error al eliminar la cita:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar la cita.'
          });
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function DeleteCita(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Actualizar una cita
var PutCita = exports.PutCita = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var connection, _yield$connection$que11, _yield$connection$que12, rows;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context6.sent;
          _context6.next = 6;
          return connection.query("UPDATE citas SET ? WHERE id_cita = ?", [req.body, req.params.id_cita]);
        case 6:
          _context6.next = 8;
          return connection.query("SELECT * FROM citas WHERE id_cita = ?", [req.params.id_cita]);
        case 8:
          _yield$connection$que11 = _context6.sent;
          _yield$connection$que12 = _slicedToArray(_yield$connection$que11, 1);
          rows = _yield$connection$que12[0];
          if (rows.length > 0) {
            res.json(rows[0]);
          } else {
            res.status(404).json({
              message: 'Cita no encontrada.'
            });
          }
          _context6.next = 18;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          console.error('Error al actualizar la cita:', _context6.t0);
          res.status(500).json({
            message: 'Error al actualizar la cita.'
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function PutCita(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// Confirmar cita (actualizar estado a 'confirmada')
var ConfirmarCita = exports.ConfirmarCita = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var connection, _yield$connection$que13, _yield$connection$que14, result, _yield$connection$que15, _yield$connection$que16, rows;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context7.sent;
          _context7.next = 6;
          return connection.query("UPDATE citas SET estado = 'confirmada' WHERE id_cita = ?", [req.params.id_cita]);
        case 6:
          _yield$connection$que13 = _context7.sent;
          _yield$connection$que14 = _slicedToArray(_yield$connection$que13, 1);
          result = _yield$connection$que14[0];
          if (!(result.affectedRows > 0)) {
            _context7.next = 18;
            break;
          }
          _context7.next = 12;
          return connection.query("SELECT * FROM citas WHERE id_cita = ?", [req.params.id_cita]);
        case 12:
          _yield$connection$que15 = _context7.sent;
          _yield$connection$que16 = _slicedToArray(_yield$connection$que15, 1);
          rows = _yield$connection$que16[0];
          res.json({
            message: 'Cita confirmada.',
            cita: rows[0]
          });
          _context7.next = 19;
          break;
        case 18:
          res.status(404).json({
            message: 'Cita no encontrada.'
          });
        case 19:
          _context7.next = 25;
          break;
        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](0);
          console.error('Error al confirmar la cita:', _context7.t0);
          res.status(500).json({
            message: 'Error al confirmar la cita.'
          });
        case 25:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 21]]);
  }));
  return function ConfirmarCita(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// Cancelar una cita (actualizar estado a 'cancelada')
var CancelarCita = exports.CancelarCita = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var connection, _yield$connection$que17, _yield$connection$que18, result, _yield$connection$que19, _yield$connection$que20, rows;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _database.connect)();
        case 3:
          connection = _context8.sent;
          _context8.next = 6;
          return connection.query("UPDATE citas SET estado = 'cancelada' WHERE id_cita = ?", [req.params.id_cita]);
        case 6:
          _yield$connection$que17 = _context8.sent;
          _yield$connection$que18 = _slicedToArray(_yield$connection$que17, 1);
          result = _yield$connection$que18[0];
          if (!(result.affectedRows > 0)) {
            _context8.next = 18;
            break;
          }
          _context8.next = 12;
          return connection.query("SELECT * FROM citas WHERE id_cita = ?", [req.params.id_cita]);
        case 12:
          _yield$connection$que19 = _context8.sent;
          _yield$connection$que20 = _slicedToArray(_yield$connection$que19, 1);
          rows = _yield$connection$que20[0];
          res.json({
            message: 'Cita cancelada.',
            cita: rows[0]
          });
          _context8.next = 19;
          break;
        case 18:
          res.status(404).json({
            message: 'Cita no encontrada.'
          });
        case 19:
          _context8.next = 25;
          break;
        case 21:
          _context8.prev = 21;
          _context8.t0 = _context8["catch"](0);
          console.error('Error al cancelar la cita:', _context8.t0);
          res.status(500).json({
            message: 'Error al cancelar la cita.'
          });
        case 25:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 21]]);
  }));
  return function CancelarCita(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();