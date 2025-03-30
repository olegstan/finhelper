"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Plan = void 0;
var _Money = _interopRequireDefault(require("./Money"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Plan = exports.Plan = exports["default"] = /*#__PURE__*/function () {
  function Plan() {
    _classCallCheck(this, Plan);
  }
  return _createClass(Plan, null, [{
    key: "balance",
    value: function balance(item) {
      var balance = 0;
      if (item.plan_income) {
        balance += _Money["default"].toDigits(item.plan_income);
      }
      if (item.outcome) {
        balance -= _Money["default"].toDigits(item.outcome);
      }
      if (item.obligation) {
        balance -= _Money["default"].toDigits(item.obligation);
      }
      if (item.additional_outcome) {
        balance -= _Money["default"].toDigits(item.additional_outcome);
      }
      if (item.plan_goals) {
        balance -= _Money["default"].toDigits(item.plan_goals);
      }
      if (item.retired_goals) {
        balance -= _Money["default"].toDigits(item.retired_goals);
      }
      return balance;
    }
  }, {
    key: "calcIncome",
    value: function calcIncome(months, item, user) {
      var income_neutral = _Money["default"].toDigits(item['income_neutral']);
      var income_negative = _Money["default"].toDigits(item['income_negative']);
      var income_positive = _Money["default"].toDigits(item['income_positive']);
      var add_income = _Money["default"].toDigits(item['additional_income']);
      income_neutral = income_neutral > 0 ? income_neutral : 0;
      income_negative = income_negative > 0 ? income_negative : 0;
      income_positive = income_positive > 0 ? income_positive : 0;
      var percent_neutral = _Money["default"].toDigits(user['percent_neutral']);
      var percent_negative = _Money["default"].toDigits(user['percent_negative']);
      var percent_positive = _Money["default"].toDigits(user['percent_positive']);
      if (percent_neutral === 0 && percent_negative === 0) {
        percent_positive = 100;
      }
      if (percent_neutral === 0 && percent_positive === 0) {
        percent_negative = 100;
      }
      if (percent_negative === 0 && percent_positive === 0) {
        percent_neutral = 100;
      }

      //пропорция если одно ищ полей не заполнено, то оставшиеся два будут  делиться
      if (percent_neutral !== 0 && percent_negative !== 0 && percent_positive === 0) {
        var sum = percent_neutral + percent_negative;
        percent_neutral = 100 / sum * percent_neutral;
        percent_negative = 100 / sum * percent_negative;
      }
      if (percent_neutral !== 0 && percent_positive !== 0 && percent_negative === 0) {
        var _sum = percent_neutral + percent_positive;
        percent_neutral = 100 / _sum * percent_neutral;
        percent_positive = 100 / _sum * percent_positive;
      }
      if (percent_negative !== 0 && percent_positive !== 0 && percent_neutral === 0) {
        var _sum2 = percent_negative + percent_positive;
        percent_negative = 100 / _sum2 * percent_negative;
        percent_positive = 100 / _sum2 * percent_positive;
      }
      var tax = _Money["default"].toDigits(item['tax']);
      var income = income_neutral / 100 * percent_neutral + income_negative / 100 * percent_negative + income_positive / 100 * percent_positive;
      if (income > 0) {
        //по закону если доход больше 5 млн, то подоходный налог будет 15%
        //работает в том случае, если пользователь указано стандартный 13% налог на доходы
        if (tax === 13 && income >= 5000000) {
          var firstPart = 5000000;
          var secondPart = income - 5000000;
          return income - (firstPart / 100 * 13 + secondPart / 100 * 15) + add_income;
        } else {
          return income - income / 100 * tax + add_income;
        }
      } else {
        return add_income;
      }
    }
  }]);
}();