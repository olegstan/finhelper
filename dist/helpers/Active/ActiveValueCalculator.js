"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment/moment"));
var _TradeCommissionConstants = _interopRequireDefault(require("./../../constants/TradeCommissionConstants"));
var _exactMath = _interopRequireDefault(require("exact-math"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ActiveValueCalculator = exports["default"] = /*#__PURE__*/function () {
  function ActiveValueCalculator() {
    _classCallCheck(this, ActiveValueCalculator);
  }
  return _createClass(ActiveValueCalculator, null, [{
    key: "calculate",
    value: function calculate(active, items) {
      // template method
    }

    /**
     *
     * @param active
     * @param trades
     * @param original
     * @return {number}
     */
  }, {
    key: "getAvgPrice",
    value: function getAvgPrice(active, trades) {
      var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var totalCost = 0;
      var totalCount = 0;
      var lotsize = 1;
      if (active.lotsize) {
        lotsize = active.lotsize;
      } else if (active.item && active.item.lotsize) {
        lotsize = active.item.lotsize;
      }
      trades.forEach(function (trade) {
        totalCost = _exactMath["default"].add(totalCost, _exactMath["default"].mul(trade.count, original ? trade.original_price : trade.price));
        totalCount = _exactMath["default"].add(totalCount, trade.count);
      });
      var avgPrice = _exactMath["default"].div(totalCost, totalCount);
      if (avgPrice === 0) {
        var count = 0;
        var sum = 0;
        trades.map(function (trade) {
          sum = _exactMath["default"].add(sum, original ? trade.original_sum : trade.sum);
          count = _exactMath["default"].add(count, trade.count);
        });
        return _exactMath["default"].div(sum, count);
      } else {
        return avgPrice;
      }
    }
  }, {
    key: "getAvgOriginalPrice",
    value: function getAvgOriginalPrice(active, trades) {
      return this.getAvgPrice(active, trades, true);
    }
  }, {
    key: "getAvgDate",
    value: function getAvgDate(active, items) {}

    /**
     *
     * @param items
     * @param original
     * @return {number}
     */
  }, {
    key: "getSum",
    value: function getSum(items) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sum = 0;
      items.map(function (trade) {
        sum += original ? trade.original_sum : trade.sum;
      });
      return sum;
    }

    /**
     *
     * @param items
     * @return {number}
     */
  }, {
    key: "getOriginalSum",
    value: function getOriginalSum(items) {
      return this.getSum(items, true);
    }

    /**
     *
     * @param item
     * @param original
     * @return {number}
     */
  }, {
    key: "getCouponBuySum",
    value: function getCouponBuySum(item) {
      var _item$buy_trades;
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sum = 0;
      if (item !== null && item !== void 0 && (_item$buy_trades = item.buy_trades) !== null && _item$buy_trades !== void 0 && _item$buy_trades.length) {
        for (var n = 0; n < item.buy_trades.length; n++) {
          sum -= original ? item.buy_trades[n].original_accumulated_coupon : item.buy_trades[n].accumulated_coupon;
        }
      }
      return sum;
    }

    /**
     *
     * @param item
     * @return {number}
     */
  }, {
    key: "getCouponSellOriginalSum",
    value: function getCouponSellOriginalSum(item) {
      return this.getCouponSellSum(item, true);
    }

    /**
     *
     * @param item
     * @returns {number}
     */
  }, {
    key: "getCouponBuyOriginalSum",
    value: function getCouponBuyOriginalSum(item) {
      return this.getCouponBuySum(item, true);
    }

    /**
     *
     * @param item
     * @param original
     * @return {number}
     */
  }, {
    key: "getCouponSellSum",
    value: function getCouponSellSum(item) {
      var _item$sell_trades;
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sum = 0;
      if ((_item$sell_trades = item.sell_trades) !== null && _item$sell_trades !== void 0 && _item$sell_trades.length) {
        for (var n = 0; n < item.sell_trades.length; n++) {
          sum += original ? item.sell_trades[n].original_accumulated_coupon : item.sell_trades[n].accumulated_coupon;
        }
      }
      return sum;
    }

    /**
     *
     * @param payments
     * @returns {number}
     */
  }, {
    key: "getPaymentsSum",
    value: function getPaymentsSum(payments) {
      var sum = 0;
      if (payments.length) {
        payments.map(function (payment) {
          sum += payment.sum;
        });
      }
      return sum;
    }

    /**
     *
     * @param item
     * @param original
     * @return {number}
     */
  }, {
    key: "getDividendSum",
    value: function getDividendSum(item) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sum = 0;
      var nowDate = (0, _moment["default"])();
      if (item.dividends && item.dividends.length) {
        item.dividends.map(function (dividend) {
          var decideDate = (0, _moment["default"])(dividend.decided_at_date, 'DD.MM.YYYY').startOf('day');
          if (item.sell_trades && item.sell_trades.length === 0) {
            item.buy_trades.map(function (trade) {
              var tradeDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY').startOf('day');
              if (tradeDate.isBefore(decideDate) && decideDate.isBefore(nowDate)) {
                sum += (original ? dividend.original_sum : dividend.sum) * trade.count;
              }
            });
          } else {
            var _item$buy_trades2, _item$sell_trades2;
            if ((_item$buy_trades2 = item.buy_trades) !== null && _item$buy_trades2 !== void 0 && _item$buy_trades2.length && (_item$sell_trades2 = item.sell_trades) !== null && _item$sell_trades2 !== void 0 && _item$sell_trades2.length) {
              var buyTrade = item.buy_trades[0];
              var sellTrade = item.sell_trades[0];
              var buyTradeDate = (0, _moment["default"])(buyTrade.trade_at_date, 'DD.MM.YYYY').startOf('day');
              var sellTradeDate = (0, _moment["default"])(sellTrade.trade_at_date, 'DD.MM.YYYY').startOf('day');
              if (buyTradeDate.isBefore(decideDate) && decideDate.isBefore(sellTradeDate)) {
                sum += (original ? dividend.original_sum : dividend.sum) * buyTrade.count;
              }
            }
          }
        });
      }
      return sum;
    }

    /**
     *
     * @param item
     * @returns {number}
     */
  }, {
    key: "getDividendOriginalSum",
    value: function getDividendOriginalSum(item) {
      return this.getDividendSum(item, true);
    }

    /**
     *
     * @param items
     * @param original
     * @return {number}
     */
  }, {
    key: "getCommissionSum",
    value: function getCommissionSum(items) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sum = 0;
      if (items.length) {
        items.map(function (item) {
          if (item.commissions && item.commissions.length) {
            item.commissions.map(function (commission) {
              switch (commission.type_id) {
                case _TradeCommissionConstants["default"].FIX:
                  sum += original ? commission.original_sum : commission.sum;
                  break;
                case _TradeCommissionConstants["default"].PERCENT:
                  sum += commission.percent / 100 * (original ? item.original_sum : item.sum);
                  break;
              }
            });
          }
        });
      }
      return sum;
    }

    /**
     *
     * @param items
     * @return {number}
     */
  }, {
    key: "getCommissionOriginalSum",
    value: function getCommissionOriginalSum(items) {
      return this.getCommissionSum(items, true);
    }
  }]);
}();