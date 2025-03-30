"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NewActive = exports["default"] = /*#__PURE__*/function () {
  function NewActive() {
    _classCallCheck(this, NewActive);
  }
  return _createClass(NewActive, null, [{
    key: "getDiffCurrency",
    value:
    /**
     *
     * @param item
     */
    function getDiffCurrency(item) {}

    /**
     *
     * @param item
     * @return {*}
     */
  }, {
    key: "getDiff",
    value: function getDiff(item) {
      var _item$profit;
      if (item !== null && item !== void 0 && (_item$profit = item.profit) !== null && _item$profit !== void 0 && (_item$profit = _item$profit.instrument) !== null && _item$profit !== void 0 && _item$profit.stock) {
        var firstKey = Object.keys(item.profit.instrument.stock)[0];
        if (typeof item.profit.instrument.stock[firstKey] !== 'undefined') {
          return item.profit.instrument.stock[firstKey].absolute_returns;
        }
      }
    }

    /**
     *
     * @param item
     * @return {number}
     */
  }, {
    key: "getFactPercentByItem",
    value: function getFactPercentByItem(item) {
      var _item$profit2;
      if (item !== null && item !== void 0 && (_item$profit2 = item.profit) !== null && _item$profit2 !== void 0 && (_item$profit2 = _item$profit2.instrument) !== null && _item$profit2 !== void 0 && _item$profit2.stock) {
        var firstKey = Object.keys(item.profit.instrument.stock)[0];
        if (typeof item.profit.instrument.stock[firstKey] !== 'undefined') {
          return item.profit.instrument.stock[firstKey].absolute_returns / item.profit.instrument.stock[firstKey].trade_volume * 100;
        }
      }
    }

    /**
     *
     * @param item
     * @return {*}
     */
  }, {
    key: "getAnnuallyPercentByItem",
    value: function getAnnuallyPercentByItem(item) {
      var _item$profit3;
      if (item !== null && item !== void 0 && (_item$profit3 = item.profit) !== null && _item$profit3 !== void 0 && (_item$profit3 = _item$profit3.instrument) !== null && _item$profit3 !== void 0 && _item$profit3.stock) {
        var firstKey = Object.keys(item.profit.instrument.stock)[0];
        if (typeof item.profit.instrument.stock[firstKey] !== 'undefined') {
          return item.profit.instrument.stock[firstKey].yaer_rate_of_return;
        }
      }
    }
  }]);
}();