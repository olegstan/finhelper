"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ContactTaskRepeatConstants;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ContactTaskRepeatConstants = exports["default"] = /*#__PURE__*/function () {
  function ContactTaskRepeatConstants() {
    _classCallCheck(this, ContactTaskRepeatConstants);
  }
  return _createClass(ContactTaskRepeatConstants, null, [{
    key: "getTextByType",
    value: function getTextByType(type) {
      switch (type) {
        case ContactTaskRepeatConstants.REPEAT_NONE:
          return 'Не повторять';
        case ContactTaskRepeatConstants.REPEAT_DAILY:
          return 'Ежедневно';
        case ContactTaskRepeatConstants.REPEAT_WEEKLY:
          return 'Еженедельно';
        case ContactTaskRepeatConstants.REPEAT_MONTHLY:
          return 'Ежемесячно';
      }
    }
  }]);
}();
_ContactTaskRepeatConstants = ContactTaskRepeatConstants;
_defineProperty(ContactTaskRepeatConstants, "REPEAT_NONE", 1001);
_defineProperty(ContactTaskRepeatConstants, "REPEAT_DAILY", 1002);
_defineProperty(ContactTaskRepeatConstants, "REPEAT_WEEKLY", 1003);
_defineProperty(ContactTaskRepeatConstants, "REPEAT_MONTHLY", 1004);
_defineProperty(ContactTaskRepeatConstants, "statuses", [_ContactTaskRepeatConstants.REPEAT_NONE, _ContactTaskRepeatConstants.REPEAT_DAILY, _ContactTaskRepeatConstants.REPEAT_WEEKLY, _ContactTaskRepeatConstants.REPEAT_MONTHLY]);