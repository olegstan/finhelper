"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Money = _interopRequireDefault(require("../helpers/Money"));
var _ModelHelper = _interopRequireDefault(require("../helpers/ModelHelper"));
var _moment = _interopRequireDefault(require("moment/moment"));
var _ActiveConstants = _interopRequireDefault(require("./ActiveConstants"));
var _CurrencyConstants = _interopRequireDefault(require("./CurrencyConstants"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var types = [1, 2, 3, 4];
if (process.env.REACT_APP_ENV === 'test') {
  // types.push(5)
}
var AccountConstants = exports["default"] = /*#__PURE__*/function () {
  function AccountConstants() {
    _classCallCheck(this, AccountConstants);
  }
  return _createClass(AccountConstants, null, [{
    key: "getBlockedSum",
    value:
    /**
     *
     * @param subAccount
     * @return {number}
     */
    function getBlockedSum(subAccount) {
      var _subAccount$blocked;
      var blockedSum = 0;
      if (subAccount !== null && subAccount !== void 0 && (_subAccount$blocked = subAccount.blocked) !== null && _subAccount$blocked !== void 0 && _subAccount$blocked.length) {
        subAccount === null || subAccount === void 0 || subAccount.blocked.map(function (blocked) {
          blockedSum += blocked.sum;
        });
      }
      return blockedSum;
    }

    /**
     *
     * @param accounts
     * @param currency
     * @param courses
     * @returns {*[]}
     */
  }, {
    key: "appendCurrencyActives",
    value: function appendCurrencyActives(accounts, currency) {
      var preparedAccounts = [];
      var index = [];
      accounts.filter(function (account) {
        return AccountConstants.BROKER_ACCOUNT === account.type_id;
      }).map(function (account) {
        account.accounts.filter(function (subAccount) {
          var code = _CurrencyConstants["default"].getCurrencyCodeById(subAccount.currency_id);
          switch (code) {
            case 'GLD':
            case 'SLV':
              return false;
          }
          return parseInt(subAccount.sum) !== 0;
        }).map(function (subAccount) {
          var _CurrencyConstants$ge;
          var date = (0, _moment["default"])();

          //объединяем все остатки по одному счету, если одна валюта, то субсчета просуммируются
          var accountId = account.id;
          var sum;
          if (!currency || currency.id === 'none') {
            sum = subAccount.sum;
          } else {
            sum = _Money["default"].convert(_Money["default"].toDigits(subAccount.sum), account.currency_id, currency.id);
          }

          // let cbCurrency = subAccount?.currency?.cb_currency;
          var cbCurrency = (_CurrencyConstants$ge = _CurrencyConstants["default"].getCurrencyById(subAccount === null || subAccount === void 0 ? void 0 : subAccount.currency_id)) === null || _CurrencyConstants$ge === void 0 ? void 0 : _CurrencyConstants$ge.cb_currency;
          var code = _CurrencyConstants["default"].getCurrencyCodeById(subAccount.currency_id);
          var name = _CurrencyConstants["default"].getCurrencyNameById(subAccount.currency_id);
          var keyName = accountId + '-' + code + '-' + (cbCurrency === null || cbCurrency === void 0 ? void 0 : cbCurrency.id);
          if (index.indexOf(keyName) === -1) {
            index.push(keyName);
            var key = index.indexOf(keyName);
            var newItem = {};
            switch (code) {
              case 'GLD':
              case 'SLV':
                // newItem = {
                //   id: subAccount.id,
                //   type_id: ActiveConstants.PRECIOUS_METAL,
                //   type_text: 'Драгоценные металлы',
                //   name_text: name,
                //   user_id: account.user_id,
                //   valuations: [],
                //   sell_trades: [],
                //   buy_trades: [
                //     {
                //       "id": null,
                //       "active_id": subAccount.id,
                //       "from_account_id": subAccount.id,
                //       "currency_id": subAccount.currency_id,
                //       "type_id": 1,
                //       "original_price": 0,
                //       "price": 0,
                //       "original_sum": sum,
                //       "sum": sum,
                //       "trade_at": date.format('DD.MM.YYYY HH:mm:ss'),
                //       "trade_at_date": date.format('DD.MM.YYYY'),
                //       "trade_at_datetime": date.format('DD.MM.YYYY HH:mm:ss'),
                //       "count": subAccount.sum,
                //       "morph": "active.trade",
                //       "sum_course": 1,
                //       "sum_rub_course": 1,
                //       "price_course": 1,
                //       "price_rub_course": 1,
                //       "currency": {
                //         "id": 1,
                //         "name": "Российский рубль",
                //         "code": "RUB",
                //         "sign": "₽",
                //         "order": 1
                //       },
                //     }
                //   ],
                //   item: cbCurrency,
                //   item_id: cbCurrency?.id,
                //   item_type: cbCurrency?.ticker,
                // }
                //
                // preparedAccounts[key] = newItem;
                break;
              default:
                newItem = {
                  id: subAccount.id,
                  type_id: _ActiveConstants["default"].CURRENCY,
                  type_text: 'Валюта',
                  group_type_text: 'Валюта',
                  name_text: name,
                  user_id: account.user_id,
                  valuations: [],
                  sell_trades: [],
                  buy_trades: [{
                    "id": null,
                    "active_id": subAccount.id,
                    "from_account_id": subAccount.id,
                    "currency_id": subAccount.currency_id,
                    "type_id": 1,
                    "original_price": 0,
                    "price": 0,
                    "original_sum": sum,
                    "sum": sum,
                    "trade_at": date.format('DD.MM.YYYY HH:mm:ss'),
                    "trade_at_date": date.format('DD.MM.YYYY'),
                    "trade_at_datetime": date.format('DD.MM.YYYY HH:mm:ss'),
                    "count": subAccount.sum,
                    "morph": "active.trade",
                    "sum_course": 1,
                    "sum_rub_course": 1,
                    "price_course": 1,
                    "price_rub_course": 1,
                    "currency": {
                      "id": 1,
                      "name": "Российский рубль",
                      "code": "RUB",
                      "sign": "₽",
                      "order": 1
                    }
                  }],
                  item: cbCurrency,
                  item_id: cbCurrency === null || cbCurrency === void 0 ? void 0 : cbCurrency.id,
                  item_type: cbCurrency === null || cbCurrency === void 0 ? void 0 : cbCurrency.ticker
                };
                preparedAccounts[key] = newItem;
                break;
            }
          } else {
            var _key = index.indexOf(keyName);
            preparedAccounts[_key]['buy_trades'][0]['original_sum'] += sum;
            preparedAccounts[_key]['buy_trades'][0]['sum'] += sum;
            preparedAccounts[_key]['buy_trades'][0]['count'] += subAccount.sum;
          }
        });
      });
      return preparedAccounts;
    }

    /**
     *
     * @param accounts
     * @param currency
     * @returns {*[]}
     */
  }, {
    key: "appendCurrencyGridActives",
    value: function appendCurrencyGridActives(accounts, currency) {
      var preparedAccounts = [];
      var index = [];
      accounts.filter(function (account) {
        return AccountConstants.BROKER_ACCOUNT === account.type_id;
      }).map(function (account) {
        account.accounts.filter(function (subAccount) {
          var code = _CurrencyConstants["default"].getCurrencyCodeById(subAccount.currency_id);
          switch (code) {
            case 'GLD':
            case 'SLV':
              return false;
          }
          return parseInt(subAccount.sum) !== 0;
        }).map(function (subAccount) {
          var _CurrencyConstants$ge2;
          var date = (0, _moment["default"])();
          var code = _CurrencyConstants["default"].getCurrencyCodeById(subAccount.currency_id);
          var sign = _CurrencyConstants["default"].getCurrencySignById(subAccount.currency_id);
          var name = _CurrencyConstants["default"].getCurrencyNameById(subAccount.currency_id);

          //объединяем все остатки по одному счету, если одна валюта, то субсчета просуммируются
          var accountId = account.id;
          var buyValuation;
          var originValuation;
          var valuation;
          var factPercent;
          var annualyPercent;
          var diff;
          var sum;
          if (currency.id === 'none') {
            sum = subAccount.sum;
            buyValuation = sum;
            originValuation = {
              sum: sum,
              sign: sign,
              code: code
            };
            diff = 0;
            factPercent = 1;
            annualyPercent = 0;
          } else {
            sum = _Money["default"].convert(_Money["default"].toDigits(subAccount.sum), currency.id, subAccount.currency_id);
            var convertedSign = _CurrencyConstants["default"].getCurrencySignById(currency.id);
            var convertedCode = _CurrencyConstants["default"].getCurrencyCodeById(currency.id);
            buyValuation = sum;
            valuation = {
              sum: sum,
              sign: convertedSign,
              code: convertedCode
            };
            originValuation = {
              sum: subAccount.sum,
              sign: sign,
              code: code
            };
            diff = 0;
            factPercent = 1;
            annualyPercent = 0;
          }

          // let cbCurrency = subAccount?.currency?.cb_currency;
          var cbCurrency = (_CurrencyConstants$ge2 = _CurrencyConstants["default"].getCurrencyById(subAccount === null || subAccount === void 0 ? void 0 : subAccount.currency_id)) === null || _CurrencyConstants$ge2 === void 0 ? void 0 : _CurrencyConstants$ge2.cb_currency;
          var keyName = accountId + '-' + code + '-' + (cbCurrency === null || cbCurrency === void 0 ? void 0 : cbCurrency.id);
          if (index.indexOf(keyName) === -1) {
            index.push(keyName);
            var key = index.indexOf(keyName);
            var newItem = {};
            switch (code) {
              case 'GLD':
              case 'SLV':
                // newItem = {
                //   id: subAccount.id,
                //   type_id: ActiveConstants.PRECIOUS_METAL,
                //   type_text: 'Драгоценные металлы',
                //   name_text: name,
                //   user_id: account.user_id,
                //   valuations: [],
                //   sell_trades: [],
                //   buy_trades: [
                //     {
                //       "id": null,
                //       "active_id": subAccount.id,
                //       "from_account_id": subAccount.id,
                //       "currency_id": subAccount.currency_id,
                //       "type_id": 1,
                //       "original_price": 0,
                //       "price": 0,
                //       "original_sum": sum,
                //       "sum": sum,
                //       "trade_at": date.format('DD.MM.YYYY HH:mm:ss'),
                //       "trade_at_date": date.format('DD.MM.YYYY'),
                //       "trade_at_datetime": date.format('DD.MM.YYYY HH:mm:ss'),
                //       "count": subAccount.sum,
                //       "morph": "active.trade",
                //       "sum_course": 1,
                //       "sum_rub_course": 1,
                //       "price_course": 1,
                //       "price_rub_course": 1,
                //       "currency": {
                //         "id": 1,
                //         "name": "Российский рубль",
                //         "code": "RUB",
                //         "sign": "₽",
                //         "order": 1
                //       },
                //     }
                //   ],
                //   item: cbCurrency,
                //   item_id: cbCurrency?.id,
                //   item_type: cbCurrency?.ticker,
                // }
                //
                // preparedAccounts[key] = newItem;
                break;
              default:
                newItem = {
                  id: subAccount.id,
                  type_id: _ActiveConstants["default"].CURRENCY,
                  type_text: 'Валюта',
                  group_type_text: 'Валюта',
                  name_text: name,
                  user_id: account.user_id,
                  valuations: [],
                  sell_trades: [],
                  buy_trades: [{
                    "id": null,
                    "active_id": subAccount.id,
                    "from_account_id": subAccount.id,
                    "currency_id": subAccount.currency_id,
                    "type_id": 1,
                    "original_price": 0,
                    "price": 0,
                    "sum": currency.id !== 'none' ? sum : subAccount.sum,
                    "original_sum": subAccount.sum,
                    "trade_at": date.format('DD.MM.YYYY HH:mm:ss'),
                    "trade_at_date": date.format('DD.MM.YYYY'),
                    "trade_at_datetime": date.format('DD.MM.YYYY HH:mm:ss'),
                    "count": subAccount.sum,
                    "morph": "active.trade",
                    "sum_course": 1,
                    "sum_rub_course": 1,
                    "price_course": 1,
                    "price_rub_course": 1,
                    "currency": {
                      "id": 1,
                      "name": "Российский рубль",
                      "code": "RUB",
                      "sign": "₽",
                      "order": 1
                    }
                  }],
                  item: cbCurrency,
                  item_id: cbCurrency === null || cbCurrency === void 0 ? void 0 : cbCurrency.id,
                  item_type: cbCurrency === null || cbCurrency === void 0 ? void 0 : cbCurrency.ticker,
                  buy_valuation: buyValuation,
                  valuation: valuation,
                  origin_valuation: originValuation,
                  fact_percent: factPercent,
                  annualy_percent: annualyPercent,
                  diff: diff
                };
                preparedAccounts[key] = newItem;
                break;
            }
          } else {
            var _key2 = index.indexOf(keyName);
            preparedAccounts[_key2]['buy_trades'][0]['original_sum'] += sum;
            preparedAccounts[_key2]['buy_trades'][0]['sum'] += sum;
            preparedAccounts[_key2]['buy_trades'][0]['count'] += subAccount.sum;
          }
        });
      });
      return preparedAccounts;
    }

    /**
     *
     * @param subAccountId
     * @param accounts
     * @return {null}
     */
  }, {
    key: "getSubAccountById",
    value: function getSubAccountById(subAccountId) {
      var accounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ModelHelper["default"].accounts;
      var account = null;
      for (var i = 0; i < accounts.length; i++) {
        for (var n = 0; n < accounts[i].accounts.length; n++) {
          if (subAccountId === accounts[i].accounts[n].id) {
            account = accounts[i].accounts[n];
          }
        }
      }
      return account;
    }

    /**
     *
     * @param subAccountId
     * @param accounts
     * @return {null}
     */
  }, {
    key: "getAccountBySubAccountId",
    value: function getAccountBySubAccountId(subAccountId) {
      var accounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ModelHelper["default"].accounts;
      if (!subAccountId || !accounts) {
        return null;
      }
      var account = null;
      for (var i = 0; i < accounts.length; i++) {
        for (var n = 0; n < accounts[i].accounts.length; n++) {
          if (subAccountId === accounts[i].accounts[n].id) {
            account = accounts[i];
          }
        }
      }
      return account;
    }
  }, {
    key: "items",
    value: function items(_items) {
      return _items.map(function (item) {
        return {
          id: item.id,
          name: AccountConstants.textByTypeWithSum(item)
        };
      });
    }
  }, {
    key: "textByTypeWithSum",
    value: function textByTypeWithSum(item) {
      var currency = _CurrencyConstants["default"].getCurrencyById(item.currency_id);
      var code = currency ? currency.code : '';
      switch (item.type_id) {
        case AccountConstants.CASH:
          return item.name + ' ' + _Money["default"].format(item.sum) + ' ' + code;
        case AccountConstants.BANK_ACCOUNT:
          return item.name + ' ' + item.number + ' - ' + _Money["default"].format(item.sum) + ' ' + code;
        case AccountConstants.DIGIT_MONEY:
          return item.name + ' ' + item.number + ' - ' + _Money["default"].format(item.sum) + ' ' + code;
        case AccountConstants.BROKER_ACCOUNT:
          return item.name + ' ' + item.number + ' - ' + _Money["default"].format(item.sum) + ' ' + code;
        case AccountConstants.TEMP:
          return item.name + ' ' + _Money["default"].format(item.sum) + ' ' + code;
      }
    }
  }, {
    key: "getText",
    value: function getText(subAccount) {
      var currency = _CurrencyConstants["default"].getCurrencyById(subAccount.currency_id);
      return (subAccount.name ? subAccount.name : 'Счёт без названия') + ': ' + _Money["default"].format(subAccount.sum) + ' ' + currency.sign;
    }
  }, {
    key: "textByType",
    value: function textByType(account) {
      switch (account.type_id) {
        case AccountConstants.CASH:
          return 'Наличные';
        case AccountConstants.BANK_ACCOUNT:
          return 'Банковский счёт ' + (account.name ? account.name.toLowerCase() : '');
        case AccountConstants.DIGIT_MONEY:
          return (account.system_name ? account.system_name : 'Пользовательский счёт') + ' ' + (account.number ? account.number : '');
        case AccountConstants.BROKER_ACCOUNT:
          return 'Брокерский счёт ' + (account.name ? account.name.toLowerCase() : '');
        case AccountConstants.TEMP:
          return 'Временный счёт ' + (account.number ? account.number : '');
      }
      return '---';
    }
  }, {
    key: "getName",
    value: function getName(subAccount) {
      return subAccount && subAccount.name ? subAccount.name : 'Счёт без названия';
    }
  }, {
    key: "getType",
    value: function getType(account) {
      switch (account.type_id) {
        case AccountConstants.CASH:
          return 'Наличные ';
        case AccountConstants.BANK_ACCOUNT:
          return 'Банковский счёт ';
        case AccountConstants.DIGIT_MONEY:
          return 'Пользовательский счёт ';
        case AccountConstants.BROKER_ACCOUNT:
          return 'Брокерский счёт ';
        case AccountConstants.TEMP:
          return 'Временный счёт ';
      }
    }
  }, {
    key: "types",
    value: function types() {
      return [{
        id: AccountConstants.CASH,
        name: 'Наличный'
      }, {
        id: AccountConstants.BANK_ACCOUNT,
        name: 'Банковский'
      }, {
        id: AccountConstants.BROKER_ACCOUNT,
        name: 'Брокерский'
      }, {
        id: AccountConstants.DIGIT_MONEY,
        name: 'Пользовательский'
      }];
    }
  }, {
    key: "getTypeById",
    value: function getTypeById(id) {
      var type = null;
      AccountConstants.types().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }, {
    key: "variants",
    value: function variants() {
      return [{
        id: AccountConstants.CURRENT,
        name: 'Текущий'
      }, {
        id: AccountConstants.DEPOSIT,
        name: 'Депозит'
      }];
    }
  }, {
    key: "getVariantById",
    value: function getVariantById(id) {
      var type = null;
      AccountConstants.TYPES.map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }, {
    key: "getSrc",
    value: function getSrc(item) {
      if (item) {
        switch (item.type_id) {
          case AccountConstants.CASH:
            return require('../assets/icons/cash.svg')["default"];
          case AccountConstants.BANK_ACCOUNT:
            switch (item.bank_id) {
              case AccountConstants.ALPHA_BANK:
                return require('../../../finclient/src/assets/banks/alfa.png');
              case AccountConstants.SBER_BANK:
                return require('../../../finclient/src/assets/banks/sber.png');
              case AccountConstants.VTB_BANK:
                return require('../../../finclient/src/assets/banks/vtb.png');
              case AccountConstants.MOSCOW_CREDIT_BANK:
                return require('../../../finclient/src/assets/banks/mkb.png');
              case AccountConstants.OTKRITIE_BANK:
                return require('../../../finclient/src/assets/banks/otkrytie.png');
              case AccountConstants.ROS_SEL_HOZ_BANK:
                return require('../../../finclient/src/assets/banks/rshb.png');
              case AccountConstants.SOVCOM_BANK:
                return require('../../../finclient/src/assets/banks/sovcom.png');
              case AccountConstants.RAIFFAIZEN_BANK:
                return require('../../../finclient/src/assets/banks/reiff.png');
              case AccountConstants.TINKOFF_BANK:
                return require('../../../finclient/src/assets/banks/tinkoff.png');
              case AccountConstants.HOME_CREDIT_BANK:
                return require('../../../finclient/src/assets/banks/home.png');
              case AccountConstants.ROS_BANK:
                return require('../../../finclient/src/assets/banks/rosbank.png');
              default:
                return require('../assets/icons/wallet.svg')["default"];
            }
          case AccountConstants.BROKER_ACCOUNT:
            switch (item.bank_id) {
              case AccountConstants.ALPHA_BROKER:
                return require('../../../finclient/src/assets/banks/alfa.png');
              case AccountConstants.SBER_BROKER:
                return require('../../../finclient/src/assets/banks/sber.png');
              case AccountConstants.VTB_BROKER:
                return require('../../../finclient/src/assets/banks/vtb.png');
              case AccountConstants.OTKRITIE_BROKER:
                return require('../../../finclient/src/assets/banks/otkrytie.png');
              case AccountConstants.TINKOFF_BROKER:
                return require('../../../finclient/src/assets/banks/tinkoff.png');
              case AccountConstants.BCS_BROKER:
                return require('../../../finclient/src/assets/banks/bks.png');
              case AccountConstants.FINAM_BROKER:
                return require('../../../finclient/src/assets/banks/finam.png');
              case AccountConstants.ATON_BROKER:
                return require('../../../finclient/src/assets/banks/aton.png');
              case AccountConstants.ALOR_BROKER:
                return require('../../../finclient/src/assets/banks/alor.png');
              case AccountConstants.FREEDOM_BROKER:
                return require('../../../finclient/src/assets/banks/fridom.png');
              default:
                return require('../assets/icons/wallet.svg')["default"];
            }
          case AccountConstants.DIGIT_MONEY:
            return require('../assets/icons/wallet.svg')["default"];
          case AccountConstants.TEMP:
            return require('../assets/icons/wallet.svg')["default"];
        }
      }
      return require('../assets/icons/cash.svg')["default"];
    }
  }, {
    key: "getImage",
    value: function getImage(item) {
      if (item) {
        switch (item.type_id) {
          case AccountConstants.CASH:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "cash",
              src: require('../assets/icons/cash.svg')["default"],
              alt: ""
            });
          case AccountConstants.BANK_ACCOUNT:
            switch (item.bank_id) {
              case AccountConstants.ALPHA_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/alfa.png'),
                  alt: ""
                });
              case AccountConstants.SBER_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/sber.png'),
                  alt: ""
                });
              case AccountConstants.VTB_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/vtb.png'),
                  alt: ""
                });
              case AccountConstants.MOSCOW_CREDIT_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/mkb.png'),
                  alt: ""
                });
              case AccountConstants.OTKRITIE_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/otkrytie.png'),
                  alt: ""
                });
              case AccountConstants.ROS_SEL_HOZ_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/rshb.png'),
                  alt: ""
                });
              case AccountConstants.SOVCOM_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/sovcom.png'),
                  alt: ""
                });
              case AccountConstants.RAIFFAIZEN_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/reiff.png'),
                  alt: ""
                });
              case AccountConstants.TINKOFF_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/tinkoff.png'),
                  alt: ""
                });
              case AccountConstants.HOME_CREDIT_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/home.png'),
                  alt: ""
                });
              case AccountConstants.ROS_BANK:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/rosbank.png'),
                  alt: ""
                });
              default:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "user",
                  src: require('../assets/icons/wallet.svg')["default"],
                  alt: ""
                });
            }
          case AccountConstants.BROKER_ACCOUNT:
            switch (item.bank_id) {
              case AccountConstants.ALPHA_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/alfa.png'),
                  alt: ""
                });
              case AccountConstants.SBER_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/sber.png'),
                  alt: ""
                });
              case AccountConstants.VTB_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/vtb.png'),
                  alt: ""
                });
              case AccountConstants.OTKRITIE_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/otkrytie.png'),
                  alt: ""
                });
              case AccountConstants.TINKOFF_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/tinkoff.png'),
                  alt: ""
                });
              case AccountConstants.BCS_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/bks.png'),
                  alt: ""
                });
              case AccountConstants.FINAM_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/finam.png'),
                  alt: ""
                });
              case AccountConstants.ATON_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/aton.png'),
                  alt: ""
                });
              case AccountConstants.ALOR_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/alor.png'),
                  alt: ""
                });
              case AccountConstants.FREEDOM_BROKER:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "bank",
                  src: require('../../../finclient/src/assets/banks/fridom.png'),
                  alt: ""
                });
              default:
                return /*#__PURE__*/_react["default"].createElement("img", {
                  className: "user",
                  src: require('../assets/icons/wallet.svg')["default"],
                  alt: ""
                });
            }
          case AccountConstants.DIGIT_MONEY:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "user",
              src: require('../assets/icons/wallet.svg')["default"],
              alt: ""
            });
          case AccountConstants.TEMP:
            return /*#__PURE__*/_react["default"].createElement("img", {
              className: "user",
              src: require('../assets/icons/wallet.svg')["default"],
              alt: ""
            });
        }
      }
    }
  }]);
}();
_defineProperty(AccountConstants, "CASH", 1);
_defineProperty(AccountConstants, "BANK_ACCOUNT", 2);
_defineProperty(AccountConstants, "DIGIT_MONEY", 3);
_defineProperty(AccountConstants, "BROKER_ACCOUNT", 4);
_defineProperty(AccountConstants, "TEMP", 5);
_defineProperty(AccountConstants, "TYPES", types);
_defineProperty(AccountConstants, "CURRENT", 1);
_defineProperty(AccountConstants, "DEPOSIT", 2);
_defineProperty(AccountConstants, "ALPHA_BANK", 1001);
_defineProperty(AccountConstants, "SBER_BANK", 1002);
_defineProperty(AccountConstants, "VTB_BANK", 1003);
_defineProperty(AccountConstants, "MOSCOW_CREDIT_BANK", 1004);
_defineProperty(AccountConstants, "OTKRITIE_BANK", 1005);
_defineProperty(AccountConstants, "ROS_SEL_HOZ_BANK", 1006);
_defineProperty(AccountConstants, "SOVCOM_BANK", 1007);
_defineProperty(AccountConstants, "RAIFFAIZEN_BANK", 1008);
_defineProperty(AccountConstants, "TINKOFF_BANK", 1009);
_defineProperty(AccountConstants, "HOME_CREDIT_BANK", 1010);
_defineProperty(AccountConstants, "ROS_BANK", 1011);
_defineProperty(AccountConstants, "CUSTOM_BANK", 2001);
_defineProperty(AccountConstants, "SBER_BROKER", 3001);
_defineProperty(AccountConstants, "VTB_BROKER", 3002);
_defineProperty(AccountConstants, "TINKOFF_BROKER", 3003);
_defineProperty(AccountConstants, "BCS_BROKER", 3004);
_defineProperty(AccountConstants, "ALPHA_BROKER", 3005);
_defineProperty(AccountConstants, "FINAM_BROKER", 3006);
_defineProperty(AccountConstants, "ATON_BROKER", 3007);
_defineProperty(AccountConstants, "ALOR_BROKER", 3008);
_defineProperty(AccountConstants, "OTKRITIE_BROKER", 3009);
_defineProperty(AccountConstants, "FREEDOM_BROKER", 3010);
_defineProperty(AccountConstants, "CUSTOM_BROKER", 4001);