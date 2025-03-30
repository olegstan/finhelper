"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ContactConstants = exports["default"] = /*#__PURE__*/function () {
  function ContactConstants() {
    _classCallCheck(this, ContactConstants);
  }
  return _createClass(ContactConstants, null, [{
    key: "statuses",
    value: function statuses() {
      return [{
        id: ContactConstants.CALL,
        name: 'Звонок'
      }, {
        id: ContactConstants.MEETINGS,
        name: 'Встреча'
      }, {
        id: ContactConstants.CONSULTATION,
        name: 'Консультация'
      }, {
        id: ContactConstants.CONTRACT_PENDING,
        name: 'Договор на рассмотрении'
      }, {
        id: ContactConstants.CONTRACT_CONFIRMED,
        name: 'Договор подписан'
      }, {
        id: ContactConstants.CONTRACT_REFUSED,
        name: 'Договор отклонён'
      }];
    }
  }, {
    key: "getStatusById",
    value: function getStatusById(id) {
      var status = null;
      ContactConstants.statuses().map(function (item) {
        if (item.id === id) {
          status = item;
        }
      });
      return status;
    }
  }]);
}();
_defineProperty(ContactConstants, "CALL", 1001);
_defineProperty(ContactConstants, "MEETINGS", 1002);
_defineProperty(ContactConstants, "CONSULTATION", 1003);
_defineProperty(ContactConstants, "CONTRACT_PENDING", 1004);
_defineProperty(ContactConstants, "CONTRACT_CONFIRMED", 1005);
_defineProperty(ContactConstants, "CONTRACT_REFUSED", 1006);