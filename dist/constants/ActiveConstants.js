"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AccountConstants = _interopRequireDefault(require("./AccountConstants"));
var _Active = _interopRequireDefault(require("../helpers/Active"));
var _CurrencyConstants = _interopRequireDefault(require("./CurrencyConstants"));
var _moment = _interopRequireDefault(require("moment/moment"));
var _ActiveConstants;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ActiveConstants = exports["default"] = /*#__PURE__*/function () {
  function ActiveConstants() {
    _classCallCheck(this, ActiveConstants);
  }
  return _createClass(ActiveConstants, null, [{
    key: "getName",
    value: function getName(item) {}
  }, {
    key: "types",
    value: function types() {
      return [{
        id: ActiveConstants.SALARY,
        name: ''
      }, {
        id: ActiveConstants.SALARY_INCOME,
        name: ''
      }, {
        id: ActiveConstants.BONUS_INCOME,
        name: ''
      }, {
        id: ActiveConstants.RETIRE_INCOME,
        name: ''
      }, {
        id: ActiveConstants.RETIRE_INCOME,
        name: ''
      }, {
        id: ActiveConstants.RENT_INCOME,
        name: ''
      }, {
        id: ActiveConstants.RELATIVES_INCOME,
        name: ''
      }, {
        id: ActiveConstants.PASSIVE_INCOME,
        name: ''
      }, {
        id: ActiveConstants.AGENT_INCOME,
        name: ''
      }, {
        id: ActiveConstants.CUSTOM_INCOME,
        name: ''
      }, {
        id: ActiveConstants.CUSTOM_SALARY,
        name: ''
      }, {
        id: ActiveConstants.FLAT,
        name: 'Недвижимость'
      }, {
        id: ActiveConstants.HOUSE,
        name: 'Недвижимость'
      }, {
        id: ActiveConstants.LAND,
        name: 'Недвижимость'
      }, {
        id: ActiveConstants.CAR,
        name: 'Техника'
      }, {
        id: ActiveConstants.MOTO,
        name: 'Техника'
      }, {
        id: ActiveConstants.TECHNIC,
        name: 'Техника'
      }, {
        id: ActiveConstants.JEWELRY,
        name: 'Ювелирные украшения'
      }, {
        id: ActiveConstants.PERSONAL_TECHNIC,
        name: 'Техника'
      }, {
        id: ActiveConstants.CUSTOM_PROPERTY,
        name: 'Имущество'
      }, {
        id: ActiveConstants.DEPOSIT,
        name: 'Депозит'
      }, {
        id: ActiveConstants.DEBT,
        name: ''
      }, {
        id: ActiveConstants.FUNDED_LIFE_INSURANCE,
        name: ''
      }, {
        id: ActiveConstants.COMMODITY,
        name: 'Товары'
      }, {
        id: ActiveConstants.PRECIOUS_METAL,
        name: 'Драгоценные металлы'
      }, {
        id: ActiveConstants.CURRENCY,
        name: 'Валюта'
      }, {
        id: ActiveConstants.CRYPTO,
        name: 'Криптовалюта'
      }, {
        id: ActiveConstants.ETF,
        name: 'ETF'
      }, {
        id: ActiveConstants.PIF,
        name: 'ПИФ'
      }, {
        id: ActiveConstants.BONUS_INCOME,
        name: 'БПИФ (биржевой ПИФ)'
      }, {
        id: ActiveConstants.HEDGE_FUND,
        name: 'Хэдж-фонды'
      }, {
        id: ActiveConstants.STOCK,
        name: 'Акции'
      }, {
        id: ActiveConstants.STRATEGY_DU,
        name: 'Стратегия ДУ (доверительное управление)'
      }, {
        id: ActiveConstants.FUTURES,
        name: 'Фьючерс'
      }, {
        id: ActiveConstants.OPTION,
        name: 'Опцион'
      }, {
        id: ActiveConstants.OBLIGATION,
        name: 'Облигации'
      }, {
        id: ActiveConstants.STRUCTURE_PRODUCT,
        name: 'Структурные продукты'
      }, {
        id: ActiveConstants.INVESTMENT_LIFE_INSURANCE,
        name: 'ИЖС'
      }, {
        id: ActiveConstants.EXCHANGE_NOTE,
        name: 'Биржевая нота'
      }, {
        id: ActiveConstants.OBLIGATION_NOTE,
        name: 'Облигационная нота'
      }, {
        id: ActiveConstants.RENT_CAR,
        name: ''
      }, {
        id: ActiveConstants.RENT_FLAT,
        name: ''
      }, {
        id: ActiveConstants.SPEND_LIFE,
        name: ''
      }, {
        id: ActiveConstants.CAR_CREDIT,
        name: 'Кредит'
      }, {
        id: ActiveConstants.FLAT_CREDIT,
        name: 'Кредит'
      }, {
        id: ActiveConstants.CREDIT,
        name: 'Кредит'
      }, {
        id: ActiveConstants.LOAN,
        name: 'Займ'
      }, {
        id: ActiveConstants.ALIMONY,
        name: 'Алименты'
      }, {
        id: ActiveConstants.CUSTOM_SPEND,
        name: ''
      }, {
        id: ActiveConstants.CUSTOM_OBLIGATION,
        name: ''
      }, {
        id: ActiveConstants.MONEY_ACTIVE,
        name: 'Деньги'
      }];
    }
  }, {
    key: "groups",
    value: function groups() {
      return [
      // {id: ActiveConstants.MONEY, name: ''},
      {
        id: ActiveConstants.OWN,
        name: 'Личный актив'
      }, {
        id: ActiveConstants.INVEST_TRADED,
        name: 'Инвестиционный финансвовый актив (торгуемый на бирже)'
      }, {
        id: ActiveConstants.INVEST,
        name: 'Инвестиционный финансвовый актив (неторгуемый на бирже)'
      }];
    }
  }, {
    key: "paymentTypes",
    value: function paymentTypes() {
      return [{
        id: ActiveConstants.ONCE,
        name: 'Разовый'
      }, {
        id: ActiveConstants.PERIOD,
        name: 'Периодичный'
      }];
    }
  }, {
    key: "getPaymentTypeById",
    value: function getPaymentTypeById(id) {
      var type = null;
      ActiveConstants.paymentTypes().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }, {
    key: "actions",
    value: function actions() {
      return [
      // {id: ActiveConstants.MONEY, name: ''},
      {
        id: ActiveConstants.BUY,
        name: 'Покупка'
      }, {
        id: ActiveConstants.GET,
        name: 'Получение или наследование'
      }];
    }
  }, {
    key: "periods",
    value: function periods() {
      return [{
        id: ActiveConstants.MONTHLY,
        name: 'Месяц'
      }, {
        id: ActiveConstants.QUARTER,
        name: 'Квартал'
      }, {
        id: ActiveConstants.HALFYEAR,
        name: 'Полгода'
      }, {
        id: ActiveConstants.YEARLY,
        name: 'Год'
      }];
    }
  }, {
    key: "fullList",
    value: function fullList() {
      return [{
        id: ActiveConstants.DAILY,
        name: 'День'
      }, {
        id: ActiveConstants.WEEKLY,
        name: 'Неделя'
      }, {
        id: ActiveConstants.MONTHLY,
        name: 'Месяц'
      }, {
        id: ActiveConstants.QUARTER,
        name: 'Квартал'
      }, {
        id: ActiveConstants.HALFYEAR,
        name: 'Полгода'
      }, {
        id: ActiveConstants.YEARLY,
        name: 'Год'
      }, {
        id: ActiveConstants.CUSTOM_PERIOD_WEEK,
        name: 'Еженедельно по определенным дням недели'
      }, {
        id: ActiveConstants.CUSTOM_PERIOD_MONTH,
        name: 'Ежемесячно по определенным дням месяца'
      }];
    }

    /**
     *
     * @param id
     * @returns {*}
     */
  }, {
    key: "getGroupById",
    value: function getGroupById(id) {
      var group = null;
      ActiveConstants.groups().map(function (item) {
        if (item.id === id) {
          group = item;
        }
      });
      return group;
    }

    /**
     *
     * @param id
     * @returns {*}
     */
  }, {
    key: "getActionById",
    value: function getActionById(id) {
      var group = null;
      ActiveConstants.actions().map(function (item) {
        if (item.id === id) {
          group = item;
        }
      });
      return group;
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
      ActiveConstants.types().map(function (item) {
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
    key: "getPeriodTypeById",
    value: function getPeriodTypeById(id) {
      var type = null;
      ActiveConstants.fullList().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }, {
    key: "getActiveCurrency",
    value: function getActiveCurrency(item) {
      if (ActiveConstants.isPackage(item.type_id)) {
        if (item.buy_currency_id) {
          var currency = _CurrencyConstants["default"].getCurrencyById(item.buy_currency_id);
          return currency ? _CurrencyConstants["default"].getCurrencyNameByCode(currency.code) : '';
        }
      }
      return '';
    }
  }, {
    key: "getBondDate",
    value: function getBondDate(item) {
      if (ActiveConstants.isPackage(item.type_id)) {
        if (item.sell_at_date) {
          var date = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
          if (date.isValid()) {
            return date.format('YYYY');
          }
        }
      }
      return 'Дата погашения не определена';
    }

    /**
     *
     * @param text
     * @return {string}
     */
  }, {
    key: "getActiveCompanyByText",
    value: function getActiveCompanyByText(text) {
      if (text) {
        text = text.toLowerCase();
        if (text.includes('газпром') || text.includes('gaz finance') || text.includes('gaz capital')) {
          return 'Газпром';
        } else if (text.includes('ржд') || text.includes('rzd capital')) {
          return 'RGD';
        } else if (text.includes('belarus') || text.includes('RZD Capital')) {
          return 'Belarus';
        } else if (text.includes('polyus') || text.includes('полюс')) {
          return 'Polyus';
        } else if (text.includes('россия')) {
          return 'Russia';
        } else if (text.includes('фосагро')) {
          return 'Fosagro';
        } else if (text.includes('dme airport')) {
          return 'Domodedovo';
        } else if (text.includes('steel funding dac') || text.includes('нлмк')) {
          return 'NLMK';
        } else if (text.includes('гмк норильский никель')) {
          return 'GMKN';
        } else {}
      }

      // var re = /active\.([0-9]+)/i;
      // if (typeof item.item_type === 'string' && item.item_type?.match(re)) {
      //   ids.push(item.item_id)
      // }

      return 'Не определено';
    }

    /**
     *
     * @param item
     * @return {string}
     */
  }, {
    key: "getActiveCompany",
    value: function getActiveCompany(item) {
      return ActiveConstants.getActiveCompanyByText(_Active["default"].getName(item));
    }

    /**
     *
     * @param item
     * @return {string|string|*}
     */
  }, {
    key: "getActiveNameByType",
    value: function getActiveNameByType(item) {
      if (item) {
        switch (item.type_id) {
          case ActiveConstants.FLAT:
          case ActiveConstants.HOUSE:
          case ActiveConstants.LAND:
          case ActiveConstants.CAR:
          case ActiveConstants.MOTO:
          case ActiveConstants.TECHNIC:
          case ActiveConstants.JEWELRY:
          case ActiveConstants.PERSONAL_TECHNIC:
          case ActiveConstants.CUSTOM_PROPERTY:
            return 'Имущество';
          case ActiveConstants.CURRENCY:
            return 'Валюта';
          case ActiveConstants.CRYPTO:
            return 'Криптовалюта';
          case ActiveConstants.STOCK:
            return 'Акции';
          case ActiveConstants.FUTURES:
            return 'Фьючерс';
          case ActiveConstants.ETF:
            return 'ETF (биржевой инвестиционный фонд)';
          case ActiveConstants.PIF:
            return 'Паевой инвестиционный фонд (ПИФ)';
          case ActiveConstants.BPIF:
            return 'БПИФ (биржевой ПИФ)';
          case ActiveConstants.HEDGE_FUND:
            return 'Хедж-фонд';
          case ActiveConstants.OBLIGATION:
            return 'Облигации';
          case ActiveConstants.STRUCTURE_PRODUCT:
            return 'Структурный продукт';
          case ActiveConstants.INVESTMENT_LIFE_INSURANCE:
            return 'ИЖС';
          case ActiveConstants.EXCHANGE_NOTE:
            return 'Биржевая нота';
          case ActiveConstants.OBLIGATION_NOTE:
            return 'Облигационная нота';
          case ActiveConstants.MONEY_ACTIVE:
            return 'Валюта';
        }
        return item.type_text;
      }
      return '';
    }

    /**
     *
     * @param item
     * @return {string|*}
     */
  }, {
    key: "getNameWithCatalog",
    value: function getNameWithCatalog(item) {
      switch (item.type_id) {
        case ActiveConstants.SALARY:
        case ActiveConstants.FLAT:
        case ActiveConstants.HOUSE:
        case ActiveConstants.LAND:
        case ActiveConstants.CAR:
        case ActiveConstants.MOTO:
        case ActiveConstants.TECHNIC:
        case ActiveConstants.JEWELRY:
        case ActiveConstants.PERSONAL_TECHNIC:
        case ActiveConstants.DEPOSIT:
        case ActiveConstants.DEBT:
        case ActiveConstants.FUNDED_LIFE_INSURANCE:
        case ActiveConstants.INVESTMENT_LIFE_INSURANCE:
        case ActiveConstants.COMMODITY:
        case ActiveConstants.CRYPTO:
        case ActiveConstants.BPIF:
        case ActiveConstants.HEDGE_FUND:
        case ActiveConstants.STRUCTURE_PRODUCT:
        case ActiveConstants.EXCHANGE_NOTE:
        case ActiveConstants.OBLIGATION_NOTE:
        case ActiveConstants.STRATEGY_DU:
        case ActiveConstants.OPTION:
        case ActiveConstants.RENT_CAR:
        case ActiveConstants.RENT_FLAT:
        case ActiveConstants.SPEND_LIFE:
        case ActiveConstants.CAR_CREDIT:
        case ActiveConstants.FLAT_CREDIT:
        case ActiveConstants.CREDIT:
        case ActiveConstants.PRODUCTS_SPEND:
        case ActiveConstants.CAFE_SPEND:
        case ActiveConstants.CAR_SPEND:
        case ActiveConstants.TRANSPORT_SPEND:
        case ActiveConstants.MEDICINE_SPEND:
        case ActiveConstants.BEAUTY_SPEND:
        case ActiveConstants.CLOTHES_ADULT_SPEND:
        case ActiveConstants.CLOTHES_CHILD_SPEND:
        case ActiveConstants.TOYS_SPEND:
        case ActiveConstants.VACATION_SPEND:
        case ActiveConstants.EDUCATION_SPEND:
        case ActiveConstants.RENT_SPEND:
        case ActiveConstants.FUN_SPEND:
        case ActiveConstants.PRESENTS_SPEND:
        case ActiveConstants.SPORT_SPEND:
        case ActiveConstants.TELECOM_SPEND:
        case ActiveConstants.SALARY_INCOME:
        case ActiveConstants.BONUS_INCOME:
        case ActiveConstants.RETIRE_INCOME:
        case ActiveConstants.RENT_INCOME:
        case ActiveConstants.RELATIVES_INCOME:
        case ActiveConstants.PASSIVE_INCOME:
        case ActiveConstants.AGENT_INCOME:
        case ActiveConstants.CUSTOM_INCOME:
        case ActiveConstants.CUSTOM_SALARY:
        case ActiveConstants.CUSTOM_PROPERTY:
        case ActiveConstants.CUSTOM_SPEND:
        case ActiveConstants.CUSTOM_OBLIGATION:
        case ActiveConstants.AUTO_INSURANCE:
        case ActiveConstants.HEALTH_INSURANCE:
        case ActiveConstants.LOSE_JOB_INSURANCE:
        case ActiveConstants.CUSTOM_INSURANCE:
        case ActiveConstants.PET_INSURANCE:
        case ActiveConstants.PROPERTY_INSURANCE:
        case ActiveConstants.RESPONSIBILITY_INSURANCE:
        case ActiveConstants.SPORT_INSURANCE:
        case ActiveConstants.TRAVEL_INSURANCE:
        case ActiveConstants.UNIT_LINKED_INSURANCE:
        case ActiveConstants.VMI_INSURANCE:
          return item.name;
        case ActiveConstants.CURRENCY:
          var relate1 = item.item;
          if (relate1) {
            return item.name + ' ' + relate1.name;
          }
          return item.name;
        case ActiveConstants.STOCK:
        case ActiveConstants.ETF:
        case ActiveConstants.OBLIGATION:
        case ActiveConstants.FUTURES:
        case ActiveConstants.PIF:
        case ActiveConstants.PRECIOUS_METAL:
          var relate2 = item.item;
          if (relate2) {
            if (relate2.ticker === ActiveConstants.MOEX_CATALOG) {
              return relate2.name + ' ' + relate2.secid + ' ' + relate2.isin;
            }
            return relate2.name + ' ' + relate2.secid;
          }
          return item.name;
      }
    }

    /**
     *
     * @param item
     * @return {*|string}
     */
  }, {
    key: "getActiveNameByGroup",
    value: function getActiveNameByGroup(item) {
      return item.group_type_text ? item.group_type_text : 'Без категории';
    }
  }, {
    key: "getAccountName",
    value: function getAccountName(account) {
      if (account) {
        if (account.name) {
          return account.name;
        }
        if (account.bank_id) {
          return account.bank_text;
        }

        //если счет временный, то у него может не быть названия
        if (account.type_id === _AccountConstants["default"].TEMP) {
          return _AccountConstants["default"].textByType(account);
        }
      }
    }

    /**
     *
     * @param item
     * @return {string|*|string}
     */
  }, {
    key: "getAccountNameByActive",
    value: function getAccountNameByActive(item) {
      if (ActiveConstants.isPackage(item.type_id)) {
        var _item$buy_trades, _item$sell_trades;
        if (item !== null && item !== void 0 && (_item$buy_trades = item.buy_trades) !== null && _item$buy_trades !== void 0 && _item$buy_trades.length) {
          if (item.buy_trades[0] && item.buy_trades[0].from_account_id) {
            var account = _AccountConstants["default"].getAccountBySubAccountId(item.buy_trades[0].from_account_id);
            return ActiveConstants.getAccountName(account);
          }
        }
        if ((_item$sell_trades = item.sell_trades) !== null && _item$sell_trades !== void 0 && _item$sell_trades.length) {
          if (item.sell_trades[0] && item.sell_trades[0].from_account_id) {
            //если это продажа валюты, то нужно менять использовать другой счёт
            if (item.type_id === ActiveConstants.CURRENCY) {
              var _account = _AccountConstants["default"].getAccountBySubAccountId(item.sell_trades[0].to_account_id);
              return ActiveConstants.getAccountName(_account);
            } else {
              var _account2 = _AccountConstants["default"].getAccountBySubAccountId(item.sell_trades[0].from_account_id);
              return ActiveConstants.getAccountName(_account2);
            }
          }
        }
      } else {
        if (item.buy_account_id) {
          var _account3 = _AccountConstants["default"].getAccountBySubAccountId(item.buy_account_id);
          var accountText = ActiveConstants.getAccountName(_account3);
          if (accountText === '') {
            var subAccount = _AccountConstants["default"].getSubAccountById(item.buy_account_id);
            if (subAccount) {
              var _subAccount$name;
              return (_subAccount$name = subAccount.name) !== null && _subAccount$name !== void 0 ? _subAccount$name : '';
            }
          }
          return accountText;
        }
      }
      return '';
    }
  }, {
    key: "getAccountIdByActive",
    value: function getAccountIdByActive(item) {
      var _item$buy_trades2;
      //TODO correct grouping
      if (item !== null && item !== void 0 && (_item$buy_trades2 = item.buy_trades) !== null && _item$buy_trades2 !== void 0 && _item$buy_trades2.length) {
        if (item.buy_trades[0] && item.buy_trades[0].from_account_id) {
          return item.buy_trades[0].from_account_id;
        }
      }
      return '';
    }
  }, {
    key: "isPackage",
    value: function isPackage(typeId) {
      switch (typeId) {
        case ActiveConstants.FLAT:
        case ActiveConstants.HOUSE:
        case ActiveConstants.LAND:
        case ActiveConstants.CAR:
        case ActiveConstants.MOTO:
        case ActiveConstants.TECHNIC:
        case ActiveConstants.JEWELRY:
        case ActiveConstants.PERSONAL_TECHNIC:
        case ActiveConstants.DEBT:
        case ActiveConstants.DEPOSIT:
        case ActiveConstants.CUSTOM_PROPERTY:
        case ActiveConstants.MONEY_ACTIVE:
          return false;
        case ActiveConstants.COMMODITY:
        case ActiveConstants.PRECIOUS_METAL:
        case ActiveConstants.CURRENCY:
        case ActiveConstants.CRYPTO:
        case ActiveConstants.ETF:
        case ActiveConstants.PIF:
        case ActiveConstants.BPIF:
        case ActiveConstants.HEDGE_FUND:
        case ActiveConstants.STOCK:
        case ActiveConstants.FUTURES:
        case ActiveConstants.OPTION:
        case ActiveConstants.STRATEGY_DU:
        case ActiveConstants.OBLIGATION:
        case ActiveConstants.STRUCTURE_PRODUCT:
        case ActiveConstants.EXCHANGE_NOTE:
        case ActiveConstants.OBLIGATION_NOTE:
        case ActiveConstants.FUND:
          return true;
      }
      return false;
    }

    /**
     *
     * @param id
     * @return {string}
     */
  }, {
    key: "getRiskName",
    value: function getRiskName(id) {
      switch (parseInt(id)) {
        case ActiveConstants.INSURANCE_RISK_STEAL:
          return 'Угон';
        case ActiveConstants.INSURANCE_RISK_FIRE:
          return 'Пожар';
        case ActiveConstants.INSURANCE_RISK_DISASTER:
          return 'Стихийный бедствия';
        case ActiveConstants.INSURANCE_RISK_TOTAL:
          return 'Тотал';
        case ActiveConstants.INSURANCE_RISK_FLOODING:
          return 'Затопление';
        case ActiveConstants.INSURANCE_RISK_ILLEGAL_ACTIONS:
          return 'Противоправные действия';
        case ActiveConstants.INSURANCE_RISK_DEATH:
          return 'Смерть';
        case ActiveConstants.INSURANCE_RISK_SURGICAL_INTERVENTION:
          return 'Хирургическое вмешательство';
        case ActiveConstants.INSURANCE_RISK_SPORT_INJURY:
          return 'Спортивная травма';
        case ActiveConstants.INSURANCE_RISK_CRITICAL_ILLNESS:
          return 'Критическое заболевание';
        case ActiveConstants.INSURANCE_RISK_HOSPITALIZATION:
          return 'Госпитализация';
        case ActiveConstants.INSURANCE_RISK_IN_PRODUCTION:
          return 'На производстве';
        case ActiveConstants.INSURANCE_RISK_TRAUMATIC_INJURY:
          return 'Травматическое повреждение';
        case ActiveConstants.INSURANCE_RISK_CRIMINAL_INJURY:
          return 'Криминальная травма';
        case ActiveConstants.INSURANCE_RISK_JOB_LOSS:
          return 'Потеря работы';
        case ActiveConstants.INSURANCE_RISK_DISABILITY:
          return 'Инвалидность';
        case ActiveConstants.INSURANCE_RISK_DOCTOR_ADVICE:
          return 'Консультации врача';
        case ActiveConstants.INSURANCE_RISK_HOSPITAL:
          return 'Стационар';
        case ActiveConstants.INSURANCE_RISK_DENTISTRY:
          return 'Стоматология';
        case ActiveConstants.INSURANCE_RISK_CLINIC_SERVICE:
          return 'Амбулаторно-поликлинические услуги';
        case ActiveConstants.INSURANCE_RISK_AMBULANCE:
          return 'Скорая помощь';
        case ActiveConstants.INSURANCE_RISK_PHARMACY:
          return 'Аптека';
        case ActiveConstants.INSURANCE_RISK_MEDICAL_TRANSPORT:
          return 'Медико-транспортные расходы';
        case ActiveConstants.INSURANCE_RISK_ACCIDENT:
          return 'Несчастный случай';
        case ActiveConstants.INSURANCE_RISK_TRIP_CANCELATION:
          return 'Отмена поездки и задержка рейса';
        case ActiveConstants.INSURANCE_RISK_ACTIVE_SPORTS:
          return 'Активные виды спорта';
        case ActiveConstants.INSURANCE_RISK_LOST_LAGGAGE:
          return 'Утрата багажа';
        case ActiveConstants.INSURANCE_RISK_CIVIL_RESPONSIBILITY:
          return 'Гражданская ответственность';
        case ActiveConstants.INSURANCE_RISK_DISABILITY_SPORTS:
          return 'Инвалидность';
        case ActiveConstants.INSURANCE_RISK_MARTIAL_ARTS:
          return 'Боевые единоборства';
        case ActiveConstants.INSURANCE_RISK_FIGURE_SKATING:
          return 'Фигурное катание';
        case ActiveConstants.INSURANCE_RISK_INJURY:
          return 'Травма';
        case ActiveConstants.INSURANCE_RISK_GAME_TEAM_SPORTS:
          return 'Игровые командные виды спорта (футбол; хоккей и т.д)';
        case ActiveConstants.INSURANCE_RISK_DANCE_SPORTS:
          return 'Спортивные танцы';
        case ActiveConstants.INSURANCE_RISK_MORTALITY:
          return 'Смертность';
        case ActiveConstants.INSURANCE_RISK_ARTISTIC_GYMNASTIC:
          return 'Художественная и спортивная гимнастика';
        case ActiveConstants.INSURANCE_RISK_EXTREME_SPORTS:
          return 'Экстремальные виды спорта  (сноуборд; горнолыжный спорт; скейтборд) и т.д.';
        case ActiveConstants.INSURANCE_RISK_RUN:
          return 'Бег';
        case ActiveConstants.INSURANCE_RISK_SWIMMING:
          return 'Плавание';
        case ActiveConstants.INSURANCE_RISK_COMPANY_LIQUIDATION:
          return 'Ликвидация предприятия';
        case ActiveConstants.INSURANCE_RISK_AGREEMENT_OF_PARTIES:
          return 'Соглашение сторон';
        case ActiveConstants.INSURANCE_RISK_CHANGE_OWNERSHIP:
          return 'Смена собственника имущества организации';
        case ActiveConstants.INSURANCE_RISK_EXTRAORDINARY_CIRCUMSTANCES:
          return 'Чрезвычайные обстоятельства; препятствующие продолжению трудовых отношений';
        case ActiveConstants.INSURANCE_RISK_DOWNSIZING_INCONSISTENCY:
          return 'Сокращение штата несоответствием занимаемой должности или выполняемой работы';
        case ActiveConstants.INSURANCE_RISK_EMPLOYERS_INITIATIVE:
          return 'Инициатива работодателя при неудовлетворительном результате прохождения испытания; установленного трудовым договором';
        case ActiveConstants.INSURANCE_RISK_DEATH_OF_EMPLOYER:
          return 'Смерть работодателя — физического лица';
        case ActiveConstants.INSURANCE_RISK_REINSTATEMENT_TO_WORK:
          return 'Восстановление на работе лица; ранее выполнявшего эту работу';
        case ActiveConstants.INSURANCE_RISK_TERMINATION_OF_ACCESS:
          return 'Прекращение допуска к государственной тайне';
        case ActiveConstants.INSURANCE_RISK_DOCTOR_ADVICE_PET:
          return 'Консультации врача';
        case ActiveConstants.INSURANCE_RISK_DIAGNOSTIC:
          return 'Диагностические исследования';
        case ActiveConstants.INSURANCE_RISK_PARAMEDIC:
          return 'Фельдшерские процедуры';
        case ActiveConstants.INSURANCE_RISK_SURGICAL:
          return 'Хирургические операции';
        case ActiveConstants.INSURANCE_RISK_MEDICATIONS:
          return 'Лекарственные препараты и другие необходимые для лечения средства';
        case ActiveConstants.INSURANCE_RISK_KEEPING_ANIMAL:
          return 'Одни сутки содержания животного в стационаре по каждому обращению в клинику';
        case ActiveConstants.INSURANCE_RISK_CAUSING_HARM_HEALTH:
          return 'Причинение вреда жизни или здоровью';
        case ActiveConstants.INSURANCE_RISK_CAUSING_PROPERTY_DAMAGE:
          return 'Причинение имущественного вреда';
        case ActiveConstants.INSURANCE_RISK_CONDUCTIONG_CASES_IN_JUDICAL:
          return 'Ведение дел по страховому случаю в судебных органах';
        case ActiveConstants.INSURANCE_RISK_EXPENSES_INCURRED:
          return 'Расходы; произведенные страхователем в целях уменьшения убытков';
      }
    }
  }]);
}();
_ActiveConstants = ActiveConstants;
_defineProperty(ActiveConstants, "TINKOFF", 1);
_defineProperty(ActiveConstants, "ZENMONEY", 2);
_defineProperty(ActiveConstants, "GOAL", 3);
_defineProperty(ActiveConstants, "STRATEGY", 4);
_defineProperty(ActiveConstants, "GOAL_RECALC", 5);
_defineProperty(ActiveConstants, "WAZZUP", 6);
_defineProperty(ActiveConstants, "MAIL", 9);
_defineProperty(ActiveConstants, "PLAN", 10);
_defineProperty(ActiveConstants, "BCS_FILE_PARSE", 12);
_defineProperty(ActiveConstants, "ACTIVE_SET_PRICE", 13);
_defineProperty(ActiveConstants, "CATALOG_COURSE", 14);
_defineProperty(ActiveConstants, "IRR", 15);
_defineProperty(ActiveConstants, "ALL_ACTIVES", 16);
_defineProperty(ActiveConstants, "REFRESH_API", 17);
_defineProperty(ActiveConstants, "ZENMONEY_RELATION_BROKER_API", 18);
_defineProperty(ActiveConstants, "STRATEGY_CACHE", 25);
_defineProperty(ActiveConstants, "TINKOFF_ORDER", 26);
_defineProperty(ActiveConstants, "RECALC_BALANCE", 27);
_defineProperty(ActiveConstants, "MOEX_HISTORY", 28);
_defineProperty(ActiveConstants, "YAHOO_HISTORY", 29);
_defineProperty(ActiveConstants, "CBOND_HISTORY", 30);
_defineProperty(ActiveConstants, "CB_HISTORY", 31);
_defineProperty(ActiveConstants, "MOEX_PROFITABILITY", 32);
_defineProperty(ActiveConstants, "TV_TICKERS", 33);
_defineProperty(ActiveConstants, "YAHOO_DATA", 34);
_defineProperty(ActiveConstants, "CBOND_PROFITABILITY", 35);
_defineProperty(ActiveConstants, "CBOND_COURSE", 36);
_defineProperty(ActiveConstants, "CBOND_SAVE", 37);
_defineProperty(ActiveConstants, "FINEX_HISTORY", 37);
_defineProperty(ActiveConstants, "MOEX_COURSE", 38);
_defineProperty(ActiveConstants, "YAHOO_COURSE", 39);
_defineProperty(ActiveConstants, "ATON_CRM_PARSE", 11);
_defineProperty(ActiveConstants, "ATON_FILE_UPLOADER", 7);
_defineProperty(ActiveConstants, "ATON_FILE_PARSE", 8);
_defineProperty(ActiveConstants, "ATON_CLIENT_CREATE", 19);
_defineProperty(ActiveConstants, "ATON_FILE_VALUATION", 20);
_defineProperty(ActiveConstants, "ATON_FILE_SPLIT", 21);
_defineProperty(ActiveConstants, "ATON_CHECK_VALUATION", 22);
_defineProperty(ActiveConstants, "ATON_FILE_HISTORY", 23);
_defineProperty(ActiveConstants, "ATON_CREATE_ACTION", 24);
_defineProperty(ActiveConstants, "ATON_PSM_VALUATION", 25);
_defineProperty(ActiveConstants, "ATON_GET_CRM_CLIENTS", 26);
_defineProperty(ActiveConstants, "ATON_PSM_PORTFOLIO", 45);
_defineProperty(ActiveConstants, "ONCE", 1);
_defineProperty(ActiveConstants, "PERIOD", 2);
_defineProperty(ActiveConstants, "SALARY", 1001);
_defineProperty(ActiveConstants, "CUSTOM_SALARY", 1004);
_defineProperty(ActiveConstants, "FLAT", 2001);
_defineProperty(ActiveConstants, "HOUSE", 2002);
_defineProperty(ActiveConstants, "LAND", 2003);
_defineProperty(ActiveConstants, "CAR", 2101);
_defineProperty(ActiveConstants, "MOTO", 2102);
_defineProperty(ActiveConstants, "TECHNIC", 2103);
_defineProperty(ActiveConstants, "JEWELRY", 2201);
_defineProperty(ActiveConstants, "PERSONAL_TECHNIC", 2202);
_defineProperty(ActiveConstants, "CUSTOM_PROPERTY", 2203);
_defineProperty(ActiveConstants, "DEPOSIT", 3001);
_defineProperty(ActiveConstants, "DEBT", 3002);
_defineProperty(ActiveConstants, "FUNDED_LIFE_INSURANCE", 3003);
_defineProperty(ActiveConstants, "COMMODITY", 3101);
_defineProperty(ActiveConstants, "CURRENCY", 3102);
_defineProperty(ActiveConstants, "CRYPTO", 3103);
_defineProperty(ActiveConstants, "ETF", 3104);
_defineProperty(ActiveConstants, "PIF", 3105);
_defineProperty(ActiveConstants, "HEDGE_FUND", 3106);
_defineProperty(ActiveConstants, "BPIF", 3107);
_defineProperty(ActiveConstants, "PRECIOUS_METAL", 3108);
_defineProperty(ActiveConstants, "STOCK", 3201);
_defineProperty(ActiveConstants, "OBLIGATION", 3202);
_defineProperty(ActiveConstants, "STRUCTURE_PRODUCT", 3203);
_defineProperty(ActiveConstants, "INVESTMENT_LIFE_INSURANCE", 3204);
_defineProperty(ActiveConstants, "EXCHANGE_NOTE", 3205);
_defineProperty(ActiveConstants, "OBLIGATION_NOTE", 3206);
_defineProperty(ActiveConstants, "STRATEGY_DU", 3207);
_defineProperty(ActiveConstants, "OPTION", 3208);
_defineProperty(ActiveConstants, "FUTURES", 3209);
_defineProperty(ActiveConstants, "FUND", 3210);
_defineProperty(ActiveConstants, "RENT_CAR", 9001);
_defineProperty(ActiveConstants, "RENT_FLAT", 9002);
_defineProperty(ActiveConstants, "SPEND_LIFE", 9003);
_defineProperty(ActiveConstants, "CUSTOM_OBLIGATION", 9005);
_defineProperty(ActiveConstants, "CAR_CREDIT", 9006);
_defineProperty(ActiveConstants, "FLAT_CREDIT", 9007);
_defineProperty(ActiveConstants, "CREDIT", 9008);
_defineProperty(ActiveConstants, "ALIMONY", 9009);
_defineProperty(ActiveConstants, "LOAN", 9010);
_defineProperty(ActiveConstants, "MONEY_ACTIVE", 10001);
_defineProperty(ActiveConstants, "PRODUCTS_SPEND", 11001);
_defineProperty(ActiveConstants, "CAFE_SPEND", 11002);
_defineProperty(ActiveConstants, "CAR_SPEND", 11003);
_defineProperty(ActiveConstants, "TRANSPORT_SPEND", 11004);
_defineProperty(ActiveConstants, "MEDICINE_SPEND", 11005);
_defineProperty(ActiveConstants, "BEAUTY_SPEND", 11006);
_defineProperty(ActiveConstants, "CLOTHES_ADULT_SPEND", 11007);
_defineProperty(ActiveConstants, "CLOTHES_CHILD_SPEND", 11008);
_defineProperty(ActiveConstants, "TOYS_SPEND", 11009);
_defineProperty(ActiveConstants, "VACATION_SPEND", 11010);
_defineProperty(ActiveConstants, "EDUCATION_SPEND", 11011);
_defineProperty(ActiveConstants, "RENT_SPEND", 11012);
_defineProperty(ActiveConstants, "FUN_SPEND", 11013);
_defineProperty(ActiveConstants, "PRESENTS_SPEND", 11014);
_defineProperty(ActiveConstants, "SPORT_SPEND", 11015);
_defineProperty(ActiveConstants, "TELECOM_SPEND", 11016);
_defineProperty(ActiveConstants, "CUSTOM_SPEND", 9004);
_defineProperty(ActiveConstants, "SALARY_INCOME", 12001);
_defineProperty(ActiveConstants, "BONUS_INCOME", 12002);
_defineProperty(ActiveConstants, "RETIRE_INCOME", 12003);
_defineProperty(ActiveConstants, "RENT_INCOME", 12004);
_defineProperty(ActiveConstants, "RELATIVES_INCOME", 12005);
_defineProperty(ActiveConstants, "PASSIVE_INCOME", 12006);
_defineProperty(ActiveConstants, "AGENT_INCOME", 12007);
_defineProperty(ActiveConstants, "CUSTOM_INCOME", 1003);
//страховки
_defineProperty(ActiveConstants, "CAR_INSURANCE", 13001);
_defineProperty(ActiveConstants, "PROPERTY_INSURANCE", 13002);
_defineProperty(ActiveConstants, "HEALTH_INSURANCE", 13003);
_defineProperty(ActiveConstants, "VMI_INSURANCE", 13004);
_defineProperty(ActiveConstants, "TRAVEL_INSURANCE", 13005);
_defineProperty(ActiveConstants, "SPORT_INSURANCE", 13006);
_defineProperty(ActiveConstants, "UNIT_LINKED_INSURANCE", 13007);
_defineProperty(ActiveConstants, "LOSE_JOB_INSURANCE", 13008);
_defineProperty(ActiveConstants, "RESPONSIBILITY_INSURANCE", 13009);
_defineProperty(ActiveConstants, "PET_INSURANCE", 13010);
_defineProperty(ActiveConstants, "CUSTOM_INSURANCE", 13011);
/**
 * groupping consts
 */
_defineProperty(ActiveConstants, "BY_TYPE", 1);
_defineProperty(ActiveConstants, "BY_GROUP", 2);
_defineProperty(ActiveConstants, "BY_ACCOUNT", 3);
_defineProperty(ActiveConstants, "BY_COMPANY", 4);
_defineProperty(ActiveConstants, "BY_NAME", 5);
_defineProperty(ActiveConstants, "BY_BOND_DATE", 6);
_defineProperty(ActiveConstants, "BY_CURRENCY", 7);
_defineProperty(ActiveConstants, "BY_BROKER_NAME", 8);
_defineProperty(ActiveConstants, "GROUP_QUERY_CATALOG", [_ActiveConstants.STOCK, _ActiveConstants.ETF, _ActiveConstants.OBLIGATION, _ActiveConstants.FUTURES, _ActiveConstants.PIF, _ActiveConstants.PRECIOUS_METAL, _ActiveConstants.CRYPTO]);
_defineProperty(ActiveConstants, "PROPERTY_GROUP", [_ActiveConstants.FLAT, _ActiveConstants.HOUSE, _ActiveConstants.LAND, _ActiveConstants.CAR, _ActiveConstants.MOTO, _ActiveConstants.TECHNIC, _ActiveConstants.JEWELRY, _ActiveConstants.PERSONAL_TECHNIC]);
_defineProperty(ActiveConstants, "INSURANCES_GROUP", [_ActiveConstants.CAR_INSURANCE, _ActiveConstants.PROPERTY_INSURANCE, _ActiveConstants.HEALTH_INSURANCE, _ActiveConstants.VMI_INSURANCE, _ActiveConstants.TRAVEL_INSURANCE, _ActiveConstants.SPORT_INSURANCE, _ActiveConstants.UNIT_LINKED_INSURANCE, _ActiveConstants.LOSE_JOB_INSURANCE, _ActiveConstants.RESPONSIBILITY_INSURANCE, _ActiveConstants.INVESTMENT_LIFE_INSURANCE, _ActiveConstants.FUNDED_LIFE_INSURANCE]);
_defineProperty(ActiveConstants, "DIVIDEND_GROUP", [_ActiveConstants.STOCK]);
_defineProperty(ActiveConstants, "COUPON_GROUP", [_ActiveConstants.OBLIGATION, _ActiveConstants.STRUCTURE_PRODUCT, _ActiveConstants.EXCHANGE_NOTE, _ActiveConstants.OBLIGATION_NOTE]);
_defineProperty(ActiveConstants, "DEBT_GROUP", [_ActiveConstants.DEBT, _ActiveConstants.DEPOSIT]);
_defineProperty(ActiveConstants, "SPENDING_GROUP", [_ActiveConstants.PRODUCTS_SPEND, _ActiveConstants.CAFE_SPEND, _ActiveConstants.CAR_SPEND, _ActiveConstants.TRANSPORT_SPEND, _ActiveConstants.MEDICINE_SPEND, _ActiveConstants.BEAUTY_SPEND, _ActiveConstants.CLOTHES_ADULT_SPEND, _ActiveConstants.CLOTHES_CHILD_SPEND, _ActiveConstants.TOYS_SPEND, _ActiveConstants.VACATION_SPEND, _ActiveConstants.EDUCATION_SPEND, _ActiveConstants.RENT_SPEND, _ActiveConstants.FUN_SPEND, _ActiveConstants.PRESENTS_SPEND, _ActiveConstants.SPORT_SPEND, _ActiveConstants.TELECOM_SPEND]);
_defineProperty(ActiveConstants, "INCOME_GROUP", [_ActiveConstants.SALARY_INCOME, _ActiveConstants.BONUS_INCOME, _ActiveConstants.RETIRE_INCOME, _ActiveConstants.RENT_INCOME, _ActiveConstants.RELATIVES_INCOME, _ActiveConstants.PASSIVE_INCOME, _ActiveConstants.AGENT_INCOME]);
_defineProperty(ActiveConstants, "CREDIT_GROUP", [_ActiveConstants.CAR_CREDIT, _ActiveConstants.FLAT_CREDIT, _ActiveConstants.CREDIT, _ActiveConstants.ALIMONY, _ActiveConstants.LOAN
// ActiveConstants.CUSTOM_OBLIGATION не должно быть тут, так как форма создания обязательств отличается
]);
_defineProperty(ActiveConstants, "OBLIGATION_GROUP", [_ActiveConstants.RENT_CAR, _ActiveConstants.RENT_FLAT, _ActiveConstants.SPEND_LIFE]);
_defineProperty(ActiveConstants, "PACKAGE_GROUP", [_ActiveConstants.COMMODITY, _ActiveConstants.PRECIOUS_METAL, _ActiveConstants.CURRENCY, _ActiveConstants.CRYPTO, _ActiveConstants.ETF, _ActiveConstants.PIF, _ActiveConstants.BPIF, _ActiveConstants.HEDGE_FUND, _ActiveConstants.STOCK, _ActiveConstants.STRATEGY_DU, _ActiveConstants.FUTURES, _ActiveConstants.OPTION, _ActiveConstants.OBLIGATION, _ActiveConstants.STRUCTURE_PRODUCT, _ActiveConstants.EXCHANGE_NOTE, _ActiveConstants.OBLIGATION_NOTE]);
_defineProperty(ActiveConstants, "CB", 1);
_defineProperty(ActiveConstants, "YAHOO_QUOTES", 2);
_defineProperty(ActiveConstants, "MOSCOW_EXCHANGE_QUOTES", 3);
/**
 * catalogs
 */
_defineProperty(ActiveConstants, "CB_CATALOG", 'catalog.1');
_defineProperty(ActiveConstants, "YAHOO_CATALOG", 'catalog.2');
_defineProperty(ActiveConstants, "MOEX_CATALOG", 'catalog.3');
_defineProperty(ActiveConstants, "CUSTOM_CATALOG", 'catalog.4');
_defineProperty(ActiveConstants, "CBONDS_CATALOG", 'catalog.5');
_defineProperty(ActiveConstants, "CATALOGS", [_ActiveConstants.CB_CATALOG, _ActiveConstants.YAHOO_CATALOG, _ActiveConstants.MOEX_CATALOG, _ActiveConstants.CUSTOM_CATALOG, _ActiveConstants.CBONDS_CATALOG]);
_defineProperty(ActiveConstants, "DAILY", 1);
_defineProperty(ActiveConstants, "WEEKLY", 2);
_defineProperty(ActiveConstants, "MONTHLY", 3);
_defineProperty(ActiveConstants, "QUARTER", 4);
_defineProperty(ActiveConstants, "HALFYEAR", 5);
_defineProperty(ActiveConstants, "YEARLY", 6);
_defineProperty(ActiveConstants, "CUSTOM_PERIOD_WEEK", 7);
_defineProperty(ActiveConstants, "CUSTOM_PERIOD_MONTH", 8);
_defineProperty(ActiveConstants, "CONDITION", 9);
_defineProperty(ActiveConstants, "SIMPLE", 1);
_defineProperty(ActiveConstants, "DIFFERENTIAL", 2);
_defineProperty(ActiveConstants, "MONEY", 1);
_defineProperty(ActiveConstants, "INVEST", 2);
_defineProperty(ActiveConstants, "INVEST_TRADED", 4);
_defineProperty(ActiveConstants, "OWN", 3);
/**
 * способ получения актива - покупка или добавление (без списания со счёта сумма за покупку)
 *
 */
_defineProperty(ActiveConstants, "BUY", 1);
_defineProperty(ActiveConstants, "GET", 2);
_defineProperty(ActiveConstants, "STOCK_GROUP_TYPE", 1001);
_defineProperty(ActiveConstants, "OBLIGATION_GROUP_TYPE", 1002);
_defineProperty(ActiveConstants, "METAL_GROUP_TYPE", 1003);
_defineProperty(ActiveConstants, "PROPERTY_GROUP_TYPE", 1004);
_defineProperty(ActiveConstants, "ALTERNATIVE_GROUP_TYPE", 1005);
_defineProperty(ActiveConstants, "DIRECT_GROUP_TYPE", 1006);
_defineProperty(ActiveConstants, "INSTRUMENT_CASH_FLOW_GROUP_TYPE", 1007);
_defineProperty(ActiveConstants, "CUSTOM_GROUP_TYPE", 2001);
_defineProperty(ActiveConstants, "CUSTOM_CLASS_TYPE", 2001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_STEAL", 1001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_FIRE", 1002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DISASTER", 1003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_TOTAL", 1004);
_defineProperty(ActiveConstants, "INSURANCE_RISK_FLOODING", 1005);
_defineProperty(ActiveConstants, "INSURANCE_RISK_ILLEGAL_ACTIONS", 1006);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DEATH", 2001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_SURGICAL_INTERVENTION", 2002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_SPORT_INJURY", 2003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CRITICAL_ILLNESS", 2004);
_defineProperty(ActiveConstants, "INSURANCE_RISK_HOSPITALIZATION", 2005);
_defineProperty(ActiveConstants, "INSURANCE_RISK_IN_PRODUCTION", 2006);
_defineProperty(ActiveConstants, "INSURANCE_RISK_TRAUMATIC_INJURY", 2007);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CRIMINAL_INJURY", 2008);
_defineProperty(ActiveConstants, "INSURANCE_RISK_JOB_LOSS", 2009);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DISABILITY", 2010);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DOCTOR_ADVICE", 3001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_HOSPITAL", 3002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DENTISTRY", 3003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CLINIC_SERVICE", 3004);
_defineProperty(ActiveConstants, "INSURANCE_RISK_AMBULANCE", 3005);
_defineProperty(ActiveConstants, "INSURANCE_RISK_PHARMACY", 3006);
_defineProperty(ActiveConstants, "INSURANCE_RISK_MEDICAL_TRANSPORT", 4001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_ACCIDENT", 4002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_TRIP_CANCELATION", 4003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_ACTIVE_SPORTS", 4004);
_defineProperty(ActiveConstants, "INSURANCE_RISK_LOST_LAGGAGE", 4005);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CIVIL_RESPONSIBILITY", 4006);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DISABILITY_SPORTS", 5001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_MARTIAL_ARTS", 5002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_FIGURE_SKATING", 5003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_INJURY", 5004);
_defineProperty(ActiveConstants, "INSURANCE_RISK_GAME_TEAM_SPORTS", 5005);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DANCE_SPORTS", 5006);
_defineProperty(ActiveConstants, "INSURANCE_RISK_MORTALITY", 5007);
_defineProperty(ActiveConstants, "INSURANCE_RISK_ARTISTIC_GYMNASTIC", 5008);
_defineProperty(ActiveConstants, "INSURANCE_RISK_EXTREME_SPORTS", 5009);
_defineProperty(ActiveConstants, "INSURANCE_RISK_RUN", 5010);
_defineProperty(ActiveConstants, "INSURANCE_RISK_SWIMMING", 5011);
_defineProperty(ActiveConstants, "INSURANCE_RISK_COMPANY_LIQUIDATION", 6001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_AGREEMENT_OF_PARTIES", 6002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CHANGE_OWNERSHIP", 6003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_EXTRAORDINARY_CIRCUMSTANCES", 6004);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DOWNSIZING_INCONSISTENCY", 6005);
_defineProperty(ActiveConstants, "INSURANCE_RISK_EMPLOYERS_INITIATIVE", 6006);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DEATH_OF_EMPLOYER", 6007);
_defineProperty(ActiveConstants, "INSURANCE_RISK_REINSTATEMENT_TO_WORK", 6008);
_defineProperty(ActiveConstants, "INSURANCE_RISK_TERMINATION_OF_ACCESS", 6009);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CAUSING_HARM_HEALTH", 7001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CAUSING_PROPERTY_DAMAGE", 7002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_CONDUCTIONG_CASES_IN_JUDICAL", 7003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_EXPENSES_INCURRED", 7004);
/** pet form **/
_defineProperty(ActiveConstants, "INSURANCE_RISK_DOCTOR_ADVICE_PET", 8001);
_defineProperty(ActiveConstants, "INSURANCE_RISK_DIAGNOSTIC", 8002);
_defineProperty(ActiveConstants, "INSURANCE_RISK_PARAMEDIC", 8003);
_defineProperty(ActiveConstants, "INSURANCE_RISK_SURGICAL", 8004);
_defineProperty(ActiveConstants, "INSURANCE_RISK_MEDICATIONS", 8005);
_defineProperty(ActiveConstants, "INSURANCE_RISK_KEEPING_ANIMAL", 8006);