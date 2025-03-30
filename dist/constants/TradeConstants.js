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
var TradeConstants = exports["default"] = /*#__PURE__*/function () {
  function TradeConstants() {
    _classCallCheck(this, TradeConstants);
  }
  return _createClass(TradeConstants, null, [{
    key: "items",
    value:
    /**
     *
     * @returns {*[]}
     */
    function items() {
      return [{
        id: TradeConstants.BUY,
        name: 'Покупка'
      }, {
        id: TradeConstants.SELL,
        name: 'Продажа'
      }];
    }

    /**
     *
     * @returns {*[]}
     */
  }, {
    key: "actions",
    value: function actions() {
      return [{
        id: TradeConstants.LIMIT,
        name: 'Лимитная заявка'
      }, {
        id: TradeConstants.MARKET,
        name: 'Рыночная заявка'
      }];
    }

    /**
     *
     * @param id
     * @returns {{}|null}
     */
  }, {
    key: "getActionById",
    value: function getActionById(id) {
      var type = null;
      TradeConstants.actions().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }

    /**
     *
     * @param id
     * @returns {{}|null}
     */
  }, {
    key: "getItemById",
    value: function getItemById(id) {
      var type = null;
      TradeConstants.items().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }]);
}();
_defineProperty(TradeConstants, "BUY", 1);
_defineProperty(TradeConstants, "SELL", 2);
_defineProperty(TradeConstants, "LIMIT", 1);
_defineProperty(TradeConstants, "MARKET", 2);