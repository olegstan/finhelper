"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ActiveConstants = _interopRequireDefault(require("../../constants/ActiveConstants"));
var _Active = _interopRequireDefault(require("../../models/Active"));
var _AccountConstants = _interopRequireDefault(require("../../constants/AccountConstants"));
var _ActiveValuer = _interopRequireDefault(require("../Active/ActiveValuer"));
var _CurrencyConstants = _interopRequireDefault(require("../../constants/CurrencyConstants"));
var _ActiveValueCalculator = _interopRequireDefault(require("../Active/ActiveValueCalculator"));
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
var GroupHelper = /*#__PURE__*/function () {
  function GroupHelper() {
    _classCallCheck(this, GroupHelper);
  }
  return _createClass(GroupHelper, null, [{
    key: "groupByAccount",
    value:
    /**
     *
     * @param item
     * @param accountId
     * @param sortedItems
     * @param activeIndex
     * @param groupType
     * @param modelClass
     * @returns {string}
     */
    function groupByAccount(item, accountId, sortedItems, activeIndex, groupType) {
      var modelClass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Active["default"];
      var name = '';
      var subName = '';
      var account = null;
      if (groupType === _ActiveConstants["default"].BY_TYPE) {
        name = _ActiveConstants["default"].getActiveNameByType(item);
        account = _AccountConstants["default"].getAccountBySubAccountId(accountId);
        subName = account ? account.name : 'Без названия';
      } else if (groupType === _ActiveConstants["default"].BY_GROUP) {
        name = _ActiveConstants["default"].getActiveNameByGroup(item);
        account = _AccountConstants["default"].getAccountBySubAccountId(accountId);
        subName = account ? account.name : 'Без названия';
      } else if (groupType === _ActiveConstants["default"].BY_ACCOUNT) {
        account = _AccountConstants["default"].getAccountBySubAccountId(accountId);
        name = account ? account.name : 'Без названия';
        subName = _ActiveConstants["default"].getActiveNameByType(item);
      }
      var key = item.id + name + subName + 'none';
      if (activeIndex.indexOf(key) === -1) {
        activeIndex.push(key);
      }
      if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
        sortedItems[activeIndex.indexOf(key)] = modelClass.create(_objectSpread({}, item.attributes));
        sortedItems[activeIndex.indexOf(key)].attributes.trades = [];
        sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
        sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
      }
      return key;
    }

    /**
     *
     * @param actives
     * @param groupType
     * @param modelClass
     * @returns {*[]}
     */
  }, {
    key: "prepareActives",
    value: function prepareActives(actives, groupType) {
      var modelClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Active["default"];
      try {
        var sortedItems = [];
        var activeIndex = [];
        var key = '';
        actives.map(function (item) {
          if (_ActiveConstants["default"].isPackage(item.type_id)) {
            var _item$attributes, _item$attributes2, _item$attributes3, _item$attributes4;
            if (((_item$attributes = item.attributes) === null || _item$attributes === void 0 || (_item$attributes = _item$attributes.buy_trades) === null || _item$attributes === void 0 ? void 0 : _item$attributes.length) === 0 && ((_item$attributes2 = item.attributes) === null || _item$attributes2 === void 0 || (_item$attributes2 = _item$attributes2.sell_trades) === null || _item$attributes2 === void 0 ? void 0 : _item$attributes2.length) === 0 && item.type_id === _ActiveConstants["default"].FUND) {
              //тут ключ нужен чтобы показать в списке активов, если ещё нет трейдов
              key = 'fund-' + item.id;
              key = GroupHelper.groupByAccount(item, item.buy_account_id, sortedItems, activeIndex, groupType, modelClass);
              sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
              sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
            }
            (_item$attributes3 = item.attributes) === null || _item$attributes3 === void 0 || (_item$attributes3 = _item$attributes3.buy_trades) === null || _item$attributes3 === void 0 || _item$attributes3.map(function (trade) {
              key = GroupHelper.groupByAccount(item, trade.from_account_id, sortedItems, activeIndex, groupType, modelClass);
              sortedItems[activeIndex.indexOf(key)].attributes.buy_trades.push(_objectSpread({}, trade));
            });
            (_item$attributes4 = item.attributes) === null || _item$attributes4 === void 0 || (_item$attributes4 = _item$attributes4.sell_trades) === null || _item$attributes4 === void 0 || _item$attributes4.map(function (trade) {
              key = GroupHelper.groupByAccount(item, trade.from_account_id, sortedItems, activeIndex, groupType, modelClass);
              sortedItems[activeIndex.indexOf(key)].attributes.sell_trades.push(_objectSpread({}, trade));
            });
          } else {
            key = GroupHelper.groupByAccount(item, item.buy_account_id, sortedItems, activeIndex, groupType, modelClass);
          }
        });
        GroupHelper.setValuation(sortedItems);
        GroupHelper.setPaidSum(sortedItems);
        var groups = GroupHelper.group(sortedItems, groupType);

        //сортируем по оценке
        groups.map(function (group) {
          group.groups.map(function (subGroup) {
            var _subGroup$actives;
            (_subGroup$actives = subGroup.actives) === null || _subGroup$actives === void 0 || _subGroup$actives.sort(function (c1, c2) {
              var valuation1 = c1.valuation;
              var valuation2 = c2.valuation;
              return valuation1 < valuation2 ? 1 : valuation1 > valuation2 ? -1 : 0;
            });
          });
        });

        //проверить создание покупки после группировки, не улетал запрос на бек
        // let tradeIndex = [];
        // let tradeGroup = [];
        //
        // //группируем, если дата покупки одна
        // groups.map((group) => {
        //   group.groups.map((subGroup) => {
        //     subGroup.actives.map((active) => {
        //       active.buy_trades.map((trade) => {
        //         let date = moment(trade.trade_at, 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD')
        //
        //         let tradeKey = active.id + '-' + date;
        //
        //         if (tradeIndex.indexOf(tradeKey) === -1) {
        //           tradeIndex.push(tradeKey);
        //         }
        //
        //         if (typeof tradeGroup[tradeIndex.indexOf(tradeKey)] === 'undefined') {
        //           tradeGroup[tradeIndex.indexOf(tradeKey)] = [];
        //         }
        //
        //         tradeGroup[tradeIndex.indexOf(tradeKey)].push(trade);
        //
        //         trade.trades = tradeGroup[tradeIndex.indexOf(tradeKey)];
        //       })
        //     })
        //   })
        // });

        return groups;
      } catch (e) {
        console.log(e);
        return [];
      }
    }
  }, {
    key: "combineTrades",
    value: function combineTrades(mainTrade, trade) {}

    /**
     *
     * @param items
     */
  }, {
    key: "setValuation",
    value: function setValuation(items) {
      items.map(function (item) {
        var obj = _ActiveValuer["default"].getValuation(item.attributes);
        if (obj) {
          item.attributes['valuation'] = obj.sum;
        } else {
          item.attributes['valuation'] = 0;
        }
      });
    }

    /**
     *
     * @param items
     */
  }, {
    key: "setPaidSum",
    value: function setPaidSum(items) {
      items.map(function (item) {
        item.attributes['paid_sum'] = 1000000;
        // let obj = ActiveValuer.getValuation(item.attributes)
        //
        // if (obj)
        // {
        //   item.attributes['valuation'] = obj.sum;
        // } else
        // {
        //   item.attributes['valuation'] = 0;
        // }
      });
    }

    /**
     *
     * @param sortedItems
     * @param groupType
     * @return {*[]}
     */
  }, {
    key: "group",
    value: function group(sortedItems, groupType) {
      var groups = [];
      var index = [];
      var subIndex = [];
      sortedItems.map(function (item, key) {
        var name = '';
        var subName = '';
        if (groupType === _ActiveConstants["default"].BY_TYPE) {
          name = _ActiveConstants["default"].getActiveNameByType(item);
          subName = _ActiveConstants["default"].getAccountNameByActive(item);
        } else if (groupType === _ActiveConstants["default"].BY_GROUP) {
          name = _ActiveConstants["default"].getActiveNameByGroup(item);
          subName = _ActiveConstants["default"].getAccountNameByActive(item);
        } else if (groupType === _ActiveConstants["default"].BY_ACCOUNT) {
          name = _ActiveConstants["default"].getAccountNameByActive(item);
          subName = _ActiveConstants["default"].getActiveNameByType(item);
        }
        if (index.indexOf(name) === -1) {
          index.push(name);
        }
        var nameIndex = index.indexOf(name);
        if (typeof subIndex[nameIndex] === 'undefined') {
          subIndex[nameIndex] = [];
        }
        if (subIndex[nameIndex].indexOf(subName) === -1) {
          subIndex[nameIndex].push(subName);
        }
        var nameSubIndex = subIndex[nameIndex].indexOf(subName);
        if (typeof groups[nameIndex] === 'undefined') {
          groups[nameIndex] = {
            name: name,
            sum: 0,
            paid_sum: 0,
            groups: []
          };
        }
        if (typeof groups[nameIndex].groups[nameSubIndex] === 'undefined') {
          groups[nameIndex].groups[nameSubIndex] = {
            name: subName,
            sum: 0,
            paid_sum: 0,
            actives: []
          };
        }
        var paidSum = _ActiveValueCalculator["default"].getSum(item.buy_trades);
        groups[nameIndex].sum += item.valuation;
        groups[nameIndex].paid_sum += paidSum;
        groups[nameIndex].groups[nameSubIndex].sum += item.valuation;
        groups[nameIndex].groups[nameSubIndex].paid_sum += paidSum;
        groups[nameIndex].groups[nameSubIndex].actives.push(item);
      });
      return groups;
    }
  }, {
    key: "prepareAccounts",
    value: function prepareAccounts(accounts) {
      var index = [];
      var groups = [];
      accounts.filter(function (account) {
        return account.type_id === _AccountConstants["default"].BROKER_ACCOUNT && account.type_id !== _AccountConstants["default"].TEMP;
      }).map(function (account, key) {
        account.accounts.map(function (subAccount) {
          var currency = _CurrencyConstants["default"].getCurrencyById(subAccount.currency_id);
          if (index.indexOf(currency.code) === -1) {
            index.push(currency.code);
          }
          //
          if (typeof groups[index.indexOf(currency.code)] === 'undefined') {
            groups[index.indexOf(currency.code)] = {
              name: currency.code,
              sign: currency.sign,
              sum: 0
            };
          }
          groups[index.indexOf(currency.code)].sum += subAccount.sum;
        });
      });
      return groups;
    }
  }, {
    key: "prepareLogs",
    value: function prepareLogs(logs, currency) {
      var index = [];
      var indexCurrency = [];
      var pairs = [];
      var groups = [];
      groups[0] = {
        income: 0,
        outcome: 0,
        sign: currency.sign
      };
      logs.map(function (item, key) {
        try {
          var keyItem = item.item_id + item.item_type;
          if (index.indexOf(keyItem) === -1) {
            index.push(keyItem);
          }
          if (typeof pairs[index.indexOf(keyItem)] === 'undefined') {
            pairs[index.indexOf(keyItem)] = {
              income: null,
              outcome: null
            };
          }
          var _currency = _CurrencyConstants["default"].getCurrencyById(item.account.currency_id);
          if (indexCurrency.indexOf(_currency.sign) === -1) {
            indexCurrency.push(_currency.sign);
          }
          if (item.sum > 0 && item.item_type === 'transfer') {
            pairs[index.indexOf(keyItem)].income = item;
          }
          //
          if (item.sum < 0 && item.item_type === 'transfer') {
            pairs[index.indexOf(keyItem)].outcome = item;
          }
        } catch (e) {
          console.error(e);
        }
      });
      pairs.map(function (pair) {
        var _pair$income, _pair$income2;
        //деньги пришли на брокерский счёт с другого типа счёта или без счёта
        if (pair !== null && pair !== void 0 && (_pair$income = pair.income) !== null && _pair$income !== void 0 && (_pair$income = _pair$income.account) !== null && _pair$income !== void 0 && (_pair$income = _pair$income.user_account) !== null && _pair$income !== void 0 && _pair$income.type_id && pair.income.account.user_account.type_id === _AccountConstants["default"].BROKER_ACCOUNT && (pair.outcome && pair.outcome.account.user_account.type_id !== _AccountConstants["default"].BROKER_ACCOUNT || pair.outcome === null)) {
          groups[0].income += pair.income.sum;
        }

        //деньги сняты с брокерского счёта
        if ((pair !== null && pair !== void 0 && (_pair$income2 = pair.income) !== null && _pair$income2 !== void 0 && (_pair$income2 = _pair$income2.account) !== null && _pair$income2 !== void 0 && (_pair$income2 = _pair$income2.user_account) !== null && _pair$income2 !== void 0 && _pair$income2.type_id && pair.income.account.user_account.type_id !== _AccountConstants["default"].BROKER_ACCOUNT || pair.income === null) && pair.outcome && pair.outcome.account.user_account.type_id === _AccountConstants["default"].BROKER_ACCOUNT) {
          groups[0].outcome += pair.outcome.sum;
        }
      });
      return groups;
    }
  }]);
}();
var _default = exports["default"] = GroupHelper;