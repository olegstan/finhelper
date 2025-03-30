"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment/moment"));
var _ActiveValueCalculator = _interopRequireDefault(require("./ActiveValueCalculator"));
var _ActiveConstants = _interopRequireDefault(require("./../../constants/ActiveConstants"));
var _Active = _interopRequireDefault(require("./../Active"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ActiveValuer = exports["default"] = /*#__PURE__*/function () {
  function ActiveValuer() {
    _classCallCheck(this, ActiveValuer);
  }
  return _createClass(ActiveValuer, null, [{
    key: "getDiff",
    value:
    /**
     *
     * @param item
     * @param now
     * @param sign
     * @param code
     * @param original
     * @return {{code, sign, sum: number}}
     * TODO сделать review для кеширования данных оценки
     */
    function getDiff(item, now, sign, code) {
      var original = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var buySum = this.getBuyValuation(item, original);
      var obj = this.getValuation(item, now, sign, code);
      if (obj) {
        return {
          sum: obj.sum - buySum,
          sign: sign,
          code: code
        };
      }
    }
  }, {
    key: "getDiffCurrency",
    value: function getDiffCurrency(item, now) {
      var _Active$getCodeAndSig = _Active["default"].getCodeAndSign(item),
        code = _Active$getCodeAndSig.code,
        sign = _Active$getCodeAndSig.sign;
      return this.getDiff(item, now, sign, code, true);
    }

    /**
     *
     * @param item
     * @param original
     * @return {number|*}
     */
  }, {
    key: "getBuyValuation",
    value: function getBuyValuation(item) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (item) {
        var buy_trades = item.buy_trades;
        var buy_sum = original ? item.original_buy_sum : item.buy_sum;
        if (_ActiveConstants["default"].isPackage(item.type_id)) {
          return _ActiveValueCalculator["default"].getSum(buy_trades, original) + _ActiveValueCalculator["default"].getCouponBuySum(item, original);
        } else {
          return buy_sum;
        }
      }
    }

    /**
     *
     * @param item
     * @param date
     * @param sign
     * @param code
     * @param original
     * @return {{code: string, sum: number}|{code: string, sign, sum: number}|{code: string, sign, sum: *}}
     */
  }, {
    key: "getValuation",
    value: function getValuation(item, date, sign, code) {
      var original = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      if (item) {
        var _item$valuations;
        var sell_trades = item.sell_trades,
          type_id = item.type_id,
          buy_trades = item.buy_trades,
          sell_at_datetime = item.sell_at_datetime,
          rate_type_id = item.rate_type_id,
          payments = item.payments;
        var last_valuation = null;
        if (item !== null && item !== void 0 && (_item$valuations = item.valuations) !== null && _item$valuations !== void 0 && _item$valuations.length) {
          last_valuation = item === null || item === void 0 ? void 0 : item.valuations[(item === null || item === void 0 ? void 0 : item.valuations.length) - 1];
        }
        var buy_sum = original ? item.original_buy_sum : item.buy_sum;
        var sell_sum = original ? item.original_sell_sum : item.sell_sum;
        var income = original ? item.original_income : item.income;
        var lotsize = item !== null && item !== void 0 && item.item ? item === null || item === void 0 ? void 0 : item.item.lotsize : 1;
        if (_ActiveConstants["default"].isPackage(item.type_id)) {
          //тут мы полчаем количество умноженное на лотность
          //следовательно цена покупки или оценки должна учитывать лотность
          var count = _Active["default"].getCountSum(item, buy_trades);
          if (sell_trades !== null && sell_trades !== void 0 && sell_trades.length) {
            var sum = _ActiveValueCalculator["default"].getSum(sell_trades, original) + _ActiveValueCalculator["default"].getCouponSellSum(item, original) - _ActiveValueCalculator["default"].getCommissionSum(sell_trades, original) - _ActiveValueCalculator["default"].getCommissionSum(buy_trades, original) + _ActiveValueCalculator["default"].getDividendSum(item, original);
            return {
              sum: parseFloat(sum),
              code: code,
              sign: sign
            };
          } else if (_ActiveConstants["default"].COUPON_GROUP.indexOf(type_id) !== -1 && buy_trades !== null && buy_trades !== void 0 && buy_trades.length) {
            var sellDate = (0, _moment["default"])(sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
            if (date && sellDate && sellDate.isBefore(date)) {
              var buySum = buy_sum * count + _ActiveValueCalculator["default"].getCouponSellSum(item, original); // + ActiveValueCalculator.getCouponBuySum(item);
              return {
                sum: parseFloat(buySum),
                code: code,
                sign: sign
              };
            }
          }
          if (last_valuation && last_valuation.morph === 'active.user.valuation') {
            var valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
            var _buySum = valuation * count + _ActiveValueCalculator["default"].getCouponSellSum(item, original) + _ActiveValueCalculator["default"].getDividendSum(item, original);
            return {
              sum: parseFloat(_buySum),
              code: code,
              sign: sign
            };
          }
          if (last_valuation && buy_trades !== null && buy_trades !== void 0 && buy_trades.length) {
            var lastTrade = buy_trades[(buy_trades === null || buy_trades === void 0 ? void 0 : buy_trades.length) - 1];
            var lastTradeDate = (0, _moment["default"])(lastTrade.trade_at_date, 'DD.MM.YYYY');
            var lastValuationDate = (0, _moment["default"])(last_valuation.value_at_date, 'DD.MM.YYYY');
            var _buySum2;
            if (!lastTradeDate.isValid()) {
              console.warn('not valid date', lastTrade);
            }
            if (!lastValuationDate.isValid()) {
              console.warn('not valid date', lastValuationDate);
            }
            if (lastTradeDate.isBefore(lastValuationDate)) {
              var _valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
              _buySum2 = _valuation * count + _ActiveValueCalculator["default"].getCouponSellSum(item, original) + _ActiveValueCalculator["default"].getDividendSum(item, original);
            } else {
              var _valuation2 = original ? lastTrade.original_price : lastTrade.price;
              _buySum2 = _valuation2 * count + _ActiveValueCalculator["default"].getCouponSellSum(item, original) + _ActiveValueCalculator["default"].getDividendSum(item, original);
            }
            return {
              sum: parseFloat(_buySum2),
              code: code,
              sign: sign
            };
          } else if (buy_trades !== null && buy_trades !== void 0 && buy_trades.length) {
            if ((buy_trades === null || buy_trades === void 0 ? void 0 : buy_trades.length) === 1) {
              var _lastTrade = buy_trades[(buy_trades === null || buy_trades === void 0 ? void 0 : buy_trades.length) - 1];
              var _buySum3 = original ? _lastTrade.original_sum : _lastTrade.sum;
              _buySum3 += _ActiveValueCalculator["default"].getCouponSellSum(item, original) + _ActiveValueCalculator["default"].getDividendSum(item, original);
              return {
                sum: parseFloat(_buySum3),
                code: code,
                sign: sign
              };
            }
            var lastPrice = _Active["default"].getNotNullPrice(buy_trades, original ? 'original_price' : 'price');
            var _buySum4 = lastPrice * count + _ActiveValueCalculator["default"].getCouponSellSum(item, original) + _ActiveValueCalculator["default"].getDividendSum(item, original);
            return {
              sum: parseFloat(_buySum4),
              code: code,
              sign: sign
            };
          }
        } else {
          //если актив не продан и является купонным, то нужно проверить дату, если дата погашения прошла и нет оценок, то рассчитываем оценку по номиналу
          if (_ActiveConstants["default"].DEBT_GROUP.indexOf(type_id) !== -1) {
            var _sellDate = (0, _moment["default"])(sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
            var sellSum = 0;
            switch (rate_type_id) {
              case _ActiveConstants["default"].SIMPLE:
                sellSum = _Active["default"].getConfirmedPaymentsSum(payments, original) + buy_sum;
                break;
              case _ActiveConstants["default"].DIFFERENTIAL:
                sellSum = _Active["default"].getConfirmedPaymentsSum(payments, original);
                break;
            }
            return {
              sum: parseFloat(sellSum),
              code: code,
              sign: sign
            };
          } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(type_id) !== -1) {
            if (sell_sum > 0) {
              return {
                sum: parseFloat(sell_sum),
                code: code,
                sign: sign
              };
            } else if (item.sell && item.sell.sum > 0) {
              return {
                sum: parseFloat(item.sell.sum),
                code: code,
                sign: sign
              };
            } else if (last_valuation) {
              var _valuation3 = original ? last_valuation.original_current_sum : last_valuation.current_sum;
              return {
                sum: parseFloat(_valuation3) / lotsize,
                code: code,
                sign: sign
              };
            } else {
              var addSum = 0;
              if (item.invests && item.invests.length) {
                item.invests.map(function (investAction) {
                  var invest = _objectSpread({}, investAction.child_item);
                  addSum += parseFloat(invest.sum);
                });
              }
              return {
                sum: parseFloat(buy_sum + addSum),
                code: code,
                sign: sign
              };
            }
          } else if ([_toConsumableArray(_ActiveConstants["default"].CREDIT_GROUP)].concat([_ActiveConstants["default"].CUSTOM_OBLIGATION]).indexOf(type_id) !== -1) {
            return {
              sum: parseFloat(income * 12),
              code: code,
              sign: sign
            };
          } else if (type_id === _ActiveConstants["default"].MONEY_ACTIVE) {
            return {
              sum: parseFloat(buy_sum),
              code: code,
              sign: sign
            };
          }
        }
      }
    }

    /**
     *
     * @param item
     * @param date
     * @return {{code: string, sum: number}|{code: string, sign, sum: number}|{code: string, sign, sum: *}}
     */
  }, {
    key: "getOriginalValuation",
    value: function getOriginalValuation(item, date) {
      var _Active$getCodeAndSig2 = _Active["default"].getCodeAndSign(item),
        code = _Active$getCodeAndSig2.code,
        sign = _Active$getCodeAndSig2.sign;
      return this.getValuation(item, date, sign, code, true);
    }
  }]);
}();