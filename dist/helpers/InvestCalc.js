"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Money = _interopRequireDefault(require("./Money"));
var _moment = _interopRequireDefault(require("moment/moment"));
var _ActiveConstants = _interopRequireDefault(require("../constants/ActiveConstants"));
var _AccountConstants = _interopRequireDefault(require("../constants/AccountConstants"));
var _Active = _interopRequireDefault(require("./Active"));
var _exactMath = _interopRequireDefault(require("exact-math"));
var _CurrencyConstants = _interopRequireDefault(require("../constants/CurrencyConstants"));
var _BuyTrade = _interopRequireDefault(require("../models/BuyTrade"));
var _SellTrade = _interopRequireDefault(require("../models/SellTrade"));
var _ActiveValueCalculator = _interopRequireDefault(require("./Active/ActiveValueCalculator"));
var _IndexedDBCache = _interopRequireDefault(require("./IndexedDBCache"));
var _cryptoJs = _interopRequireDefault(require("crypto-js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var InvestCalc = /*#__PURE__*/function () {
  function InvestCalc() {
    _classCallCheck(this, InvestCalc);
  }
  return _createClass(InvestCalc, null, [{
    key: "getRoundPriceByValue",
    value: function getRoundPriceByValue(item, value) {
      var number = 2;

      // Логика для определения числа знаков после запятой
      var parts = String(value).split('.');
      if (parts.length > 1) {
        if (parseInt(parts[0]) === 0) {
          // Если целая часть равна 0, вернуть длину дробной части
          return parts[1].length;
        } else {
          // Если целая часть больше 0, вернуть 2
          return number;
        }
      } else {
        // Если значение целое, вернуть 2
        return number;
      }

      // Проверка типа для криптовалюты
      if (item.type_id === _ActiveConstants["default"].CRYPTO || item.item && item.item.type === 'CRYPTOCURRENCY') {
        number = 8;
      }
      return number;
    }
  }, {
    key: "getRoundPrice",
    value: function getRoundPrice(item, field) {
      var _item$buy_trades, _item$sell_trades;
      var smallestNumberPrice = null;

      // Для криптовалют возвращаем 8 знаков после запятой
      if (item.type_id === _ActiveConstants["default"].CRYPTO || item.item && item.item.type === 'CRYPTOCURRENCY') {
        return 8;
      }

      // Вспомогательная функция для проверки значений
      var checkTrades = function checkTrades(trades) {
        var _iterator = _createForOfIteratorHelper(trades),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var trade = _step.value;
            var value = trade[field];
            if (smallestNumberPrice === null || value < smallestNumberPrice) {
              smallestNumberPrice = value;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };

      // Проверяем buy_trades и sell_trades
      if (item !== null && item !== void 0 && (_item$buy_trades = item.buy_trades) !== null && _item$buy_trades !== void 0 && _item$buy_trades.length) checkTrades(item.buy_trades);
      if (item !== null && item !== void 0 && (_item$sell_trades = item.sell_trades) !== null && _item$sell_trades !== void 0 && _item$sell_trades.length) checkTrades(item.sell_trades);

      // Если минимальное значение найдено, определяем длину десятичной части
      if (smallestNumberPrice !== null) {
        if (smallestNumberPrice >= 0.01) {
          return 2; // Для чисел ≥ 0.01 всегда возвращаем 2
        }
        var _String$split = String(smallestNumberPrice).split('.'),
          _String$split2 = _slicedToArray(_String$split, 2),
          integerPart = _String$split2[0],
          decimalPart = _String$split2[1];
        if (decimalPart) {
          // Убираем конечные нули
          var trimmedDecimal = decimalPart.replace(/0+$/, '');
          return trimmedDecimal.length;
        }
        return 0; // Если нет дробной части
      }

      // Значение по умолчанию
      return 2;
    }
  }, {
    key: "getRound",
    value: function getRound(item) {
      var number = 2;
      if (item.type_id === _ActiveConstants["default"].CRYPTO) {
        number = 8;
      }
      if (item.item && item.item.type === 'CRYPTOCURRENCY') {
        number = 8;
      }
      return number;
    }
  }, {
    key: "getCount",
    value: function getCount(item) {
      var _item$buy_trades2;
      if (item !== null && item !== void 0 && (_item$buy_trades2 = item.buy_trades) !== null && _item$buy_trades2 !== void 0 && _item$buy_trades2.length) {
        return _Money["default"].format(_Active["default"].getCountSum(item, item.buy_trades), InvestCalc.getRound(item));
      }
    }
  }, {
    key: "getBuyPrice",
    value: function getBuyPrice(item, sign) {
      var _item$buy_trades3;
      if (item !== null && item !== void 0 && (_item$buy_trades3 = item.buy_trades) !== null && _item$buy_trades3 !== void 0 && _item$buy_trades3.length) {
        return _Money["default"].format(_ActiveValueCalculator["default"].getAvgPrice(item, item.buy_trades), InvestCalc.getRoundPrice(item, 'price')) + ' ' + sign;
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        return '';
      }
    }
  }, {
    key: "getBuyOriginalPrice",
    value: function getBuyOriginalPrice(item) {
      var _item$buy_trades4;
      if (item !== null && item !== void 0 && (_item$buy_trades4 = item.buy_trades) !== null && _item$buy_trades4 !== void 0 && _item$buy_trades4.length) {
        return _Money["default"].format(_ActiveValueCalculator["default"].getAvgOriginalPrice(item, item.buy_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + _CurrencyConstants["default"].getCurrencySignByActive(item);
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        return '';
      }
    }
  }, {
    key: "getBuySum",
    value: function getBuySum(item, sign) {
      var _item$buy_trades5;
      if (item !== null && item !== void 0 && (_item$buy_trades5 = item.buy_trades) !== null && _item$buy_trades5 !== void 0 && _item$buy_trades5.length) {
        var sum = _ActiveValueCalculator["default"].getSum(item.buy_trades);
        return _Money["default"].format(_ActiveValueCalculator["default"].getSum(item.buy_trades), InvestCalc.getRoundPriceByValue(item, sum)) + ' ' + sign;
      } else if (_ActiveConstants["default"].DEBT_GROUP.indexOf(item.type_id) !== -1) {
        var _sum = item.buy_sum;
        return _Money["default"].format(_sum) + ' ' + sign;
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        return _Money["default"].format(item.buy_sum) + ' ' + sign;
      }
    }
  }, {
    key: "getBuyOriginalSum",
    value: function getBuyOriginalSum(item) {
      var _item$buy_trades6;
      if (item !== null && item !== void 0 && (_item$buy_trades6 = item.buy_trades) !== null && _item$buy_trades6 !== void 0 && _item$buy_trades6.length) {
        var sum = _ActiveValueCalculator["default"].getOriginalSum(item.buy_trades);
        return _Money["default"].format(sum, InvestCalc.getRoundPriceByValue(item, sum)) + ' ' + _CurrencyConstants["default"].getCurrencySignByActive(item);
      } else if (_ActiveConstants["default"].DEBT_GROUP.indexOf(item.type_id) !== -1) {
        var sign = _CurrencyConstants["default"].getCurrencySignById(item.buy_currency_id);
        return _Money["default"].format(item.original_buy_sum) + ' ' + sign;
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        var _Active$getCodeAndSig = _Active["default"].getCodeAndSign(item),
          code = _Active$getCodeAndSig.code,
          _sign = _Active$getCodeAndSig.sign;
        return _Money["default"].format(item.original_buy_sum) + ' ' + _sign;
      }
    }
  }, {
    key: "getBuyDate",
    value: function getBuyDate(item) {
      var _item$buy_trades7;
      if (item !== null && item !== void 0 && (_item$buy_trades7 = item.buy_trades) !== null && _item$buy_trades7 !== void 0 && _item$buy_trades7.length) {
        return item.avg_own_date;
      } else if (_ActiveConstants["default"].DEBT_GROUP.indexOf(item.type_id) !== -1) {
        return item.buy_at_date;
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        return item.buy_at_date;
      }
    }
  }, {
    key: "getSellPrice",
    value: function getSellPrice(item, now) {
      var _item$sell_trades2, _item$buy_trades8;
      if ((_item$sell_trades2 = item.sell_trades) !== null && _item$sell_trades2 !== void 0 && _item$sell_trades2.length) {
        return _Money["default"].format(_ActiveValueCalculator["default"].getAvgPrice(item, item.sell_trades));
      } else if (_ActiveConstants["default"].COUPON_GROUP.indexOf(item.type_id) !== -1 && (_item$buy_trades8 = item.buy_trades) !== null && _item$buy_trades8 !== void 0 && _item$buy_trades8.length) {
        var sellDate = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
        if (sellDate.isBefore(now)) {
          return _Money["default"].format(item.buy_sum);
        }
      }
    }
  }, {
    key: "getSellOriginalPrice",
    value: function getSellOriginalPrice(item) {
      var _item$sell_trades3;
      if ((_item$sell_trades3 = item.sell_trades) !== null && _item$sell_trades3 !== void 0 && _item$sell_trades3.length) {
        var sign = this.getSign(item);
        return _Money["default"].format(_ActiveValueCalculator["default"].getAvgOriginalPrice(item, item.sell_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + sign;
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        return '';
      }
    }
  }, {
    key: "getSellSum",
    value: function getSellSum(item, now, sign) {
      var _item$sell_trades4, _item$buy_trades9;
      if ((_item$sell_trades4 = item.sell_trades) !== null && _item$sell_trades4 !== void 0 && _item$sell_trades4.length) {
        return _Money["default"].format(_ActiveValueCalculator["default"].getSum(item.sell_trades), InvestCalc.getRoundPrice(item, 'price')) + ' ' + sign;
      } else if (_ActiveConstants["default"].COUPON_GROUP.indexOf(item.type_id) !== -1 && (_item$buy_trades9 = item.buy_trades) !== null && _item$buy_trades9 !== void 0 && _item$buy_trades9.length) {
        var sellDate = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
        if (sellDate.isBefore(now)) {
          var count = _Active["default"].getCountSum(item, item.buy_trades);
          return _Money["default"].format(item.buy_sum * count) + ' ' + sign;
        }
      } else if (_ActiveConstants["default"].DEBT_GROUP.indexOf(item.type_id) !== -1) {
        var _sellDate = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
        if (_sellDate.isBefore(now)) {
          return _Money["default"].format(_Active["default"].getPaymentsSum(item.payments)) + ' ' + sign;
        }
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        if (item.sell) {
          var sell = item.sell.child_item;
          return _Money["default"].format(sell.sum) + ' ' + sign;
        }
        return _Money["default"].format(item.sell_sum) + ' ' + sign;
      }
    }
  }, {
    key: "getSellOriginalSum",
    value: function getSellOriginalSum(item) {
      var _item$sell_trades5;
      if ((_item$sell_trades5 = item.sell_trades) !== null && _item$sell_trades5 !== void 0 && _item$sell_trades5.length) {
        var sign = this.getSign(item);
        return _Money["default"].format(_ActiveValueCalculator["default"].getOriginalSum(item.sell_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + sign;
      } else if (_ActiveConstants["default"].DEBT_GROUP.indexOf(item.type_id) !== -1) {
        var _sign2 = _CurrencyConstants["default"].getCurrencySignById(item.sell_currency_id);
        return _Money["default"].format(item.original_sell_sum) + ' ' + _sign2;
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        var _sign3 = _CurrencyConstants["default"].getCurrencySignById(item.sell_currency_id);
        return _Money["default"].format(item.original_sell_sum) + ' ' + _sign3;
      }
    }
  }, {
    key: "getSign",
    value: function getSign(item) {
      var sign = '';
      if (item.type_id === _ActiveConstants["default"].CURRENCY) {
        var account = _AccountConstants["default"].getSubAccountById(item.sell_trades[0].to_account_id);
        if (account) {
          sign = _CurrencyConstants["default"].getCurrencySignById(account.currency_id);
        }
      } else {
        var _account = _AccountConstants["default"].getSubAccountById(item.sell_trades[0].from_account_id);
        if (_account) {
          sign = _CurrencyConstants["default"].getCurrencySignById(_account.currency_id);
        }
      }
      return sign;
    }
  }, {
    key: "getSellDate",
    value: function getSellDate(item, now) {
      var _item$sell_trades6, _item$buy_trades10;
      if ((_item$sell_trades6 = item.sell_trades) !== null && _item$sell_trades6 !== void 0 && _item$sell_trades6.length) {
        var _item$sell_trades7;
        var date = item.sell_trades[((_item$sell_trades7 = item.sell_trades) === null || _item$sell_trades7 === void 0 ? void 0 : _item$sell_trades7.length) - 1].trade_at_date;
        return date;
      } else if (_ActiveConstants["default"].COUPON_GROUP.indexOf(item.type_id) !== -1 && (_item$buy_trades10 = item.buy_trades) !== null && _item$buy_trades10 !== void 0 && _item$buy_trades10.length) {
        var sellDate = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
        if (sellDate.isBefore(now)) {
          return item.sell_at_date;
        }
      } else if (_ActiveConstants["default"].DEBT_GROUP.indexOf(item.type_id) !== -1) {
        var _sellDate2 = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
        if (_sellDate2.isBefore(now)) {
          return item.sell_at_date;
        }
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        if (item.sell) {
          var sell = item.sell.child_item;
          return sell.paid_at_date;
        }
        return item.sell_at_date;
      }
    }
  }, {
    key: "getPeriod",
    value: function getPeriod(item, now) {
      var _item$sell_trades8, _item$buy_trades11, _item$buy_trades12, _item$buy_trades13;
      if ((_item$sell_trades8 = item.sell_trades) !== null && _item$sell_trades8 !== void 0 && _item$sell_trades8.length) {
        var _item$sell_trades9;
        var date = item.sell_trades[((_item$sell_trades9 = item.sell_trades) === null || _item$sell_trades9 === void 0 ? void 0 : _item$sell_trades9.length) - 1].trade_at_date;
        var nowDate = (0, _moment["default"])(date, 'DD.MM.YYYY');
        var buyDate = (0, _moment["default"])(item.avg_own_date, 'DD.MM.YYYY');
        return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
      } else if (_ActiveConstants["default"].COUPON_GROUP.indexOf(item.type_id) !== -1 && (_item$buy_trades11 = item.buy_trades) !== null && _item$buy_trades11 !== void 0 && _item$buy_trades11.length) {
        var sellDate = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
        var _nowDate = sellDate.isBefore(now) ? sellDate : now;
        var _buyDate = (0, _moment["default"])(item.avg_own_date, 'DD.MM.YYYY');
        return Math.round(_nowDate.diff(_buyDate, 'months', true) * 10) / 10 + ' мес.';
      } else if (_ActiveConstants["default"].DEBT_GROUP.indexOf(item.type_id) !== -1) {
        var _sellDate3 = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
        var _nowDate2 = _sellDate3.isBefore(now) ? _sellDate3 : now;
        var _buyDate2 = (0, _moment["default"])(item.buy_at_date, 'DD.MM.YYYY');
        return Math.round(_nowDate2.diff(_buyDate2, 'months', true) * 10) / 10 + ' мес.';
      } else if (_ActiveConstants["default"].PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [_ActiveConstants["default"].CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        if (item.sell_at_date) {
          var _sellDate4 = (0, _moment["default"])(item.sell_at_date, 'DD.MM.YYYY');
          var _nowDate3 = _sellDate4.isBefore(now) ? _sellDate4 : now;
          var _buyDate3 = (0, _moment["default"])(item.buy_at_date, 'DD.MM.YYYY');
          return Math.round(_nowDate3.diff(_buyDate3, 'months', true) * 10) / 10 + ' мес.';
        } else if (item.sell) {
          var sell = item.sell.child_item;
          var _sellDate5 = (0, _moment["default"])(sell.paid_at_date, 'DD.MM.YYYY');
          var _nowDate4 = _sellDate5.isBefore(now) ? _sellDate5 : now;
          var _buyDate4 = (0, _moment["default"])(item.buy_at_date, 'DD.MM.YYYY');
          return Math.round(_nowDate4.diff(_buyDate4, 'months', true) * 10) / 10 + ' мес.';
        } else {
          var _nowDate5 = now;
          var _buyDate5 = (0, _moment["default"])(item.buy_at_date, 'DD.MM.YYYY');
          return Math.round(_nowDate5.diff(_buyDate5, 'months', true) * 10) / 10 + ' мес.';
        }
      }
      if ((_item$buy_trades12 = item.buy_trades) !== null && _item$buy_trades12 !== void 0 && _item$buy_trades12.length && (_item$buy_trades13 = item.buy_trades) !== null && _item$buy_trades13 !== void 0 && _item$buy_trades13.length) {
        var _nowDate6 = (0, _moment["default"])().startOf('day');
        var _buyDate6 = (0, _moment["default"])(item.avg_own_date, 'DD.MM.YYYY');
        return Math.round(_nowDate6.diff(_buyDate6, 'months', true) * 10) / 10 + ' мес.';
      }
    }

    //TODO похоже на зачикливание
  }, {
    key: "getAnnuallyPercentByActives",
    value: function getAnnuallyPercentByActives(actives, now, self) {
      var firstBuyDate = InvestCalc.getFirstBuyDate(actives);
      if (firstBuyDate) {
        // let hasSell = false;
        // let profit = InvestCalc.getAnnuallyPercentByActives(actives, now, self, hasSell);
        //
        // let diffInDays = Math.abs(firstBuyDate.diff(moment().startOf('day'), 'days'));
        // profit -= 1;
        //
        // let annulyProfit = (Math.pow(profit + 1, (360 / (diffInDays ? diffInDays : 1)) - 1));

        return 0;
      }
      return 0;
    }
  }, {
    key: "getAnnuallyPercentWithFactPercentByActives",
    value: function getAnnuallyPercentWithFactPercentByActives(actives, profit) {
      var firstBuyDate = InvestCalc.getFirstBuyDate(actives);
      if (firstBuyDate) {
        var diffInDays = Math.abs(firstBuyDate.diff((0, _moment["default"])().startOf('day'), 'days'));
        profit -= 1;
        var annulyProfit = Math.pow(profit + 1, 360 / diffInDays) - 1;
        return annulyProfit;
      }
      return 0;
    }

    /**
     * Инициализирует структуру данных (index, sums, values, sold, grids, gridIndex)
     * и ищет дату первой покупки (firstBuyDate)
     */
  }, {
    key: "initActivesData",
    value: function initActivesData(activesWithoutCurrency) {
      var index = [];
      var sums = [];
      var values = [];
      var sold = [];
      var grids = [];
      var gridIndex = [];
      var firstBuyDate = InvestCalc.getFirstBuyDate(activesWithoutCurrency);
      return {
        index: index,
        sums: sums,
        values: values,
        sold: sold,
        grids: grids,
        gridIndex: gridIndex,
        firstBuyDate: firstBuyDate
      };
    }

    /**
     *
     * @param valuationObj
     * @param newDate
     * @param newPrice
     */
  }, {
    key: "updateLastValuation",
    value: function updateLastValuation(valuationObj, newDate, newPrice) {
      if (valuationObj.olderDate === null) {
        valuationObj.olderDate = newDate;
        valuationObj.olderPrice = newPrice;
      } else if (newDate.isSameOrAfter(valuationObj.olderDate)) {
        valuationObj.olderDate = newDate;
        valuationObj.olderPrice = newPrice;
      }
    }

    /**
     * Рассчитывает массив индексов валют (currencyIndex) и объект последних
     * оценок (lastValuations) для каждого типа валюты из списка активов
     */
  }, {
    key: "calculateCurrencyValuations",
    value: function calculateCurrencyValuations(actives) {
      var _this = this;
      var currencyIndex = [];
      var lastValuations = [];
      actives.forEach(function (active) {
        // Фиксируем валютный символ в currencyIndex (чтобы понять, какой это индекс)
        if (!currencyIndex.includes(active.item.symbol)) {
          currencyIndex.push(active.item.symbol);
        }
        var currencyKey = currencyIndex.indexOf(active.item.symbol);

        // Инициализируем объект с датой/ценой
        if (typeof lastValuations[currencyKey] === 'undefined') {
          lastValuations[currencyKey] = {
            olderDate: null,
            olderPrice: null
          };
        } else {
          // Сбрасываем перед перерасчётом
          lastValuations[currencyKey].olderDate = null;
          lastValuations[currencyKey].olderPrice = null;
        }

        // Обрабатываем покупки
        active.buy_trades.forEach(function (trade) {
          if (trade.price <= 0) return;
          var tradeDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
          _this.updateLastValuation(lastValuations[currencyKey], tradeDate, trade.price);
        });

        // Обрабатываем valuations
        if (Array.isArray(active.attributes.valuations)) {
          active.attributes.valuations.forEach(function (value) {
            var valueDate = value.morph === 'active.user.valuation' ? (0, _moment["default"])() : (0, _moment["default"])(value.value_at_date, 'DD.MM.YYYY');
            _this.updateLastValuation(lastValuations[currencyKey], valueDate, value.current_sum);
          });
        }

        // Обрабатываем продажи
        if (Array.isArray(active.attributes.sell_trades)) {
          active.attributes.sell_trades.forEach(function (trade) {
            var tradeDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
            _this.updateLastValuation(lastValuations[currencyKey], tradeDate, trade.price);
          });
        }
      });

      // Превращаем lastValuations в JSON-строку
      var lastValuationsJSON = JSON.stringify(lastValuations);

      // Делаем хеш (md5 или любой другой)
      var lastValuationsHash = _cryptoJs["default"].MD5(lastValuationsJSON).toString();
      return {
        currencyIndex: currencyIndex,
        lastValuations: lastValuations,
        lastValuationsHash: lastValuationsHash
      };
    }

    /**
     * Заполняет данные (sums, values, sold и т.д.) для всех активов
     * по датам, начиная с firstBuyDate и заканчивая сегодня
     */
  }, {
    key: "fillActivesDataByDates",
    value: function fillActivesDataByDates(activesWithoutCurrency, firstBuyDate, index, sums, values, sold, grids, gridIndex) {
      var _this2 = this;
      var nowDate = (0, _moment["default"])().startOf('day');

      // Клонируем дату, чтобы позже использовать в расчёте прибыли
      var cloneFirstBuyDate = firstBuyDate.clone();
      var _loop = function _loop() {
        var formattedDate = firstBuyDate.format('DD.MM.YYYY');

        // Инициализируем массивы для данного индекса даты
        if (!index.includes(formattedDate)) {
          index.push(formattedDate);
        }
        var dateIndex = index.indexOf(formattedDate);
        if (typeof sums[dateIndex] === 'undefined') sums[dateIndex] = [];
        if (typeof sold[dateIndex] === 'undefined') sold[dateIndex] = [];
        if (typeof values[dateIndex] === 'undefined') values[dateIndex] = [];

        // Для каждого активa считаем его оценку
        activesWithoutCurrency.forEach(function (active) {
          _this2.calculateActiveValuationForDate(active, firstBuyDate, dateIndex, sums, values, sold, gridIndex, grids);
        });

        // Идём к следующему дню
        firstBuyDate.add(1, 'days');
      };
      while (firstBuyDate && firstBuyDate.isSameOrBefore(nowDate)) {
        _loop();
      }
    }

    /**
     * Считает оценку конкретного актива на определённую дату (firstBuyDate)
     */
  }, {
    key: "calculateActiveValuationForDate",
    value: function calculateActiveValuationForDate(active, currentDate, dateIndex, sums, values, sold, gridIndex, grids) {
      // Инициализируем "ячейки" для данного актива
      if (typeof values[dateIndex][active.id] === 'undefined') {
        values[dateIndex][active.id] = {};
      }
      if (typeof sums[dateIndex][active.id] === 'undefined') {
        sums[dateIndex][active.id] = 0;
      }
      if (typeof sold[dateIndex][active.id] === 'undefined') {
        sold[dateIndex][active.id] = 0;
      }
      if (!gridIndex.includes(active.id)) {
        gridIndex.push(active.id);
      }
      var gridKey = gridIndex.indexOf(active.id);
      if (typeof grids[gridKey] === 'undefined') {
        // Предполагаем, что InvestCalc.getGrid() вернёт сетку оценок для актива
        grids[gridKey] = InvestCalc.getGrid(active, (0, _moment["default"])().startOf('day'));
      }
      if (_ActiveConstants["default"].isPackage(active.type_id)) {
        this.calculatePackageActiveValuation(active, currentDate, dateIndex, sums, values, sold, grids[gridKey]);
      } else {
        this.calculateSingleActiveValuation(active, currentDate, dateIndex, sums, values, sold);
      }
    }

    /**
     * Подсчёт оценки для "пакета" (множественные покупки/продажи, переоценки и т.д.)
     */
  }, {
    key: "calculatePackageActiveValuation",
    value: function calculatePackageActiveValuation(active, firstBuyDate, dateIndex, sums, values, sold, gridForActive) {
      var _active$attributes$va, _active$attributes, _active$attributes2;
      var count = 0;
      var course = 0;
      var tradePrice = 0;
      var sell = false;
      var tradeOriginalPrice = 0;
      var lastTradeDate = null;
      var valuePrice = 0;
      var valueOriginalPrice = 0;
      var lastValueDate = null;

      // Покупки
      active.attributes.buy_trades.forEach(function (trade) {
        // Копия сделки с учётом комиссии
        var copyTrade = new _BuyTrade["default"](_objectSpread({}, trade));
        copyTrade.price = trade.price + _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
        copyTrade.original_price = trade.original_price + _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
        var tradeDate = (0, _moment["default"])(copyTrade.trade_at_date, 'DD.MM.YYYY');
        if (!lastTradeDate) {
          lastTradeDate = tradeDate;
        }

        // Если сделка раньше или в день firstBuyDate, прибавляем
        if (tradeDate.isSameOrBefore(firstBuyDate)) {
          count += copyTrade.count;
          tradePrice = copyTrade.price;
          tradeOriginalPrice = copyTrade.original_price;
          course = copyTrade.price_course;
        }
      });

      // Переоценки
      (_active$attributes$va = active.attributes.valuations) === null || _active$attributes$va === void 0 || _active$attributes$va.forEach(function (valuation) {
        var valueDate = valuation.morph === 'active.user.valuation' ? (0, _moment["default"])() : (0, _moment["default"])(valuation.value_at_date, 'DD.MM.YYYY');
        lastValueDate = valueDate;
        if (valueDate.isSameOrBefore(firstBuyDate)) {
          valuePrice = valuation.current_sum;
          valueOriginalPrice = valuation.original_current_sum;
          course = valuation.current_sum_course;
        }
      });

      // Продажи
      active.attributes.sell_trades.forEach(function (trade) {
        var copyTrade = new _SellTrade["default"](_objectSpread({}, trade));
        copyTrade.price = trade.price - _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
        copyTrade.original_price = trade.original_price - _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
        var tradeDate = (0, _moment["default"])(copyTrade.trade_at_date, 'DD.MM.YYYY');
        lastTradeDate = tradeDate;
        if (tradeDate.isSameOrBefore(firstBuyDate)) {
          tradePrice = copyTrade.price;
          tradeOriginalPrice = copyTrade.original_price;
          course = copyTrade.price_course;
          sell = true;
        }
      });

      // Если нет продаж и переоценок, но были покупки -> берём цену из последней покупки
      if ((!(active !== null && active !== void 0 && (_active$attributes = active.attributes) !== null && _active$attributes !== void 0 && _active$attributes.valuations) || (active === null || active === void 0 || (_active$attributes2 = active.attributes) === null || _active$attributes2 === void 0 || (_active$attributes2 = _active$attributes2.valuations) === null || _active$attributes2 === void 0 ? void 0 : _active$attributes2.length) === 0) && active.attributes.sell_trades.length === 0 && active.attributes.buy_trades.length > 0) {
        var lastTrade = active.attributes.buy_trades[active.attributes.buy_trades.length - 1];
        var nowDate = (0, _moment["default"])().startOf('day');
        if (nowDate.isSameOrBefore(firstBuyDate)) {
          lastTradeDate = nowDate;
          tradePrice = lastTrade.price;
          tradeOriginalPrice = lastTrade.original_price;
          course = lastTrade.price_course;
        }
      }

      // Логика выбора цены: продажа / переоценка / покупка
      if (sell) {
        // Если актив продан, исключаем его из дальнейшей переоценки
        // но учитываем цену продажи в дату продажи
        sums[dateIndex][active.id] = sums[dateIndex][active.id] || 0;

        // Если ещё не был помечен как "продан"
        if (!sums[dateIndex][active.id]) {
          sums[dateIndex][active.id] = tradePrice * count;
        }
      } else if (lastValueDate && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0) {
        // Оценка
        sums[dateIndex][active.id] = count * valuePrice;
      } else if (lastTradeDate && tradePrice > 0) {
        // Покупка
        sums[dateIndex][active.id] = count * tradePrice;
      }
    }

    /**
     * Подсчёт оценки для "единичного" актива (одна покупка/продажа)
     */
  }, {
    key: "calculateSingleActiveValuation",
    value: function calculateSingleActiveValuation(active, firstBuyDate, dateIndex, sums, values, sold) {
      var _active$attributes$va2, _active$attributes3, _active$attributes4;
      var count = 0;
      var tradePrice = 0;
      var sell = false;
      var tradeOriginalPrice = 0;
      var lastTradeDate = null;
      var valuePrice = 0;
      var lastValueDate = null;
      var paymentSum = 0;

      // Данные о покупке
      var buyTrade = {
        price: active.buy_sum,
        original_price: active.original_buy_sum,
        price_course: active.buy_sum_course
      };
      var buyTradeDate = (0, _moment["default"])(active.buy_at_date, 'DD.MM.YYYY');
      if (!lastTradeDate) {
        lastTradeDate = buyTradeDate;
      }

      // Если покупка была до (или в) firstBuyDate
      if (buyTradeDate.isSameOrBefore(firstBuyDate)) {
        count += 1;
        tradePrice = buyTrade.price;
        tradeOriginalPrice = buyTrade.original_price;
        // Примечание: здесь в вашем исходном коде, похоже, опечатка:
        // course = buyTradeDate.price_course; ?
      }

      // Переоценки
      (_active$attributes$va2 = active.attributes.valuations) === null || _active$attributes$va2 === void 0 || _active$attributes$va2.forEach(function (valuation) {
        var valueDate = valuation.morph === 'active.user.valuation' ? (0, _moment["default"])() : (0, _moment["default"])(valuation.value_at_date, 'DD.MM.YYYY');
        lastValueDate = valueDate;
        if (valueDate.isSameOrBefore(firstBuyDate)) {
          valuePrice = valuation.current_sum;
        }
      });

      // Платежи (например, дивиденды, купоны и т.д.)
      (_active$attributes3 = active.attributes) === null || _active$attributes3 === void 0 || (_active$attributes3 = _active$attributes3.payments) === null || _active$attributes3 === void 0 || _active$attributes3.forEach(function (payment) {
        var paidDate = (0, _moment["default"])(payment.paid_at_date, 'DD.MM.YYYY');
        if (paidDate.isSameOrBefore(firstBuyDate)) {
          paymentSum += payment.sum;
        }
      });

      // Продажа через sell_at
      if (active.sell_at) {
        var sellTrade = {
          price: active.sell_sum,
          original_price: active.original_sell_sum,
          price_course: active.sell_sum_course
        };
        var tradeSellDate = (0, _moment["default"])(active.sell_at_date, 'DD.MM.YYYY');
        lastTradeDate = tradeSellDate;
        if (tradeSellDate.isSameOrBefore(firstBuyDate)) {
          tradePrice = sellTrade.price;
          tradeOriginalPrice = sellTrade.original_price;
          sell = true;
        }
      }
      // Продажа через active.attributes.sell
      else if ((_active$attributes4 = active.attributes) !== null && _active$attributes4 !== void 0 && _active$attributes4.sell) {
        var sellObj = active.attributes.sell.child_item;
        var _sellTrade = {
          price: sellObj.sum,
          original_price: sellObj.original_sum,
          price_course: sellObj.price_course
        };
        var _tradeSellDate = (0, _moment["default"])(sellObj.paid_at_date, 'DD.MM.YYYY');
        lastTradeDate = _tradeSellDate;
        if (_tradeSellDate.isSameOrBefore(firstBuyDate)) {
          tradePrice = _sellTrade.price;
          tradeOriginalPrice = _sellTrade.original_price;
          sell = true;
        }
      }

      // Логика выбора цены: продано / переоценка / покупка
      if (sell) {
        if (!sums[dateIndex][active.id]) {
          // Если актив только что "продаём" в эту дату
          sums[dateIndex][active.id] = active.sell_at ? active.sell_sum : active.attributes.sell.child_item.sum;
        } else {
          sums[dateIndex][active.id] = 0;
        }
      } else if (lastValueDate && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0) {
        // Оценка
        sums[dateIndex][active.id] = count * valuePrice + paymentSum;
      } else if (lastTradeDate && tradePrice > 0) {
        // Покупка
        sums[dateIndex][active.id] = count * tradePrice + paymentSum;
      }
    }

    /**
     *
     * @param ActiveModel[] actives
     * @return {number}
     */
  }, {
    key: "getFactPercentByActives",
    value: (function () {
      var _getFactPercentByActives = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(actives) {
        var activesWithoutCurrency, ids, _InvestCalc$calculate, currencyIndex, lastValuations, lastValuationsHash, cacheKey;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              activesWithoutCurrency = actives.filter(function (active) {
                return active.type_id !== _ActiveConstants["default"].CURRENCY;
              });
              ids = actives.map(function (active) {
                return active.id;
              }).join(','); // // 2. Рассчитываем последние оценки (lastValuations) для валют
              _InvestCalc$calculate = InvestCalc.calculateCurrencyValuations(activesWithoutCurrency), currencyIndex = _InvestCalc$calculate.currencyIndex, lastValuations = _InvestCalc$calculate.lastValuations, lastValuationsHash = _InvestCalc$calculate.lastValuationsHash;
              cacheKey = 'active.fact_percent.actives.' + ids + '.hash.' + lastValuationsHash;
              _context.next = 6;
              return _IndexedDBCache["default"].get(cacheKey).then(function (cachedValue) {
                if (cachedValue) {
                  return cachedValue;
                } else {
                  // 3. Собираем индекс дат, суммы и др. для невалютных активов

                  var _InvestCalc$initActiv = InvestCalc.initActivesData(activesWithoutCurrency),
                    index = _InvestCalc$initActiv.index,
                    sums = _InvestCalc$initActiv.sums,
                    values = _InvestCalc$initActiv.values,
                    sold = _InvestCalc$initActiv.sold,
                    grids = _InvestCalc$initActiv.grids,
                    gridIndex = _InvestCalc$initActiv.gridIndex,
                    firstBuyDate = _InvestCalc$initActiv.firstBuyDate;

                  // Если не удалось определить дату покупки (нет покупок), возвращаем 0
                  if (!firstBuyDate) {
                    return 0;
                  }

                  // 4. Идём по датам от первой покупки до текущей, считаем оценки
                  InvestCalc.fillActivesDataByDates(activesWithoutCurrency, firstBuyDate, index, sums, values, sold, grids, gridIndex);

                  // 5. Считаем финальную доходность
                  var profit = InvestCalc.calculateProfit(index, sums, activesWithoutCurrency, grids, gridIndex);
                  _IndexedDBCache["default"].set(cacheKey, profit, 1000 * 60 * 60 * 24 * 7); //запомним на неделю

                  return profit;
                }
              });
            case 6:
              return _context.abrupt("return", _context.sent);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getFactPercentByActives(_x) {
        return _getFactPercentByActives.apply(this, arguments);
      }
      return getFactPercentByActives;
    }()
    /**
     * Подсчёт итоговой "фактической" доходности (profit)
     * с учётом накопленных сумм, оценок и выплат
     */
    )
  }, {
    key: "calculateProfit",
    value: function calculateProfit(index, sums, activesWithoutCurrency, grids, gridIndex) {
      var profit = 1;
      var nowDate = (0, _moment["default"])().startOf('day');
      var cloneFirstBuyDate = (0, _moment["default"])(index[0], 'DD.MM.YYYY'); // Первая дата из массива index
      var _loop2 = function _loop2() {
        var formattedDate = cloneFirstBuyDate.format('DD.MM.YYYY');
        var dateIndex = index.indexOf(formattedDate);
        var dateProfit = 0;

        // Сумма всех активов в эту дату
        var totalSumInDate = 0;
        for (var activeId in sums[dateIndex]) {
          totalSumInDate += sums[dateIndex][activeId];
        }

        // Для каждого актива вычисляем вклад в доходность
        activesWithoutCurrency.forEach(function (active) {
          var gridKey = gridIndex.indexOf(active.id);
          var activeProfitByDate = InvestCalc.getFactMultiplierByDate(grids[gridKey], cloneFirstBuyDate);
          var activeSum = sums[dateIndex][active.id] || 0;
          var fraction = totalSumInDate ? activeSum / totalSumInDate : 0;
          try {
            if (activeProfitByDate !== 1) {
              // Когда актив продан, доходность != 1
              dateProfit = _exactMath["default"].add(dateProfit, activeProfitByDate * fraction);
            } else {
              dateProfit = _exactMath["default"].add(dateProfit, fraction);
            }
          } catch (e) {
            console.warn(e.message);
          }
        });

        // Умножаем совокупную доходность
        if (dateProfit !== 0) {
          profit = _exactMath["default"].mul(profit, dateProfit);
        }
        cloneFirstBuyDate.add(1, 'days');
      };
      while (cloneFirstBuyDate && cloneFirstBuyDate.isSameOrBefore(nowDate)) {
        _loop2();
      }
      return profit;
    }

    /**
     *
     * @param sortedGrid
     * @param date
     * @returns {number}
     */
  }, {
    key: "getFactMultiplierByDate",
    value: function getFactMultiplierByDate(sortedGrid, date) {
      var prevValuation = null;
      var prevPrice = null;
      var prevCount = null;
      var paymentSum = 0;
      var prevPaymentSum = 0;
      var hasSell = false;
      var multiplier = 1;
      sortedGrid.map(function (valuation, key) {
        if (key === 0) {
          //пропускаем первый шаг, там доходности не будет
          prevValuation = valuation;
          prevPrice = valuation.type === 'buy_trade' ? valuation.item.price : 0;
          prevCount = valuation.type === 'buy_trade' ? valuation.item.count : 0;
          return;
        }
        var count = InvestCalc.getCountByType(valuation);
        var price = InvestCalc.getPriceByType(valuation);
        var currentDate = InvestCalc.getDateByType(valuation);

        //получаем доходность на конкретную дату
        if (currentDate && currentDate.isSame(date)) {
          var profitStartDay = prevPrice * prevCount + prevPrice * (count ? count : prevCount) + prevPaymentSum;
          var profitEndDay = price * prevCount + price * (count ? count : prevCount);
          multiplier *= 1 + (profitEndDay / profitStartDay - 1);
        }
        if (valuation.type === 'buy_trade') {
          prevPrice = valuation.item.price;
          prevCount = valuation.item.count;
        } else if (valuation.type === 'valuation') {
          prevPrice = valuation.item.current_sum;
        } else if (valuation.type === 'sell_trade') {
          prevPrice = valuation.item.price;
          hasSell = true;
        }
        prevValuation = valuation;
      });
      return multiplier;
    }

    /**
     *
     * @param item
     * @return {Promise<*>}
     */
  }, {
    key: "getFactPercentByItem",
    value: (function () {
      var _getFactPercentByItem = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(item) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return InvestCalc.getFactPercentByActives([item]);
            case 2:
              return _context2.abrupt("return", _context2.sent);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getFactPercentByItem(_x2) {
        return _getFactPercentByItem.apply(this, arguments);
      }
      return getFactPercentByItem;
    }()
    /**
     *
     * @param item
     * @returns {*|moment.Moment}
     */
    )
  }, {
    key: "getDateByType",
    value: function getDateByType(item) {
      switch (item.type) {
        case 'buy_trade':
        case 'sell_trade':
          return (0, _moment["default"])(item.item.trade_at_date, 'DD.MM.YYYY');
        case 'valuation':
          if (item.morph === 'active.user.valuation') {
            return (0, _moment["default"])();
          }
          return (0, _moment["default"])(item.item.value_at_date, 'DD.MM.YYYY');
        case 'payment':
          return (0, _moment["default"])(item.item.paid_at_date, 'DD.MM.YYYY');
      }
    }

    /**
     *
     * @param item
     * @param type
     * @returns {*}
     */
  }, {
    key: "getPriceByType",
    value: function getPriceByType(item, type) {
      switch (item.type) {
        case 'buy_trade':
        case 'sell_trade':
          return item.item.price;
        case 'valuation':
          return item.item.current_sum;
      }
    }

    /**
     *
     * @param item
     * @returns {boolean}
     */
  }, {
    key: "getCountByType",
    value: function getCountByType(item) {
      switch (item.type) {
        case 'buy_trade':
        case 'sell_trade':
          return item.item.count;
        case 'valuation':
          return false;
      }
    }
  }, {
    key: "getGrid",
    value: function getGrid(active, now) {
      var grid = [];
      if (_ActiveConstants["default"].isPackage(active.type_id)) {
        var _active$attributes5, _active$attributes6, _active$attributes$se;
        if ((_active$attributes5 = active.attributes) !== null && _active$attributes5 !== void 0 && (_active$attributes5 = _active$attributes5.valuations) !== null && _active$attributes5 !== void 0 && _active$attributes5.length) {
          var _active$attributes$va3;
          (_active$attributes$va3 = active.attributes.valuations) === null || _active$attributes$va3 === void 0 || _active$attributes$va3.map(function (valuation) {
            grid.push({
              item: valuation,
              type: 'valuation'
            });
          });
        }
        if (active.attributes.buy_trades.length) {
          active.attributes.buy_trades.map(function (trade) {
            //для рассчёта оценки сделаем копию с ценой с учетом комиссии
            var copyTrade = new _BuyTrade["default"](_objectSpread({}, trade));
            copyTrade.price = trade.price + _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
            copyTrade.original_price = trade.original_price + _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
            grid.push({
              item: copyTrade,
              type: 'buy_trade'
            });
          });
        }
        if (active.attributes.sell_trades.length) {
          active.attributes.sell_trades.map(function (trade) {
            //для рассчёта оценки сделаем копию с ценой с учетом комиссии
            var copyTrade = new _SellTrade["default"](_objectSpread({}, trade));
            copyTrade.price = trade.price - _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
            copyTrade.original_price = trade.original_price - _ActiveValueCalculator["default"].getCommissionSum([trade]) / trade.count;
            grid.push({
              item: copyTrade,
              type: 'sell_trade'
            });
          });
        }
        if (((_active$attributes6 = active.attributes) === null || _active$attributes6 === void 0 || (_active$attributes6 = _active$attributes6.valuations) === null || _active$attributes6 === void 0 ? void 0 : _active$attributes6.length) === 0 && ((_active$attributes$se = active.attributes.sell_trades) === null || _active$attributes$se === void 0 ? void 0 : _active$attributes$se.length) === 0 && active.attributes.buy_trades.length > 0) {
          var lastTrade = active.attributes.buy_trades[active.attributes.buy_trades.length - 1];
          grid.push({
            item: {
              price: lastTrade.price,
              original_price: lastTrade.original_price,
              trade_at_date: lastTrade.value_at_date
            },
            type: 'sell_trade'
          });
        }
      } else {
        var _active$attributes7;
        if (active !== null && active !== void 0 && (_active$attributes7 = active.attributes) !== null && _active$attributes7 !== void 0 && (_active$attributes7 = _active$attributes7.valuations) !== null && _active$attributes7 !== void 0 && _active$attributes7.length) {
          var _active$attributes$va4;
          (_active$attributes$va4 = active.attributes.valuations) === null || _active$attributes$va4 === void 0 || _active$attributes$va4.map(function (valuation) {
            grid.push({
              item: valuation,
              type: 'valuation'
            });
          });
        }

        // if(active.payments.length)
        // {
        //   active.payments.map((payment) => {
        //     grid.push({
        //       item: payment,
        //       type: 'payment'
        //     })
        //   })
        // }

        //для рассчёта оценки сделаем копию с ценой с учетом комиссии
        var buyTrade = {};
        buyTrade.price = active.buy_sum;
        buyTrade.original_price = active.original_buy_sum;
        buyTrade.trade_at_date = active.buy_at_date;
        buyTrade.count = 1;
        grid.push({
          item: buyTrade,
          type: 'buy_trade'
        });
        if (active.sell_at) {
          //для рассчёта оценки сделаем копию с ценой с учетом комиссии
          var sellTrade = {};
          sellTrade.price = active.sell_sum;
          sellTrade.original_price = active.original_sell_sum;
          sellTrade.trade_at_date = active.sell_at_date;
          sellTrade.count = 1;
          grid.push({
            item: sellTrade,
            type: 'sell_trade'
          });
        } else if (active.sell) {
          var sell = active.sell.child_item;
          var _sellTrade2 = {};
          _sellTrade2.price = sell.sum;
          _sellTrade2.original_price = sell.original_sum;
          _sellTrade2.trade_at_date = sell.paid_at_date;
          _sellTrade2.count = 1;
          grid.push({
            item: _sellTrade2,
            type: 'sell_trade'
          });
        }
      }
      var sortedGrid = grid === null || grid === void 0 ? void 0 : grid.sort(function (a, b) {
        var firstDate = InvestCalc.getDateByType(a);
        var secondDate = InvestCalc.getDateByType(b);
        if (firstDate.isSame(secondDate)) {
          //продажу отодвигаем в конец
          if (a.type === 'sell_trade') {
            return 1;
          }
          if (b.type === 'sell_trade') {
            return -1;
          }
          if (a.type === 'valuation' || a.type === 'payment') {
            return 1;
          }
          if (b.type === 'valuation' || b.type === 'payment') {
            return -1;
          }
          return 0;
        }
        return firstDate - secondDate;
      });
      return sortedGrid;
    }

    /**
     *
     * @param actives
     * @return {number}
     */
  }, {
    key: "getValuation",
    value: function getValuation(actives) {
      var sum = 0;
      actives === null || actives === void 0 || actives.map(function (active) {
        var value = active.valuation;
        if (value > 0) {
          sum += value;
        }
      });
      return sum;
    }

    /**
     *
     * @param actives
     * @return {number}
     */
  }, {
    key: "getInsuranceValuation",
    value: function getInsuranceValuation(actives) {
      var sum = 0;
      actives.map(function (active) {
        var value = _Money["default"].toDigits(active.buy_sum);
        if (value > 0) {
          sum += value;
        }
      });
      return sum;
    }

    /**
     *
     * @param item
     * @returns {number}
     */
  }, {
    key: "getAnnuallyPercentByItem",
    value: (function () {
      var _getAnnuallyPercentByItem = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
        var profit, firstBuyDate, diffInDays, annulyProfit;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return InvestCalc.getFactPercentByItem(item);
            case 2:
              profit = _context3.sent;
              firstBuyDate = InvestCalc.getFirstBuyDate([item]);
              if (!firstBuyDate) {
                _context3.next = 9;
                break;
              }
              diffInDays = Math.abs(firstBuyDate.diff((0, _moment["default"])().startOf('day'), 'days'));
              profit -= 1;
              annulyProfit = Math.pow(profit + 1, 360 / diffInDays) - 1;
              return _context3.abrupt("return", annulyProfit);
            case 9:
              return _context3.abrupt("return", 0);
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getAnnuallyPercentByItem(_x3) {
        return _getAnnuallyPercentByItem.apply(this, arguments);
      }
      return getAnnuallyPercentByItem;
    }())
  }, {
    key: "getFirstBuyDays",
    value: function getFirstBuyDays(actives) {
      var nowDate = (0, _moment["default"])().startOf('day');
      var firstBuyDate = null;
      actives.map(function (active) {
        active.buy_trades.map(function (trade) {
          if (firstBuyDate === null) {
            firstBuyDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
          }
          var nextDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
          if (firstBuyDate.isAfter(nextDate)) {
            firstBuyDate = nextDate;
          }
        });
      });
      var diff = Math.abs(nowDate.diff(firstBuyDate, 'days'));
      return diff > 0 ? diff : 0;
    }

    /**
     *
     * @param actives
     * @returns {*}
     */
  }, {
    key: "getFirstBuyDate",
    value: function getFirstBuyDate(actives) {
      var firstBuyDate = null;
      actives.map(function (active) {
        if (_ActiveConstants["default"].isPackage(active.type_id)) {
          active.buy_trades.map(function (trade) {
            if (firstBuyDate === null) {
              firstBuyDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
            }
            var nextDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
            if (firstBuyDate.isAfter(nextDate)) {
              firstBuyDate = nextDate;
            }
          });
        } else {
          if (firstBuyDate === null) {
            firstBuyDate = (0, _moment["default"])(active.buy_at_date, 'DD.MM.YYYY');
          }
          var nextDate = (0, _moment["default"])(active.buy_at_date, 'DD.MM.YYYY');
          if (firstBuyDate.isAfter(nextDate)) {
            firstBuyDate = nextDate;
          }
        }
      });
      return firstBuyDate;
    }

    /**
     *
     * @param actives
     * @returns {number}
     *
     * тут считается так, у нас есть отрезок времени, например 10 дней для простоты возмём.
     *
     * в первый день я купил 10 акций по 100 и в пятый день купил 10 акций по 100, а на 7 день продал 10 акций
     *
     * изначально 0
     * 1.  +100 = 100
     * 2. +100 = 200
     * 3. +100 = 300
     * 4. +100 = 400
     * 5. +200 = 600
     * 6. +200 = 800
     * 7. +100 = 900
     * 8. +100 = 1000
     * 9. +100 = 1100
     * 10. +100 = 1200
     *
     *
     * сумму делим на количество дней
     * 1200 / 10 = 120 средняя
     */
  }, {
    key: "getAverageActivesCost",
    value: function getAverageActivesCost(actives) {
      var activesWithoutCurrency = actives.filter(function (active) {
        return active.type_id !== _ActiveConstants["default"].CURRENCY;
      });
      var sum = 0;
      var firstBuyDate = InvestCalc.getFirstBuyDate(activesWithoutCurrency);
      var nowDate = (0, _moment["default"])().startOf('day');
      var diffDays = nowDate.diff(firstBuyDate, 'days');
      while (firstBuyDate && firstBuyDate.isBefore(nowDate)) {
        activesWithoutCurrency.map(function (active) {
          var count = 0;
          var tradePrice = 0;
          var lastTradeDate = null;
          var valuePrice = 0;
          var lastValueDate = null;
          if (_ActiveConstants["default"].isPackage(active.type_id)) {
            var _active$attributes$va5;
            active.buy_trades.map(function (trade) {
              var tradeDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
              if (lastTradeDate === null) {
                lastTradeDate = tradeDate;
              }
              if (tradeDate.isSameOrBefore(firstBuyDate)) {
                count += trade.count;
                tradePrice = trade.price;
              }
            });
            active.buy_trades.map(function (trade) {
              /**
               * @var ActiveTradeCoupon $coupon
               */
              if (trade.coupons) {
                trade.coupons.map(function (coupon) {
                  if (coupon.is_confirmed) {
                    var couponDate = (0, _moment["default"])(coupon.paid_at_date, 'DD.MM.YYYY');
                    if (couponDate.isSame(nowDate)) {
                      sum += coupon.sum * count;
                    }
                  }
                });
              }
            });
            (_active$attributes$va5 = active.attributes.valuations) === null || _active$attributes$va5 === void 0 || _active$attributes$va5.map(function (valuation) {
              var valueDate;
              if (valuation.morph === 'active.user.valuation') {
                valueDate = (0, _moment["default"])();
              } else {
                valueDate = (0, _moment["default"])(valuation.value_at_date, 'DD.MM.YYYY');
              }
              lastValueDate = valueDate;
              if (valueDate.isSameOrBefore(firstBuyDate)) {
                valuePrice = valuation.current_sum;
              }
            });
            active.attributes.dividends.map(function (dividend) {
              var paidDate = (0, _moment["default"])(dividend.paid_at_date, 'DD.MM.YYYY');
              //
              // if(lastTradeDate === null)
              // {
              // lastValueDate = valueDate;
              // }

              if (paidDate.isSame(firstBuyDate)) {
                sum += dividend.sum * count;
              }
            });
            active.attributes.sell_trades.map(function (trade) {
              var tradeDate = (0, _moment["default"])(trade.trade_at_date, 'DD.MM.YYYY');
              lastTradeDate = tradeDate;
              if (tradeDate.isSameOrBefore(firstBuyDate)) {
                count -= trade.count;
              }
            });
          } else {
            var _active$attributes$va6;
            var tradeDate = (0, _moment["default"])(active.buy_at_date, 'DD.MM.YYYY');
            if (lastTradeDate === null) {
              lastTradeDate = tradeDate;
            }
            if (tradeDate.isSameOrBefore(firstBuyDate)) {
              count += 1;
              tradePrice = active.buy_sum;
            }
            (_active$attributes$va6 = active.attributes.valuations) === null || _active$attributes$va6 === void 0 || _active$attributes$va6.map(function (valuation) {
              var valueDate;
              if (valuation.morph === 'active.user.valuation') {
                valueDate = (0, _moment["default"])();
              } else {
                valueDate = (0, _moment["default"])(valuation.value_at_date, 'DD.MM.YYYY');
              }
              lastValueDate = valueDate;
              if (valueDate.isSameOrBefore(firstBuyDate)) {
                valuePrice = valuation.current_sum;
              }
            });
            if (active.sell_at) {
              var _tradeDate = (0, _moment["default"])(active.sell_at_date, 'DD.MM.YYYY');
              lastTradeDate = _tradeDate;
              if (_tradeDate.isSameOrBefore(firstBuyDate)) {
                count -= 1;
              }
            }
          }

          //если оценка была позже чем последняя сделка, то берем цену из оценки
          if (lastValueDate !== null && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0) {
            sum += count * valuePrice;
          } else if (lastTradeDate !== null && tradePrice > 0) {
            sum += count * tradePrice;
          }
        });
        firstBuyDate.add(1, 'days');
      }
      return sum / diffDays;
    }
  }, {
    key: "getWholeActivesSum",
    value: function getWholeActivesSum(state) {
      var _state$properties, _state$invests, _state$bankBalance, _state$brokerBalance, _state$cashBalance, _state$digitBalance;
      var sum = 0;
      sum += InvestCalc.getValuation((_state$properties = state.properties) !== null && _state$properties !== void 0 ? _state$properties : []);
      sum += InvestCalc.getValuation((_state$invests = state.invests) !== null && _state$invests !== void 0 ? _state$invests : []);
      sum += InvestCalc.getAccountValuation((_state$bankBalance = state.bankBalance) !== null && _state$bankBalance !== void 0 ? _state$bankBalance : 0);
      sum += InvestCalc.getAccountValuation((_state$brokerBalance = state.brokerBalance) !== null && _state$brokerBalance !== void 0 ? _state$brokerBalance : 0);
      sum += InvestCalc.getAccountValuation((_state$cashBalance = state.cashBalance) !== null && _state$cashBalance !== void 0 ? _state$cashBalance : 0);
      sum += InvestCalc.getAccountValuation((_state$digitBalance = state.digitBalance) !== null && _state$digitBalance !== void 0 ? _state$digitBalance : 0);
      return sum;
    }
  }, {
    key: "getWholeObligationSum",
    value: function getWholeObligationSum(state, birthAtDate) {
      var _state$obligations, _state$obligations2;
      var sum = 0;
      sum += InvestCalc.getObligationCurrent((_state$obligations = state.obligations) !== null && _state$obligations !== void 0 ? _state$obligations : []);
      sum += InvestCalc.getObligationLongTerm((_state$obligations2 = state.obligations) !== null && _state$obligations2 !== void 0 ? _state$obligations2 : [], birthAtDate);
      return sum;
    }

    /**
     *
     * @param array
     * @return {*|number}
     */
  }, {
    key: "getAccountValuation",
    value: function getAccountValuation(array) {
      return array.sum > 0 ? array.sum : 0;
    }

    /**
     *
     * @param array
     * @return {number}
     */
  }, {
    key: "getObligationCurrent",
    value: function getObligationCurrent(array) {
      var sum = 0;
      var now = (0, _moment["default"])();
      array === null || array === void 0 || array.map(function (item) {
        var obj = _Active["default"].getObligationCurrent(item, now);
        if (obj) {
          sum += parseFloat(obj.sum);
        }
        return null;
      });
      return sum;
    }

    /**
     *
     * @param array
     * @param birthAtDate
     * @return {number}
     */
  }, {
    key: "getObligationLongTerm",
    value: function getObligationLongTerm(array, birthAtDate) {
      var sum = 0;
      var now = (0, _moment["default"])();
      array === null || array === void 0 || array.map(function (item) {
        var obj = _Active["default"].getObligationLongTerm(item, now, (0, _moment["default"])(birthAtDate, 'DD.MM.YYYY'));
        if (obj) {
          sum += parseFloat(obj.sum);
        }
        return null;
      });
      return sum;
    }
  }]);
}();
var _default = exports["default"] = InvestCalc;