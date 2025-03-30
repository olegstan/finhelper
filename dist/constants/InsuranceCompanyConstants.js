"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var InsuranceCompanyConstants = exports["default"] = /*#__PURE__*/function () {
  function InsuranceCompanyConstants() {
    _classCallCheck(this, InsuranceCompanyConstants);
  }
  return _createClass(InsuranceCompanyConstants, null, [{
    key: "getImage",
    value: function getImage(item) {
      if (item) {
        switch (item.company_id) {
          case InsuranceCompanyConstants.ALPHA_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/alfa_strah.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.INGOS_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/ingosstrah.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.ROSGOS_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/rosgosstrah.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.VSK_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/vsk.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.RESO_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/reso.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.SOGAZ_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "shield",
              src: require('../assets/icons/shield.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.MAKS_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/maks.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.RENESANS_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/renessans.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.CAPITAL_LIFE_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/caplife.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.SOGLASIE_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/insurance/soglasie.svg')["default"],
              alt: ""
            });
          case InsuranceCompanyConstants.SBER_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/banks/sber.png'),
              alt: ""
            });
          case InsuranceCompanyConstants.TINKOFF_INS:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "insurance",
              src: require('../assets/banks/tinkoff.png'),
              alt: ""
            });
          case InsuranceCompanyConstants.CUSTOM_INS:
          default:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "shield",
              src: require('../assets/icons/shield.svg')["default"],
              alt: ""
            });
        }
      }
    }
  }]);
}();
_defineProperty(InsuranceCompanyConstants, "ALPHA_INS", 1001);
_defineProperty(InsuranceCompanyConstants, "INGOS_INS", 1002);
_defineProperty(InsuranceCompanyConstants, "ROSGOS_INS", 1003);
_defineProperty(InsuranceCompanyConstants, "VSK_INS", 1004);
_defineProperty(InsuranceCompanyConstants, "RESO_INS", 1005);
_defineProperty(InsuranceCompanyConstants, "SOGAZ_INS", 1006);
_defineProperty(InsuranceCompanyConstants, "MAKS_INS", 1007);
_defineProperty(InsuranceCompanyConstants, "RENESANS_INS", 1008);
_defineProperty(InsuranceCompanyConstants, "CAPITAL_LIFE_INS", 1009);
_defineProperty(InsuranceCompanyConstants, "SOGLASIE_INS", 1010);
_defineProperty(InsuranceCompanyConstants, "SBER_INS", 1011);
_defineProperty(InsuranceCompanyConstants, "TINKOFF_INS", 1012);
_defineProperty(InsuranceCompanyConstants, "CUSTOM_INS", 2001);