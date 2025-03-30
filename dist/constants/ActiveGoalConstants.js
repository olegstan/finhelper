"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment/moment"));
var _DateHelper = _interopRequireDefault(require("../helpers/DateHelper"));
var _Money = _interopRequireDefault(require("../helpers/Money"));
var _exactMath = _interopRequireDefault(require("exact-math"));
var _ActiveGoalConstants;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ActiveGoalConstants = exports["default"] = /*#__PURE__*/function () {
  function ActiveGoalConstants() {
    _classCallCheck(this, ActiveGoalConstants);
  }
  return _createClass(ActiveGoalConstants, null, [{
    key: "getTypes",
    value: function getTypes() {
      var i18n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return [{
        id: ActiveGoalConstants.SHORT,
        name: i18n.shortGoal
      }, {
        id: ActiveGoalConstants.MIDDLE,
        name: i18n.middleGoal
      }, {
        id: ActiveGoalConstants.LONG,
        name: i18n.longGoal
      }, {
        id: ActiveGoalConstants.RETIRE,
        name: i18n.retire
      }
      // {id: ActiveGoalConstants.PORTFOLIO, name: 'Портфель'}
      ];
    }
  }, {
    key: "getScenarios",
    value: function getScenarios() {
      var i18n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return [{
        id: 1,
        name: i18n.positive
      }, {
        id: 2,
        name: i18n.neutral
      }, {
        id: 3,
        name: i18n.negative
      }, {
        id: 4,
        name: i18n.middle
      }];
    }
  }, {
    key: "getRetireTypes",
    value: function getRetireTypes() {
      var i18n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return [{
        id: 1,
        name: i18n.rentier
      }, {
        id: 2,
        name: i18n.rentierWithInflation
      }, {
        id: 3,
        name: i18n.retireFund
      }];
    }
  }, {
    key: "getConsiderTypes",
    value: function getConsiderTypes() {
      var i18n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return [{
        id: 1,
        name: i18n.control
      }, {
        id: 2,
        name: i18n.notControl
      }];
    }
  }, {
    key: "getPlanTypes",
    value: function getPlanTypes() {
      return [{
        id: ActiveGoalConstants.WITH_PLAN,
        name: ''
      }, {
        id: ActiveGoalConstants.WITHOUT_PLAN,
        name: ''
      }];
    }
  }, {
    key: "getCalcTypes",
    value: function getCalcTypes() {
      return [{
        id: 1,
        name: 'Знаю итоговую сумму'
      }, {
        id: 2,
        name: 'Знаю сумму платежа'
      }];
    }
  }, {
    key: "getPeriods",
    value: function getPeriods() {
      return [{
        id: ActiveGoalConstants.NOW,
        name: 'Сейчас'
      }, {
        id: ActiveGoalConstants.AFTER,
        name: 'Через месяц'
      }];
    }
  }, {
    key: "getBindTypes",
    value: function getBindTypes() {
      var i18n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return [{
        id: 1,
        name: i18n.withBind
      }, {
        id: 2,
        name: i18n.withoutBind
      }];
    }
  }, {
    key: "getTypeById",
    value: function getTypeById(id) {
      var type = null;
      ActiveGoalConstants.getTypes().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }, {
    key: "getPlanTypeById",
    value: function getPlanTypeById(id) {
      var type = null;
      ActiveGoalConstants.getPlanTypes().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }, {
    key: "getCalcTypeById",
    value: function getCalcTypeById(id) {
      var type = null;
      ActiveGoalConstants.getCalcTypes().map(function (item) {
        if (item.id === id) {
          type = item;
        }
      });
      return type;
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear(year) {
      if (year % 4 === 0) {
        if (year % 100 === 0) {
          return year % 400 === 0;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }, {
    key: "getNextNonLeapYear",
    value: function getNextNonLeapYear(startYear) {
      var year = startYear;
      while (this.isLeapYear(year)) {
        year++;
      }
      return year;
    }

    /**
     *
     * @param income
     * @return {*[]}
     */
  }, {
    key: "defaultMask",
    value: function defaultMask(income) {
      var data = [];
      var newIncome = 0;
      var currentYear = (0, _moment["default"])().year();
      if (this.isLeapYear(currentYear)) {
        currentYear = this.getNextNonLeapYear(currentYear);
      }
      for (var i = 0; i < 12; i++) {
        var validDay = _DateHelper["default"].getValidDate(currentYear, i + 1, 31);
        var sum = 0;

        //если последнии, то вычтем из суммы, чтобы получилось целое число
        if (i === 11) {
          sum = income - newIncome;
        } else {
          sum = Math.floor(income / 12);
          newIncome += sum;
        }
        data[i] = {
          month: 1,
          sum: sum,
          rows: [{
            day: validDay,
            sum: sum
          }]
        };
      }
      return data;
    }
  }, {
    key: "defaultPlan",
    value: function defaultPlan() {
      return [];
    }
  }, {
    key: "recalcByPrevIncome",
    value: function recalcByPrevIncome(item, prevPlanIncome, newPlanIncome) {
      //лучше чтобы сумма была больше 12, тогда распределение по месяцам будет корректно,
      //иначе на последний месяц будет переноситься остаток, а 11 месяцев будут по 0
      //следующее пропорциональное распределение в этом случае сделает
      // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ,1, 8] если сумма 21, не пропорционально

      if (newPlanIncome >= 12) {
        var proportion = Math.floor(newPlanIncome / prevPlanIncome * 100000000) / 100000000;
        var allSum = 0;
        var i = 0;
        var n = 0;
        item.months.map(function (month, monthKey) {
          if (parseInt(month.month) && month.rows && month.rows.length) {
            month.rows.map(function () {
              i++;
            });
          }
        });
        item.months = item.months.map(function (month) {
          var sum = 0;
          if (parseInt(month.month) && month.rows && month.rows.length) {
            month.rows = month.rows.map(function (row) {
              n++;
              //если последняя и сумма предыдущих не равна 0
              if (i === n) {
                if (allSum !== 0) {
                  row.sum = newPlanIncome - allSum;
                  sum += row.sum;
                  allSum += row.sum;
                  row.sum = _Money["default"].format(row.sum);
                }
              } else {
                row.sum = Math.floor(_Money["default"].toDigits(row.sum) * proportion);
                sum += row.sum;
                allSum += _Money["default"].toDigits(row.sum);
                row.sum = _Money["default"].format(row.sum);
              }
              return row;
            });
            month.sum = sum;
          }
          return month;
        });
        if (allSum === 0) {
          n = 0;
          var part = Math.floor(newPlanIncome / 12);
          item.months = item.months.map(function (month) {
            var sum = 0;
            if (parseInt(month.month) && month.rows && month.rows.length) {
              month.rows = month.rows.map(function (row) {
                n++;
                if (i === n) {
                  row.sum = newPlanIncome - allSum;
                  sum += row.sum;
                  allSum += row.sum;
                  row.sum = _Money["default"].format(row.sum);
                } else {
                  row.sum = part;
                  sum += row.sum;
                  allSum += _Money["default"].toDigits(row.sum);
                  row.sum = _Money["default"].format(row.sum);
                }
                return row;
              });
              month.sum = sum;
            }
            return month;
          });
        }
      }
    }
  }]);
}();
_ActiveGoalConstants = ActiveGoalConstants;
_defineProperty(ActiveGoalConstants, "WITH_PLAN", 1);
_defineProperty(ActiveGoalConstants, "WITHOUT_PLAN", 2);
_defineProperty(ActiveGoalConstants, "SHORT", 1);
_defineProperty(ActiveGoalConstants, "MIDDLE", 2);
_defineProperty(ActiveGoalConstants, "LONG", 3);
_defineProperty(ActiveGoalConstants, "RETIRE", 4);
_defineProperty(ActiveGoalConstants, "PORTFOLIO", 5);
_defineProperty(ActiveGoalConstants, "GOAL_TYPES", [_ActiveGoalConstants.SHORT, _ActiveGoalConstants.MIDDLE, _ActiveGoalConstants.LONG, _ActiveGoalConstants.RETIRE]);
_defineProperty(ActiveGoalConstants, "planFields", [{
  "item": {
    "id": "1",
    "name": "Группа",
    "slug": "group"
  },
  "item_id": "1",
  "item_search": "Группа",
  "item_slug": "group"
}, {
  "item": {
    "id": "2",
    "name": "Тип",
    "slug": "type"
  },
  "item_id": "2",
  "item_search": "Тип",
  "item_slug": "type"
}, {
  "item": {
    "id": "3",
    "name": "Страна",
    "slug": "country"
  },
  "item_id": "3",
  "item_search": "Страна",
  "item_slug": "country"
}, {
  "item": {
    "id": "4",
    "name": "Теги",
    "slug": "users_type"
  },
  "item_id": "4",
  "item_search": "Теги",
  "item_slug": "users_type"
}, {
  "item": {
    "id": "5",
    "name": "Капитализация",
    "slug": "size"
  },
  "item_id": "5",
  "item_search": "Капитализация",
  "item_slug": "size"
}, {
  "item": {
    "id": "6",
    "name": "Риск",
    "slug": "risk_state"
  },
  "item_id": "6",
  "item_search": "Риск",
  "item_slug": "risk_state"
}, {
  "item": {
    "id": "7",
    "name": "Индустрия",
    "slug": "industry"
  },
  "item_id": "7",
  "item_search": "Индустрия",
  "item_slug": "industry"
}, {
  "item": {
    "id": "8",
    "name": "Сектор",
    "slug": "sector"
  },
  "item_id": "8",
  "item_search": "Сектор",
  "item_slug": "sector"
}]);
_defineProperty(ActiveGoalConstants, "NOW", 1);
_defineProperty(ActiveGoalConstants, "AFTER", 0);