"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ActiveConstants = _interopRequireDefault(require("./ActiveConstants"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CurrencyConstants = exports["default"] = /*#__PURE__*/function () {
  function CurrencyConstants() {
    _classCallCheck(this, CurrencyConstants);
  }
  return _createClass(CurrencyConstants, null, [{
    key: "getCurrencyNameById",
    value:
    /**
     *
     * @param id
     * @return {*}
     */
    function getCurrencyNameById(id) {
      var currency = CurrencyConstants.getCurrencyById(id);
      if (currency) {
        return currency.name;
      }
    }
  }, {
    key: "getCurrencyNameByCode",
    value: function getCurrencyNameByCode(code) {
      switch (code) {
        case 'USD':
          return 'Доллар США';
        case 'EUR':
          return 'Евро';
        case 'Российский рубль':
          return 'Евро';
        default:
          return code;
      }
    }

    /**
     *
     * @param id
     * @return {null}
     */
  }, {
    key: "getCurrencyById",
    value: function getCurrencyById(id) {
      var currency = null;
      CurrencyConstants.currencies.map(function (item) {
        if (item.id === id) {
          currency = item;
        }
      });
      return currency;
    }

    /**
     *
     * @param id
     * @return {*}
     */
  }, {
    key: "getCurrencySignById",
    value: function getCurrencySignById(id) {
      var currency = CurrencyConstants.getCurrencyById(id);
      if (currency) {
        if (currency.sign) {
          return currency.sign;
        } else {
          return currency.code;
        }
      }
    }

    /**
     *
     * @param id
     * @return {*}
     */
  }, {
    key: "getCurrencyCodeById",
    value: function getCurrencyCodeById(id) {
      var currency = CurrencyConstants.getCurrencyById(id);
      if (currency) {
        if (currency.code) {
          return currency.code;
        } else {
          return currency.sign;
        }
      }
    }

    /**
     *
     * @param item
     * @return {string}
     */
  }, {
    key: "getCurrencySignByActive",
    value: function getCurrencySignByActive(item) {
      var sign = '';
      if (_ActiveConstants["default"].isPackage(item.type_id)) {
        var _item$buy_trades, _item$buy_trades2, _item$sell_trades, _item$sell_trades2;
        if ((_item$buy_trades = item.buy_trades[((_item$buy_trades2 = item.buy_trades) === null || _item$buy_trades2 === void 0 ? void 0 : _item$buy_trades2.length) - 1]) !== null && _item$buy_trades !== void 0 && _item$buy_trades.currency_id) {
          var _item$buy_trades3;
          sign = CurrencyConstants.getCurrencySignById(item.buy_trades[((_item$buy_trades3 = item.buy_trades) === null || _item$buy_trades3 === void 0 ? void 0 : _item$buy_trades3.length) - 1].currency_id);
        } else if ((_item$sell_trades = item.sell_trades[((_item$sell_trades2 = item.sell_trades) === null || _item$sell_trades2 === void 0 ? void 0 : _item$sell_trades2.length) - 1]) !== null && _item$sell_trades !== void 0 && _item$sell_trades.currency_id) {
          var _item$sell_trades3;
          sign = CurrencyConstants.getCurrencySignById(item.sell_trades[((_item$sell_trades3 = item.sell_trades) === null || _item$sell_trades3 === void 0 ? void 0 : _item$sell_trades3.length) - 1].currency_id);
        }
      } else {
        var _item$invests, _item$invests2, _item$invests3;
        if (item.buy_currency_id) {
          sign = CurrencyConstants.getCurrencySignById(item.buy_currency_id);
        } else if (item.sell && item.sell.currency_id) {
          sign = CurrencyConstants.getCurrencySignById(item.sell.currency_id);
        } else if (item.invests && (_item$invests = item.invests) !== null && _item$invests !== void 0 && _item$invests.length && (_item$invests2 = item.invests[((_item$invests3 = item.invests) === null || _item$invests3 === void 0 ? void 0 : _item$invests3.length) - 1]) !== null && _item$invests2 !== void 0 && _item$invests2.child_item) {
          var _item$invests4;
          var lastInvest = _objectSpread({}, item.invests[((_item$invests4 = item.invests) === null || _item$invests4 === void 0 ? void 0 : _item$invests4.length) - 1].child_item);
          sign = CurrencyConstants.getCurrencySignById(lastInvest.currency_id);
        }
      }
      return sign;
    }

    /**
     *
     * @param item
     * @return {string}
     */
  }, {
    key: "getCurrencyCodeByActive",
    value: function getCurrencyCodeByActive(item) {
      var code = '';
      if (_ActiveConstants["default"].isPackage(item.type_id)) {
        var _item$buy_trades4, _item$buy_trades5, _item$sell_trades4, _item$sell_trades5;
        if ((_item$buy_trades4 = item.buy_trades[((_item$buy_trades5 = item.buy_trades) === null || _item$buy_trades5 === void 0 ? void 0 : _item$buy_trades5.length) - 1]) !== null && _item$buy_trades4 !== void 0 && _item$buy_trades4.currency_id) {
          var _item$buy_trades6;
          code = CurrencyConstants.getCurrencyCodeById(item.buy_trades[((_item$buy_trades6 = item.buy_trades) === null || _item$buy_trades6 === void 0 ? void 0 : _item$buy_trades6.length) - 1].currency_id);
        } else if ((_item$sell_trades4 = item.sell_trades[((_item$sell_trades5 = item.sell_trades) === null || _item$sell_trades5 === void 0 ? void 0 : _item$sell_trades5.length) - 1]) !== null && _item$sell_trades4 !== void 0 && _item$sell_trades4.currency_id) {
          var _item$sell_trades6;
          code = CurrencyConstants.getCurrencyCodeById(item.sell_trades[((_item$sell_trades6 = item.sell_trades) === null || _item$sell_trades6 === void 0 ? void 0 : _item$sell_trades6.length) - 1].currency_id);
        }
      } else {
        var _item$invests5, _item$invests6, _item$invests7;
        if (item.buy_currency_id) {
          code = CurrencyConstants.getCurrencyCodeById(item.buy_currency_id);
        } else if (item.sell && item.sell.currency_id) {
          code = CurrencyConstants.getCurrencyCodeById(item.sell.currency_id);
        } else if (item.invests && (_item$invests5 = item.invests) !== null && _item$invests5 !== void 0 && _item$invests5.length && (_item$invests6 = item.invests[((_item$invests7 = item.invests) === null || _item$invests7 === void 0 ? void 0 : _item$invests7.length) - 1]) !== null && _item$invests6 !== void 0 && _item$invests6.child_item) {
          var _item$invests8;
          var lastInvest = _objectSpread({}, item.invests[((_item$invests8 = item.invests) === null || _item$invests8 === void 0 ? void 0 : _item$invests8.length) - 1].child_item);
          code = CurrencyConstants.getCurrencyCodeById(lastInvest.currency_id);
        }
      }
      return code;
    }
  }]);
}();
_defineProperty(CurrencyConstants, "RUBBLE_ID", 1);
_defineProperty(CurrencyConstants, "DOLLAR_ID", 12);
_defineProperty(CurrencyConstants, "EURO_ID", 13);
_defineProperty(CurrencyConstants, "RUBBLE_SIGN", '₽');
_defineProperty(CurrencyConstants, "DOLLAR_SIGN", '$');
_defineProperty(CurrencyConstants, "DEFAULT_CODES", ['RUB', 'USD', 'EUR']);
/**
 *
 * @type {[]}
 */
_defineProperty(CurrencyConstants, "currencies", []);
/**
 *
 * @type {[]}
 */
_defineProperty(CurrencyConstants, "courses", []);