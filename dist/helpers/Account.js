"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AccountConstants = _interopRequireDefault(require("../constants/AccountConstants"));
var _Money = _interopRequireDefault(require("./Money"));
var _CurrencyConstants = _interopRequireDefault(require("./../constants/CurrencyConstants"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Account = exports["default"] = /*#__PURE__*/function () {
  function Account() {
    _classCallCheck(this, Account);
  }
  return _createClass(Account, null, [{
    key: "getFiltered",
    value:
    /**
     * если счет был удалён, то операция будет привязана к временному счету
     * данная функция фильтрует счета, чтобы нельзя было выбрать временный счет,
     * но показывает в качестве выбранного временный счет после удаления
     *
     * @param value
     * @param propsAccounts
     * @param types
     * @returns {Array}
     */
    function getFiltered(value, propsAccounts, types) {
      var accounts = [];
      propsAccounts.map(function (item) {
        if (types.indexOf(item.type_id) !== -1) {
          accounts.push(item);
        } else if (item.type_id === _AccountConstants["default"].TEMP) {
          item.accounts.map(function (subAccount) {
            if (subAccount.id === value) {
              var copyItem = _objectSpread({}, item);
              copyItem.accounts = [];
              copyItem.accounts.push(subAccount);
              accounts.push(copyItem);
            }
          });
        }
      });
      return accounts;
    }

    /**
     *
     * @param value
     * @param propCurrencies
     * @returns {Array}
     */
  }, {
    key: "getCurrencyFiltered",
    value: function getCurrencyFiltered(value, propCurrencies) {
      var currencies = [];
      propCurrencies.map(function (item) {
        // if(['RUB', 'USD', 'EUR'].indexOf(item.code) !== -1)
        // {
        currencies.push(item);
        // }else{
        //   if(value && value.id === item.id)
        //   {
        //     currencies.push(item);
        //   }
        // }
      });
      return currencies;
    }

    /**
     *
     * @param accounts
     * @param currency
     * @param textLength
     * @returns {Array}
     */
  }, {
    key: "prepareAccounts",
    value: function prepareAccounts(accounts, currency) {
      var textLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
      var preparedAccounts = [];
      accounts.map(function (account) {
        var name = '';
        if (currency) {
          account.accounts.map(function (subAccount) {
            if (currency.id === subAccount.currency_id) {
              name = '';
              if (subAccount.name && subAccount.name.length > textLength) {
                name = subAccount.name.substr(0, textLength - 1) + '...';
              } else {
                name = subAccount.name ? subAccount.name : 'Счёт без названия';
              }
              var foundCurrency = _CurrencyConstants["default"].getCurrencyById(subAccount.currency_id);
              preparedAccounts.push({
                id: subAccount.id,
                name: name.capitalize() + ': ' + _Money["default"].format(subAccount.sum) + ' ' + foundCurrency.sign
              });
            }
          });
        } else {
          account.accounts.map(function (subAccount) {
            name = '';
            if (subAccount.name && subAccount.name.length > textLength) {
              name = subAccount.name.substr(0, textLength - 1) + '...';
            } else {
              name = subAccount.name ? subAccount.name : 'Счёт без названия';
            }
            var foundCurrency = _CurrencyConstants["default"].getCurrencyById(subAccount.currency_id);
            preparedAccounts.push({
              id: subAccount.id,
              name: name.capitalize() + ': ' + _Money["default"].format(subAccount.sum) + ' ' + foundCurrency.sign
            });
          });
        }
      });
      return preparedAccounts;
    }
  }]);
}();