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
var TransferConstants = exports["default"] = /*#__PURE__*/function () {
  function TransferConstants() {
    _classCallCheck(this, TransferConstants);
  }
  return _createClass(TransferConstants, null, [{
    key: "items",
    value: function items(actionTypeId) {
      var variants = [{
        id: TransferConstants.BETWEEN_ACCOUNTS,
        name: 'Перевод между счетами'
      }, {
        id: TransferConstants.TAX,
        name: 'Уплата налога'
      }, {
        id: TransferConstants.COMMISSION,
        name: 'Комиссия'
      }, {
        id: TransferConstants.SPENDING,
        name: 'Расход'
      }, {
        id: TransferConstants.INCOME,
        name: 'Доход'
      }, {
        id: TransferConstants.CHANGE,
        name: 'Перевод на другой счет с конвертацией'
      }, {
        id: TransferConstants.BETWEEN_ACCOUNTS_TEMP,
        name: 'Перевод между счетами'
      }, {
        id: TransferConstants.BUY_OWN_ACTIVE,
        name: 'Покупка личного актива'
      }, {
        id: TransferConstants.BUY_INVEST_ACTIVE,
        name: 'Покупка инвестиционного актива'
      }, {
        id: TransferConstants.ADD_OWN_ACTIVE,
        name: 'Привязка к личному активу'
      }, {
        id: TransferConstants.ADD_INVEST_ACTIVE,
        name: 'Привязка к инвестиционному активу'
      }, {
        id: TransferConstants.SELL_OWN_ACTIVE,
        name: 'Продажа личного актива'
      }, {
        id: TransferConstants.SELL_INVEST_ACTIVE,
        name: 'Продажа инвестиционного актива'
      }, {
        id: TransferConstants.ADD_PAYMENT,
        name: 'Привязка платежа к активу'
      }, {
        id: TransferConstants.ADD_OBLIGATION_PAYMENT,
        name: 'Привязка платежа к обязательству'
      }];
      if (actionTypeId === TransferConstants.SPENDING) {
        variants.push({
          id: TransferConstants.CONNECT_PAYMENT,
          name: 'К доходу'
        });
      } else if (actionTypeId === TransferConstants.INCOME) {
        variants.push({
          id: TransferConstants.CONNECT_PAYMENT,
          name: 'К расходу'
        });
      }
      return variants;
    }
  }, {
    key: "types",
    value: function types() {
      return [{
        id: TransferConstants.FIX,
        name: 'Фиксированная сумма'
      }, {
        id: TransferConstants.PERCENT,
        name: 'Процент от сделки'
      }];
    }

    /**
     *
     * @param id
     * @returns {*}
     */
  }, {
    key: "getTypeById",
    value: function getTypeById(id) {
      var type = null;
      TransferConstants.types().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }

    /**
     *
     * @param id
     * @returns {*}
     */
  }, {
    key: "getItemById",
    value: function getItemById(id) {
      var oldActionTypeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var type = null;
      TransferConstants.items(oldActionTypeId).map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }]);
}();
_defineProperty(TransferConstants, "BETWEEN_ACCOUNTS", 1);
_defineProperty(TransferConstants, "TAX", 2);
_defineProperty(TransferConstants, "SPENDING", 3);
_defineProperty(TransferConstants, "INCOME", 4);
_defineProperty(TransferConstants, "CHANGE", 5);
_defineProperty(TransferConstants, "BETWEEN_ACCOUNTS_TEMP", 6);
_defineProperty(TransferConstants, "BUY_OWN_ACTIVE", 7);
_defineProperty(TransferConstants, "BUY_INVEST_ACTIVE", 8);
_defineProperty(TransferConstants, "SELL_OWN_ACTIVE", 9);
_defineProperty(TransferConstants, "SELL_INVEST_ACTIVE", 10);
_defineProperty(TransferConstants, "ADD_OWN_ACTIVE", 11);
_defineProperty(TransferConstants, "ADD_INVEST_ACTIVE", 12);
_defineProperty(TransferConstants, "ADD_PAYMENT", 13);
_defineProperty(TransferConstants, "ADD_OBLIGATION_PAYMENT", 14);
_defineProperty(TransferConstants, "CONNECT_PAYMENT", 15);
_defineProperty(TransferConstants, "COMMISSION", 18);
_defineProperty(TransferConstants, "FIX", 1);
_defineProperty(TransferConstants, "PERCENT", 2);
_defineProperty(TransferConstants, "TRANSACTION", 1);
_defineProperty(TransferConstants, "BROKER", 2);
_defineProperty(TransferConstants, "OPERATION", 3);
_defineProperty(TransferConstants, "CUSTOM", 4);