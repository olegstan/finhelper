"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));
var _ActiveConstants = _interopRequireDefault(require("./../constants/ActiveConstants"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Catalog = exports["default"] = /*#__PURE__*/function (_BaseModel) {
  function Catalog() {
    var _this;
    _classCallCheck(this, Catalog);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Catalog, [].concat(args));
    /**
     *
     * @type {{}}
     */
    _defineProperty(_this, "related", {});
    /**
     *
     * @type {[]}
     */
    _defineProperty(_this, "currencyFields", []);
    return _this;
  }
  _inherits(Catalog, _BaseModel);
  return _createClass(Catalog, [{
    key: "getSymbol",
    value:
    /**
     *
     * @param allowedCatalog
     * @return {string}
     */
    function getSymbol() {
      var _this$attributes, _this$attributes2, _this$attributes3;
      var allowedCatalog = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ActiveConstants["default"].CATALOGS;
      var isin = '';
      var catalog = (_this$attributes = this.attributes) === null || _this$attributes === void 0 ? void 0 : _this$attributes.ticker;
      switch (catalog) {
        case _ActiveConstants["default"].CB_CATALOG:
          isin = (_this$attributes2 = this.attributes) === null || _this$attributes2 === void 0 ? void 0 : _this$attributes2.char_code;
          break;
        case _ActiveConstants["default"].YAHOO_CATALOG:
          isin = (_this$attributes3 = this.attributes) === null || _this$attributes3 === void 0 ? void 0 : _this$attributes3.symbol;
          break;
        case _ActiveConstants["default"].MOEX_CATALOG:
        case _ActiveConstants["default"].CBONDS_CATALOG:
          isin = this.attributes.isin;
          break;
        case _ActiveConstants["default"].CUSTOM_CATALOG:
          isin = this.attributes.symbol;
          break;
      }
      if (allowedCatalog.indexOf(catalog) === -1) {
        return '';
      }
      return isin;
    }
  }]);
}(_BaseModel2["default"]);