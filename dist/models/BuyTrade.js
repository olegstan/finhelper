"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ModelHelper = _interopRequireDefault(require("../helpers/ModelHelper"));
var _Trade2 = _interopRequireDefault(require("./Trade"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var BuyTrade = exports["default"] = /*#__PURE__*/function (_Trade) {
  function BuyTrade(attributes) {
    var _this;
    _classCallCheck(this, BuyTrade);
    _this = _callSuper(this, BuyTrade);
    _this.attributes = attributes;
    _this.setGetters(attributes);
    return _this;
  }
  _inherits(BuyTrade, _Trade);
  return _createClass(BuyTrade, [{
    key: "loadConvertTrade",
    value: function loadConvertTrade() {
      var _this$attributes;
      if (!this.modelFields.convert_trade.loaded && ((_this$attributes = this.attributes) === null || _this$attributes === void 0 || (_this$attributes = _this$attributes.convert_trade) === null || _this$attributes === void 0 || (_this$attributes = _this$attributes.active) === null || _this$attributes === void 0 || (_this$attributes = _this$attributes.buy_trades) === null || _this$attributes === void 0 ? void 0 : _this$attributes.length) > 0) {
        var _this$attributes2;
        var trade = (_this$attributes2 = this.attributes) === null || _this$attributes2 === void 0 || (_this$attributes2 = _this$attributes2.convert_trade) === null || _this$attributes2 === void 0 || (_this$attributes2 = _this$attributes2.active) === null || _this$attributes2 === void 0 ? void 0 : _this$attributes2.buy_trades[0];
        //находим пропорционально цену 1 лота
        var price = 0,
          originalPrice = 0,
          accumulatedCouponPerOne = 0,
          originalAccumulatedCouponPerOne = 0;
        if (trade['count'] > 0) {
          price = trade['sum'] / trade['count'];
          originalPrice = trade['original_sum'] / trade['count'];
          accumulatedCouponPerOne = trade['accumulated_coupon'] / trade['count'];
          originalAccumulatedCouponPerOne = trade['original_accumulated_coupon'] / trade['count'];
        }
        this.attributes['currency'] = _ModelHelper["default"].getCurrencyById(trade['currency_id']);
        // this.attributes['id'] = trade['id'];//нельзя менять id так как будет открываться на редатирование старый трейд
        this.attributes['price'] = price;
        this.attributes['original_price'] = originalPrice;
        this.attributes['sum'] = this.attributes['count'] * price;
        this.attributes['original_sum'] = this.attributes['count'] * originalPrice;
        this.attributes['count'] = this.attributes['count'];
        this.attributes['accumulated_coupon'] = this.attributes['count'] * accumulatedCouponPerOne;
        this.attributes['original_accumulated_coupon'] = this.attributes['count'] * originalAccumulatedCouponPerOne;
        this.attributes['type_id'] = trade['type_id'];
        this.attributes['trade_at'] = trade['trade_at'];
        this.attributes['trade_at_date'] = trade['trade_at_date'];
        this.attributes['trade_at_datetime'] = trade['trade_at_datetime'];
        this.modelFields.convert_trade.loaded = true;
      }
    }
  }]);
}(_Trade2["default"]);