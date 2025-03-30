"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UserNotificationConstants = exports["default"] = /*#__PURE__*/_createClass(function UserNotificationConstants() {
  _classCallCheck(this, UserNotificationConstants);
});
_defineProperty(UserNotificationConstants, "CREATED", 1001);
_defineProperty(UserNotificationConstants, "READED", 2001);
_defineProperty(UserNotificationConstants, "CONFIRMED", 3001);
_defineProperty(UserNotificationConstants, "REFUSED", 4001);
/**
 * action type
 */
_defineProperty(UserNotificationConstants, "TRANSFERED_STOCK", 1001);
//при списании ЦБ
_defineProperty(UserNotificationConstants, "CLOSE_INSURANCES", 1002);
_defineProperty(UserNotificationConstants, "TOKEN_IS_NOT_VALID", 1003);
_defineProperty(UserNotificationConstants, "NEGATIVE_TRADES", 1004);
_defineProperty(UserNotificationConstants, "NOT_FOUND_STOCK", 1005);
_defineProperty(UserNotificationConstants, "NOT_FOUND_MONEY_ON_DATE", 1006);
_defineProperty(UserNotificationConstants, "ERROR_COUNT_STOCK", 1007);
_defineProperty(UserNotificationConstants, "ZENMONEY_RELATION_BROKER", 1008);
_defineProperty(UserNotificationConstants, "CONTACT_BIRTHDAY", 2003);
_defineProperty(UserNotificationConstants, "ATON_CLIENT_CREATE", 2004);
_defineProperty(UserNotificationConstants, "ATON_ERROR_PARSE", 2005);
_defineProperty(UserNotificationConstants, "ATON_DEPOSIT_MONEY", 2006);
_defineProperty(UserNotificationConstants, "ATON_NO_ACTIVITY", 2007);