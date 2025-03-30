"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment/moment"));
var _ActiveConstants = _interopRequireDefault(require("../constants/ActiveConstants"));
var _laravelRequest = require("laravel-request");
var _Active = _interopRequireDefault(require("../models/Active"));
var _AccountConstants = _interopRequireDefault(require("../constants/AccountConstants"));
var _Money = _interopRequireDefault(require("./Money"));
var _CurrencyConstants = _interopRequireDefault(require("../constants/CurrencyConstants"));
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
var Active = exports["default"] = /*#__PURE__*/function () {
  function Active() {
    _classCallCheck(this, Active);
  }
  return _createClass(Active, null, [{
    key: "getName",
    value:
    /**
     *
     * @param item
     * @return {string|*|string}
     */
    function getName(item) {
      if (_ActiveConstants["default"].isPackage(item.type_id)) {
        return item.name_text ? item.name_text : 'Без названия';
      }
      if (item.type_text && item.name_text) {
        return item.type_text + ' ' + item.name_text;
      }
      if (item.type_text) {
        return item.type_text;
      }
      if (item.type_id === _ActiveConstants["default"].CUSTOM_PROPERTY) {
        return item.name;
      }
      return 'Без названия';
    }
  }, {
    key: "getGroup",
    value: function getGroup(items) {
      var stocks = [];
      items.map(function (group, key) {
        stocks[key] = {};
        stocks[key].id = group.id;
        stocks[key].name = group.name;
        stocks[key].items = [];
        group.items.map(function (item, groupKey) {
          stocks[key].items[groupKey] = _objectSpread({}, item);
          stocks[key].items[groupKey].id = item.id + '-' + item.type_id + (item.ticker ? '-' + item.ticker : '');
        });
      });
      return stocks;
    }
  }, {
    key: "getRangesByValue",
    value: function getRangesByValue(value) {
      var preparedValue = value > 100 ? Math.abs(value) : 100;
      var ranges = [];
      if (preparedValue <= 500) {
        ranges.push(0);
        ranges.push(preparedValue);
        ranges.push(preparedValue);
        ranges.push(preparedValue);
      } else if (preparedValue <= 1500) {
        ranges.push(0);
        ranges.push(500);
        ranges.push(Math.floor(preparedValue));
        ranges.push(Math.floor(preparedValue));
      } else {
        ranges.push(0);
        ranges.push(Math.floor(preparedValue / 100 * 30));
        ranges.push(Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 30));
        ranges.push(Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 40));
      }
      return ranges;
    }
  }, {
    key: "getAvgDate",
    value: function getAvgDate(trade) {
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (trade.trade_at_datetime) {
        var tradeDate = (0, _moment["default"])(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (date) {
          var diffInDays = tradeDate.diff(date, 'days');
          return date.add(diffInDays / 2, 'days');
        } else {
          return tradeDate.clone().startOf('day');
        }
      }
    }

    /**
     *
     * @param active
     * @param {Object[]} items
     * @returns {*}
     */
  }, {
    key: "getCountSum",
    value: function getCountSum(active, items) {
      var count = 0;
      var lotsize = active.item ? active.item.lotsize : 1;
      items.map(function (trade) {
        count += trade.count;
      });
      return count * lotsize;
    }

    /**
     *
     * @param active
     * @param {Object[]} items
     * @returns {*}
     */
  }, {
    key: "getCountSumWithoutLotSize",
    value: function getCountSumWithoutLotSize(active, items) {
      var count = 0;
      items.map(function (trade) {
        count += trade.count;
      });
      return count;
    }

    /**
     *
     * @param payments
     * @returns {number}
     */
  }, {
    key: "getConfirmedPaymentsSum",
    value: function getConfirmedPaymentsSum(payments) {
      var original = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sum = 0;
      if (payments !== null && payments !== void 0 && payments.length) {
        payments.map(function (payment) {
          if (payment.is_confirmed) {
            sum += original ? payment.original_sum : payment.sum;
          }
        });
      }
      return sum;
    }

    /**
     *
     * @param payments
     * @returns {number}
     */
  }, {
    key: "getConfirmedPaymentsOriginalSum",
    value: function getConfirmedPaymentsOriginalSum(payments) {
      return this.getConfirmedPaymentsSum(payments, true);
    }

    /**
     *
     * @param payments
     * @returns {number}
     */
  }, {
    key: "getPaymentsOriginalSum",
    value: function getPaymentsOriginalSum(payments) {
      var sum = 0;
      if (payments.length) {
        payments.map(function (payment) {
          sum += payment.original_sum;
        });
      }
      return sum;
    }
  }, {
    key: "getObligationCurrent",
    value: function getObligationCurrent(item, date) {
      var sum = 0;
      var futureDate = date.clone().add('12', 'months').startOf('day');
      item.payments.map(function (payment) {
        var paymentDate = (0, _moment["default"])(payment.paid_at_date, 'DD.MM.YYYY').startOf('day');
        if (payment.is_confirmed === false && paymentDate.isBefore(futureDate)) {
          sum += Math.abs(payment.sum);
        }
      });
      return {
        sum: sum,
        code: ''
      };
    }
  }, {
    key: "getObligationLongTerm",
    value: function getObligationLongTerm(item, date, birthDate) {
      var sum = 0;
      var count = 0;
      var futureDate = date.clone().add('12', 'months').startOf('day');
      item.payments.map(function (payment) {
        var paymentDate = (0, _moment["default"])(payment.paid_at_date, 'DD.MM.YYYY').startOf('day');
        if (payment.is_confirmed === false && paymentDate.isSameOrAfter(futureDate)) {
          sum += Math.abs(payment.sum);
          count++;
        }
      });
      return {
        sum: sum,
        code: ''
      };
    }
  }, {
    key: "getCodeAndSign",
    value: function getCodeAndSign(item) {
      var code = '';
      var sign = '';
      if (item !== null && item !== void 0 && item.valuations.length) {
        var lastValuation = item === null || item === void 0 ? void 0 : item.valuations[(item === null || item === void 0 ? void 0 : item.valuations.length) - 1];
        code = _CurrencyConstants["default"].getCurrencyCodeById(lastValuation.currency_id);
        sign = _CurrencyConstants["default"].getCurrencySignById(lastValuation.currency_id);
      }
      if (!code && !sign) {
        code = _CurrencyConstants["default"].getCurrencyCodeByActive(item);
        sign = _CurrencyConstants["default"].getCurrencySignByActive(item);
      }
      return {
        code: code,
        sign: sign
      };
    }

    /**
     * метод для того чтобы если были переводы на счёт, то цена внесения 0 будет, получается
     * что это будет учитываться при оценке, нужно это исключить, проверкой > 0
     * @param array
     * @param field
     * @returns {number|*}
     */
  }, {
    key: "getNotNullPrice",
    value: function getNotNullPrice(array, field) {
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i][field] > 0) {
          return array[i][field];
        }
      }
      return 0;
    }

    /**
     *
     * @param self
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
  }, {
    key: "getAccountsByDate",
    value: function getAccountsByDate(self, bindString, data, clientId) {
      var accountBanks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var date = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _moment["default"])();
      var callback = arguments.length > 6 ? arguments[6] : undefined;
      var query = _laravelRequest.Api.get('user-account', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('user_id', clientId).where('is_visible', 1)["with"]('accounts', 'accounts.currency', 'accounts.currency.cb_currency', 'accounts.blocked');
      if (accountBanks.length) {
        query.whereIn('bank_id', accountBanks);
      }
      query.all(function () {
        callback();
      }).bind(self, bindString);
    }

    /**
     *
     * @param state
     * @param accounts
     * @param currencyData
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     * @param types
     * @param courses
     */
  }, {
    key: "getBalanceByDate",
    value: function getBalanceByDate(state, accounts, currencyData, clientId) {
      var accountBanks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var date = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _moment["default"])();
      var callback = arguments.length > 6 ? arguments[6] : undefined;
      var types = arguments.length > 7 ? arguments[7] : undefined;
      var courses = arguments.length > 8 ? arguments[8] : undefined;
      state.brokerBalance = {};
      state.cashBalance = {};
      state.bankBalance = {};
      state.digitBalance = {};
      state.brokerBalance.sum = 0;
      state.cashBalance.sum = 0;
      state.bankBalance.sum = 0;
      state.digitBalance.sum = 0;
      accounts.map(function (item) {
        item.accounts.map(function (account) {
          try {
            if (account.sum > 0) {
              switch (item.type_id) {
                case _AccountConstants["default"].BROKER_ACCOUNT:
                  state.brokerBalance.sum += _Money["default"].convert(_Money["default"].toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case _AccountConstants["default"].CASH:
                  state.cashBalance.sum += _Money["default"].convert(_Money["default"].toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case _AccountConstants["default"].BANK_ACCOUNT:
                  state.bankBalance.sum += _Money["default"].convert(_Money["default"].toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case _AccountConstants["default"].DIGIT_MONEY:
                  state.digitBalance.sum += _Money["default"].convert(_Money["default"].toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
      if (typeof callback === 'function') {
        callback();
      }
    }

    /**
     *
     * @param state
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
  }, {
    key: "getActivesByDate",
    value: function getActivesByDate(state, bindString, data, clientId) {
      var accountBanks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var date = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _moment["default"])();
      var callback = arguments.length > 6 ? arguments[6] : undefined;
      var now = date.clone().format('YYYY-MM-DD HH:mm:ss');
      var before = date.clone().add('12', 'months').format('YYYY-MM-DD HH:mm:ss');
      data.user_id = clientId;
      _laravelRequest.Api.get('active', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where(function (query) {
        return query.where('type_id', _ActiveConstants["default"].OBLIGATION).whereDate('sell_at', '<=', before).whereDoesntHave('sell_trades', function (query) {
          return query.whereDate('trade_at', '<=', now);
        });
      })["with"]('buy_currency')["with"]('sell_currency')["with"]('income_currency')["with"]('buy_account')["with"]('sell_account')["with"]('income_account')["with"]('valuations') //TODO
      ["with"]('payments', 'payments.currency')["with"]('buy_trades', function (query) {
        return query["with"]('currency', 'commissions').where('trade_at', '<=', now);
      })["with"]('sell_trades', function (query) {
        return query["with"]('currency', 'commissions').where('trade_at', '<=', now);
      })["with"]('dividends').all(function (response) {
        state[bindString] = response.data;
        callback();
      });
    }

    /**
     *
     * @param state
     * @param accounts
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
  }, {
    key: "getInvestsByDate",
    value: function getInvestsByDate(state, accounts, bindString, data, clientId) {
      var accountBanks = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
      var date = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : (0, _moment["default"])();
      var callback = arguments.length > 7 ? arguments[7] : undefined;
      var now = date.clone().format('YYYY-MM-DD HH:mm:ss');
      var before = date.clone().add('12', 'months').format('YYYY-MM-DD HH:mm:ss');
      data.user_id = clientId;
      data.exchange_valuation = 1;
      data.with_convert_trade = 1;
      data.profitability = 1;
      _laravelRequest.Api.get('active', 'invest-grid-index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('type_id', '!=', _ActiveConstants["default"].CURRENCY).where(function (query) {
        return query.orWhere(function (query) {
          return query.whereIn('type_id', [_ActiveConstants["default"].DEPOSIT, _ActiveConstants["default"].DEBT, _ActiveConstants["default"].FUNDED_LIFE_INSURANCE]);
        }).orWhere(function (query) {
          query.whereIn('type_id', _ActiveConstants["default"].PACKAGE_GROUP).whereDoesntHave('sell_trades', function (query) {
            return query.whereDate('trade_at', '<=', now);
          });
          if (accountBanks.length) {
            query.whereHas('buy_trades.from_account.user_account', function (query) {
              return query.whereIn('bank_id', accountBanks);
            }).orWhereHas('buy_trades.to_account.user_account', function (query) {
              return query.whereIn('bank_id', accountBanks);
            });
          }
          return query;
        }).orWhere(function (query) {
          return query.where('group_id', _ActiveConstants["default"].INVEST).whereDate('buy_at', '<=', before).where(function (query) {
            return query.where('sell_at', '>', now).orWhereNull('sell_at').whereDoesntHave('sell');
          }).wherePropertyType(true);
        });
      }).all(function (response) {
        state[bindString] = response.data;

        // let items = AccountConstants.appendCurrencyActives(accounts, {id: CurrencyConstants.RUBBLE_ID, name: 'RUB'});
        //
        // items = items.map((item) => {
        //   if(item.type_id === ActiveConstants.CURRENCY)
        //   {
        //     item.name_text = 'Свободные денежные средства';
        //   }
        //
        //   return new ActiveModel(item);
        // })

        // state[bindString] = [...items, ...state[bindString]];

        callback();
      });
    }

    /**
     *
     * @param state
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
  }, {
    key: "getPropertiesByDate",
    value: function getPropertiesByDate(state, bindString, data, clientId) {
      var accountBanks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var date = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _moment["default"])();
      var callback = arguments.length > 6 ? arguments[6] : undefined;
      var now = date.clone().format('YYYY-MM-DD HH:mm:ss');
      data.user_id = clientId;
      _laravelRequest.Api.get('active', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('buy_at', '<=', now).where(function (query) {
        return query.where('sell_at', '>', now).orWhereNull('sell_at').whereDoesntHave('sell');
      }).where('group_id', _ActiveConstants["default"].OWN).wherePropertyType(true)["with"]('sell_trades')["with"]('valuations')["with"]('buy_currency')["with"]('sell_currency')["with"]('income_currency')["with"]('buy_account')["with"]('sell_account')["with"]('income_account').all(function (response) {
        state[bindString] = response.data;
        callback();
      });
    }

    /**
     *
     * @param state
     * @param bindString
     * @param data
     * @param clientId
     * @param date
     * @param callback
     */
  }, {
    key: "getSpendingsByDate",
    value: function getSpendingsByDate(state, bindString, data, clientId) {
      var date = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : (0, _moment["default"])();
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      data.user_id = clientId;
      _laravelRequest.Api.get('active', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('buy_at', '<=', date.format('YYYY-MM-DD HH:mm:ss')).whereSpendingType(true)["with"]('sell_trades')["with"]('valuations')["with"]('buy_currency')["with"]('sell_currency')["with"]('income_currency')["with"]('buy_account')["with"]('sell_account')["with"]('income_account')["with"]('payments').all(function (_ref) {
        var data = _ref.data;
        state[bindString] = data;
        callback();
      });
    }
  }, {
    key: "getObligationsByDate",
    value: function getObligationsByDate(state, bindString, data, clientId) {
      var accountBanks = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var date = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _moment["default"])();
      var callback = arguments.length > 6 ? arguments[6] : undefined;
      data.user_id = clientId;
      _laravelRequest.Api.get('active', 'invest-grid-index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('buy_at', '<=', date.format('YYYY-MM-DD HH:mm:ss')).whereObligationType(true)["with"]('buy_currency')["with"]('sell_currency')["with"]('income_currency')["with"]('buy_account')["with"]('sell_account')["with"]('income_account')["with"]('payments').all(function (response) {
        state[bindString] = response.data;
        callback();
      });
    }
  }, {
    key: "isRetire",
    value: function isRetire(user, year) {
      var startDate = (0, _moment["default"])(year, 'YYYY').startOf('year');
      var retiredDate = (0, _moment["default"])(user.birth_at_date, 'DD.MM.YYYY').add(user.retired_age, 'year');
      var deadDate = (0, _moment["default"])(user.birth_at_date, 'DD.MM.YYYY').add(user.retired_age, 'year').add(user.dead_age, 'year');
      if (startDate.isAfter(retiredDate) && startDate.isSameOrBefore(deadDate)) {
        return true;
      }
    }
  }]);
}();