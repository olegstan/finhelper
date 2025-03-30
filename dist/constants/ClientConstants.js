"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ClientConstants;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ClientConstants = exports["default"] = /*#__PURE__*/_createClass(function ClientConstants() {
  _classCallCheck(this, ClientConstants);
});
_ClientConstants = ClientConstants;
_defineProperty(ClientConstants, "CLIENT", 'client');
_defineProperty(ClientConstants, "MANAGER", 'manager');
_defineProperty(ClientConstants, "OWNER", 'owner');
_defineProperty(ClientConstants, "DIRECTOR", 'director');
_defineProperty(ClientConstants, "ASSISTANT", 'assistant');
_defineProperty(ClientConstants, "ACCOUNTANT", 'accountant');
_defineProperty(ClientConstants, "PARTNER", 'partner');
_defineProperty(ClientConstants, "DRIVER", 'driver');
_defineProperty(ClientConstants, "DEPARTMENT_BOSS", 'departmentboss');
_defineProperty(ClientConstants, "MANAGER_GROUP", [_ClientConstants.MANAGER, _ClientConstants.OWNER, _ClientConstants.DIRECTOR, _ClientConstants.ASSISTANT, _ClientConstants.ACCOUNTANT, _ClientConstants.PARTNER, _ClientConstants.DRIVER, _ClientConstants.DEPARTMENT_BOSS]);
_defineProperty(ClientConstants, "getRole", function (slug) {
  switch (slug) {
    case 'owner':
      return 'Владелец';
    case 'director':
      return 'Руководитель';
    case 'assistant':
      return 'Ассистент';
    case 'manager':
      return 'Менеджер';
    case 'accountant':
      return 'Бухгалтер';
    case 'partner':
      return 'Партнер';
    case 'driver':
      return 'Водитель';
    case 'departmentboss':
      return 'Начальник отдела';
  }
});