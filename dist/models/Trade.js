"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));
var _ModelHelper = _interopRequireDefault(require("../helpers/ModelHelper"));
var _laravelRequest = require("laravel-request");
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
var Trade = exports["default"] = /*#__PURE__*/function (_BaseModel) {
  function Trade(attributes) {
    var _this;
    _classCallCheck(this, Trade);
    _this = _callSuper(this, Trade);
    /**
     *
     * @type {string}
     */
    _defineProperty(_this, "controller", 'active_trade');
    _defineProperty(_this, "modelFields", {
      'currency': {
        loaded: false
      },
      'from_account': {
        loaded: false
      }
    });
    _this.attributes = attributes;
    _this.setGetters(attributes);
    return _this;
  }
  _inherits(Trade, _BaseModel);
  return _createClass(Trade, [{
    key: "currency",
    get: function get() {
      if (!this.modelFields.currency.loaded && this.attributes['currency_id']) {
        this.attributes['currency'] = _ModelHelper["default"].getCurrencyById(this.attributes['currency_id']);
        this.modelFields.currency.loaded = true;
      }
      return this.attributes['currency'];
    },
    set: function set(x) {
      return this.attributes['currency'] = x;
    }
  }, {
    key: "from_account",
    get: function get() {
      if (!this.modelFields.from_account.loaded && this.attributes['from_account_id']) {
        this.attributes['from_account'] = _ModelHelper["default"].getUserAccountById(this.attributes['from_account_id']);
        this.modelFields.from_account.loaded = true;
      }
      return this.attributes['from_account'];
    },
    set: function set(x) {
      return this.attributes['from_account'] = x;
    }

    //TODO pass user_id for manager
  }], [{
    key: "getById",
    value: function getById(id, callback) {
      _laravelRequest.Api.get('active-trade', 'index').setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('id', id)["with"]('currency')["with"]('to_account', 'to_account.currency', 'to_account.user_account')["with"]('from_account', 'from_account.currency', 'from_account.user_account')["with"]('get_account', 'get_account.currency')["with"]('payments', 'payments.currency')["with"]('commissions', 'commissions.currency')["with"]('active', 'active.item', 'active.sell_trades', 'active.buy_trades').orderBy('trade_at', 'DESC').first(callback);
    }
  }]);
}(_BaseModel2["default"]);