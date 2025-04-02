"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment/moment"));
var _ActiveConstants = _interopRequireDefault(require("../constants/ActiveConstants"));
var _CurrencyConstants = _interopRequireDefault(require("../constants/CurrencyConstants"));
var _exactMath = _interopRequireDefault(require("exact-math"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Money = exports["default"] = /*#__PURE__*/function () {
  function Money() {
    _classCallCheck(this, Money);
  }
  return _createClass(Money, null, [{
    key: "formatForInput",
    value: function formatForInput(amount) {
      var decimalCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var decimalSign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
      var thousands = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : " ";
      try {
        if (amount === '') {
          return '';
        }
        var __ret = Money.getDecimal(decimalCount, amount);
        decimalCount = __ret.decimalCount;
        var negativeSign = __ret.negativeSign;
        var amountInt = parseInt(amount = Math.abs(Number(amount) || '').toFixed(decimalCount)).toString();
        var amountFloat = Math.abs(amount - amountInt);
        var j = amountInt.length > 3 ? amountInt.length % 3 : 0;
        return negativeSign + (j ? amountInt.substr(0, j) + thousands : '') + amountInt.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimalSign + amountFloat.toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.error(e);
        return '';
      }
    }
  }, {
    key: "getDecimal",
    value: function getDecimal(decimalCount, amount) {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? '' : decimalCount;
      var negativeSign = amount < 0 ? "-" : "";
      return {
        decimalCount: decimalCount,
        negativeSign: negativeSign
      };
    }

    //TODO написать проверку, если цифра заканчивается на больше e+20, такие числа toFixed не может правильно обработать
  }, {
    key: "toFixed",
    value:
    /**
     *
     * @param num
     * @param fix
     * @return {string|*}
     */
    function toFixed(num, fix) {
      if (typeof num === 'number') {
        num = num.toString();
      }
      if (typeof num === 'string') {
        var decimalIndex = num.toString().indexOf('.');

        // Если десятичная точка не найдена, выводим исходное число
        if (decimalIndex === -1) {
          return num.replace('.', ''); //удалим точку
        } else {
          if (fix === 0) {
            return Math.trunc(num).toString();
          }

          // Получаем подстроку числа, включая нужное количество знаков после точки
          return num.toString().substring(0, decimalIndex + fix + 1);
        }
      }
    }

    /**
     *
     * @param amount
     * @param fix
     * @param space
     * @return {*|string}
     */
  }, {
    key: "toThousands",
    value: function toThousands(amount) {
      var fix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var space = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var isNegative = amount < 0;
      var preparedAmount = Math.abs(amount);
      var result;
      if (preparedAmount >= 1000000000) {
        result = Money.toFixed(preparedAmount / 1000000000, fix) + space + 'B';
      } else if (preparedAmount >= 1000000) {
        result = Money.toFixed(preparedAmount / 1000000, fix) + space + 'M';
      } else if (preparedAmount >= 1000) {
        result = Money.toFixed(preparedAmount / 1000, fix) + space + 'K';
      } else {
        result = Money.toFixed(preparedAmount, fix);
      }
      return isNegative ? '-' + result : result;
    }
  }, {
    key: "getAccumulatedCouponIncome",
    value: function getAccumulatedCouponIncome(startDate, endDate, nominal, rate, ratePeriodTypeId) {
      var nowDate = (0, _moment["default"])();
      var period = 0;
      var delimiter = 0;
      switch (ratePeriodTypeId) {
        case _ActiveConstants["default"].DAILY:
          break;
        case _ActiveConstants["default"].WEEKLY:
          break;
        case _ActiveConstants["default"].MONTHLY:
          period = 1;
          delimiter = 12;
          break;
        case _ActiveConstants["default"].QUARTER:
          period = 3;
          delimiter = 4;
          break;
        case _ActiveConstants["default"].HALFYEAR:
          period = 6;
          delimiter = 2;
          break;
        case _ActiveConstants["default"].YEARLY:
          period = 12;
          delimiter = 1;
          break;
      }
      var periodDays = Math.abs(startDate.diff(endDate, 'days', true));
      var couponDiffDays = Math.abs(startDate.diff(nowDate, 'days'));
      return nominal * (rate / 100 / delimiter) / periodDays * couponDiffDays;
    }

    /**
     *
     * @param sum
     * @returns {number}
     */
  }, {
    key: "toDigits",
    value: function toDigits(sum) {
      if (typeof sum === 'number') {
        sum = sum.toString();
      }
      if (typeof sum === 'string') {
        return parseFloat(sum.replace(/,/g, '.').replace(/ /g, ''));
      }
    }

    /**
     *
     * @param courses
     * @param id
     * @return {null}
     */
  }, {
    key: "getCourseByCurrencyId",
    value: function getCourseByCurrencyId(courses, id) {
      var course = null;
      if (courses) {
        courses.map(function (item) {
          if (item.cb_currency.currency.id === id) {
            course = item;
          }
        });
      }
      return course;
    }

    /**
     *
     * @param sum
     * @param fromCurrencyId
     * @param toCurrencyId
     * @param courses
     * @returns {*}
     */
  }, {
    key: "convert",
    value: function convert(sum, fromCurrencyId, toCurrencyId) {
      var courses = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _CurrencyConstants["default"].courses;
      try {
        if (courses.length > 0 && fromCurrencyId && toCurrencyId) {
          var fromCurrencyCourse = Money.getCourseByCurrencyId(courses, fromCurrencyId);
          var toCurrencyCourse = Money.getCourseByCurrencyId(courses, toCurrencyId);
          if (fromCurrencyId === toCurrencyId) {
            return sum;
          }

          //если выбранная валюта рубль, тогда просто изпользуем
          //базу курсов с учётом даты
          if (fromCurrencyId === _CurrencyConstants["default"].RUBBLE_ID) {
            return sum * toCurrencyCourse.value / toCurrencyCourse.nominal;
          }
          if (toCurrencyId === _CurrencyConstants["default"].RUBBLE_ID) {
            return sum * (1 / fromCurrencyCourse.value / fromCurrencyCourse.nominal);
          }
          return sum * (toCurrencyCourse.value / toCurrencyCourse.nominal) / (fromCurrencyCourse.value / fromCurrencyCourse.nominal);
        } else {
          return 0;
        }
      } catch (e) {
        console.warn(e.message);
        return 0;
      }
    }
  }]);
}();
_defineProperty(Money, "format", function (amount) {
  var decimalCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var decimalSign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
  var thousands = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : " ";
  try {
    // 1) Переводим входные данные в число
    var numberValue;
    if (typeof amount === 'number') {
      numberValue = amount;
    } else if (typeof amount === 'string') {
      // Заменяем запятые на точки, убираем лишние пробелы
      numberValue = parseFloat(amount.replace(/,/g, '.').replace(/ /g, ''));
    } else {
      numberValue = parseFloat(amount);
    }

    // 2) Спец. случаи
    if (numberValue === '') {
      return '';
    }
    if (numberValue === 0) {
      // Явный ноль (считаем, что хотим вернуть "0" как строку)
      return '0';
    }
    if (isNaN(numberValue)) {
      // Ошибка, число не распарсилось
      try {
        throw new Error('Error number is NaN');
      } catch (e) {
        // console.warn(e.stack);
      }
      return '0';
    }
    if (!isFinite(numberValue)) {
      // Бесконечность
      return '∞';
    }
    var strVal;
    if (Math.abs(numberValue) < 1e-6 || Math.abs(numberValue) >= 1e15) {
      // Для очень маленьких или очень больших чисел используем toFixed с максимальным количеством знаков
      strVal = numberValue.toFixed(20).replace(/\.?0+$/, '');
    } else {
      // Для обычных чисел просто преобразуем в строку
      strVal = numberValue.toString();
    }
    if (strVal.includes('e')) {
      strVal = numberValue.toFixed(decimalCount);
    }

    // 3) Определяем знак и работаем с модулем числа
    var negativeSign = numberValue < 0 ? "-" : "";
    var absAmount = Math.abs(numberValue);

    // Разделяем целую и дробную части
    var _strVal$split = strVal.split('.'),
      _strVal$split2 = _slicedToArray(_strVal$split, 2),
      intPart = _strVal$split2[0],
      _strVal$split2$ = _strVal$split2[1],
      fractionPart = _strVal$split2$ === void 0 ? '' : _strVal$split2$;

    // 5) Обрезаем дробную часть до нужного количества знаков без округления
    if (fractionPart && decimalCount > 0) {
      fractionPart = fractionPart.substring(0, decimalCount);
    } else {
      fractionPart = '';
    }

    // 6) Формируем группу тысяч в целой части
    if (intPart.length > 3) {
      var j = intPart.length % 3;
      intPart = (j ? intPart.slice(0, j) + thousands : '') + intPart.slice(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    }

    // 7) Склеиваем результат: знак + целая часть + (точка + дробная часть) если есть
    var result = negativeSign + intPart;
    if (fractionPart && decimalCount > 0) {
      result += decimalSign + fractionPart;
    }
    return result;
  } catch (e) {
    console.error(e);
    return '';
  }
});