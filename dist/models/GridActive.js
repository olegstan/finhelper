"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));
var _Active = _interopRequireDefault(require("../helpers/Active"));
var _InvestCalc = _interopRequireDefault(require("../helpers/InvestCalc"));
var _BuyTrade = _interopRequireDefault(require("./BuyTrade"));
var _SellTrade = _interopRequireDefault(require("./SellTrade"));
var _Payment = _interopRequireDefault(require("./Payment"));
var _moment = _interopRequireDefault(require("moment/moment"));
var _ActiveValuer = _interopRequireDefault(require("./../helpers/Active/ActiveValuer"));
var _Catalog = _interopRequireDefault(require("./Catalog"));
var _helpers = require("../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GridActive = exports["default"] = /*#__PURE__*/function (_BaseModel) {
  /**
   *
   * @param {Array} attributes
   */
  function GridActive(attributes) {
    var _this;
    _classCallCheck(this, GridActive);
    _this = _callSuper(this, GridActive);
    /**
     *
     * @type {string}
     */
    _defineProperty(_this, "controller", 'active');
    _defineProperty(_this, "related", {
      'payments': {
        func: _Payment["default"].create,
        loaded: false
      },
      'buy_trades': {
        func: _BuyTrade["default"].create,
        loaded: false
      },
      'sell_trades': {
        func: _SellTrade["default"].create,
        loaded: false
      },
      'item': {
        func: _Catalog["default"].create,
        loaded: false
      },
      'trades': {
        loaded: false
      }
    });
    _this.attributes = attributes;
    _this.setGetters(attributes);
    return _this;
  }
  _inherits(GridActive, _BaseModel);
  return _createClass(GridActive, [{
    key: "avg_own_date_by_value",
    get: function get() {
      if (this['tmp_avg_own_date_by_value'] === null || typeof this['tmp_avg_own_date_by_value'] === 'undefined') {
        var trades = this.buy_trades;
        var date = null;
        var value = 0;
        if (trades.length) {
          trades.sort(function (a, b) {
            var dateA = (0, _moment["default"])(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
            var dateB = (0, _moment["default"])(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
            if (!dateA.isValid() || !dateB.isValid()) {
              return 0; // если дата невалидна, считаем их равными
            }
            return dateA - dateB;
          });
          for (var i = 0; i < trades.length; i++) {
            var trade = trades[i];
            if (trade.trade_at) {
              if (date) {
                //каждая следующая дата будет больше прошлой,
                //поэтому всегда двигаемся вперед
                //разница в днях
                var tradeDate = (0, _moment["default"])(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
                if (tradeDate.isValid()) {
                  var diffInDays = Math.abs(date.diff(tradeDate, 'days'));

                  //сумма объёмов
                  var sumValue = value + trade.count;
                  //пропорция
                  //из будущего объёма вычитаем текущий
                  var diffValue = trade.count - value;
                  //процентное соотношение к общему объёму
                  var percentValue = Math.abs(diffValue) / sumValue;
                  //среднее количество дней учитывая вес объема
                  var avgDays = diffInDays / 100 * percentValue;

                  //для следующей итерации сохраняем объём по текущей дате
                  value = sumValue;
                  if (diffValue > 0) {
                    date.add(avgDays, 'days');
                  } else {
                    var momentDate = (0, _moment["default"])(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss').clone().startOf('day');
                    if (momentDate.isValid()) {
                      date.add(avgDays, 'days');
                    }
                  }
                }
              } else {
                value = trade.count;
                var _momentDate = (0, _moment["default"])(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss').clone().startOf('day');
                if (_momentDate.isValid()) {
                  date = _momentDate;
                }
              }
            }
          }
        }
        this.attributes['tmp_avg_own_date_by_value'] = date ? date.format('DD.MM.YYYY') : '';
      }
      return this.attributes['tmp_avg_own_date_by_value'];
    }
  }, {
    key: "avg_own_date",
    get: function get() {
      if (this['tmp_avg_own_date'] === null || typeof this['tmp_avg_own_date'] === 'undefined') {
        var buyTrades = this.buy_trades;
        var sellTrades = this.sell_trades;
        var date = null;
        buyTrades.sort(function (a, b) {
          var dateA = (0, _moment["default"])(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          var dateB = (0, _moment["default"])(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          if (!dateA.isValid() || !dateB.isValid()) {
            return 0; // если дата невалидна, считаем их равными
          }
          return dateA - dateB;
        });
        sellTrades.sort(function (a, b) {
          var dateA = (0, _moment["default"])(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          var dateB = (0, _moment["default"])(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          if (!dateA.isValid() || !dateB.isValid()) {
            return 0; // если дата невалидна, считаем их равными
          }
          return dateA - dateB;
        });
        if (buyTrades !== null && buyTrades !== void 0 && buyTrades.length) {
          for (var i = 0; i < buyTrades.length; i++) {
            var trade = buyTrades[i];
            date = _Active["default"].getAvgDate(trade, date);
          }
          this['tmp_avg_own_date'] = date ? date.format('DD.MM.YYYY') : '';
        }
        if (sellTrades !== null && sellTrades !== void 0 && sellTrades.length) {
          for (var _i = 0; _i < sellTrades.length; _i++) {
            var _trade = sellTrades[_i];
            date = _Active["default"].getAvgDate(_trade, date);
          }
          this['tmp_avg_own_date'] = date ? date.format('DD.MM.YYYY') : '';
        }
      }
      return this['tmp_avg_own_date'];
    },
    set: function set(x) {
      this['tmp_avg_own_date'] = x;
    }
  }, {
    key: "trades",
    get: function get() {
      var _this2 = this;
      if (!this.related.trades.loaded) {
        var _this$tmp_trades;
        this['tmp_trades'] = [];
        if (this.attributes['sell_trades'] && this.attributes['sell_trades'].length) {
          this.attributes['sell_trades'].map(function (item) {
            var newTrade = _SellTrade["default"].create(_objectSpread({}, item));
            _this2['tmp_trades'].push(newTrade);
          });
        }
        if (this.attributes['buy_trades'] && this.attributes['buy_trades'].length) {
          this.attributes['buy_trades'].map(function (item) {
            var newTrade = _BuyTrade["default"].create(_objectSpread({}, item));
            _this2['tmp_trades'].push(newTrade);
          });
        }
        (_this$tmp_trades = this['tmp_trades']) === null || _this$tmp_trades === void 0 || _this$tmp_trades.sort(function (a, b) {
          var aDate = (0, _moment["default"])(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          var bDate = (0, _moment["default"])(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          if (a.active_id < b.active_id) {
            return -1;
          }
          if (b.active_id < a.active_id) {
            return 1;
          }
          if (aDate.isBefore(bDate)) {
            return -1;
          }
          if (bDate.isBefore(aDate)) {
            return 1;
          }
          return 0;
        });
        this.related.trades.loaded = true;
      }
      return this['tmp_trades'] ? this['tmp_trades'] : [];
    },
    set: function set(x) {
      this['tmp_trades'] = x;
    }
  }, {
    key: "payments",
    get: function get() {
      if (!this.related.payments.loaded && this.attributes['payments'] && this.attributes['payments'].length) {
        this['tmp_payments'] = this.attributes['payments'].map(function (item) {
          return _Payment["default"].create(item);
        });
        this.related.payments.loaded = true;
      }
      return this['tmp_payments'] ? this['tmp_payments'] : [];
    },
    set: function set(x) {
      this['tmp_payments'] = x;
    }
  }, {
    key: "buy_trades",
    get: function get() {
      if (!this.related.buy_trades.loaded && this.attributes['buy_trades'] && this.attributes['buy_trades'].length) {
        this['tmp_buy_trades'] = this.attributes['buy_trades'].map(function (item) {
          return new _BuyTrade["default"](item);
        });
        this.related.buy_trades.loaded = true;
      }
      return this['tmp_buy_trades'] ? this['tmp_buy_trades'] : [];
    },
    set: function set(x) {
      this['tmp_buy_trades'] = x;
    }
  }, {
    key: "sell_trades",
    get: function get() {
      if (!this.related.sell_trades.loaded && this.attributes['sell_trades'] && this.attributes['sell_trades'].length) {
        this['tmp_sell_trades'] = this.attributes['sell_trades'].map(function (item) {
          return new _SellTrade["default"](item);
        });
        this.related.sell_trades.loaded = true;
      }
      return this['tmp_sell_trades'] ? this['tmp_sell_trades'] : [];
    },
    set: function set(x) {
      this['tmp_sell_trades'] = x;
    }
  }, {
    key: "buySum",
    get: function get() {
      //если сумма в миллионах, то копейки отбросим
      var round = 2;
      if (this.buy_valuation > 1000000) {
        round = 0;
      }
      return _helpers.Money.format(this.buy_valuation, round);
    }
  }, {
    key: "buyOriginalSum",
    get: function get() {
      //если сумма в миллионах, то копейки отбросим
      var round = 2;
      if (this.buy_valuation > 1000000) {
        round = 0;
      }
      return _helpers.Money.format(this.buy_valuation, round);
    }
  }, {
    key: "period",
    get: function get() {
      var _this$attributes;
      return this === null || this === void 0 || (_this$attributes = this.attributes) === null || _this$attributes === void 0 ? void 0 : _this$attributes.period;
    }
  }, {
    key: "originDiffSum",
    get: function get() {
      var _this$attributes2, _this$attributes3, _this$attributes4;
      //если сумма в миллионах, то копейки отбросим
      var round = 2;
      if ((this === null || this === void 0 || (_this$attributes2 = this.attributes) === null || _this$attributes2 === void 0 ? void 0 : _this$attributes2.diff) > 1000000 || (this === null || this === void 0 || (_this$attributes3 = this.attributes) === null || _this$attributes3 === void 0 ? void 0 : _this$attributes3.diff) < -1000000) {
        round = 0;
      }
      return Math.round(this === null || this === void 0 || (_this$attributes4 = this.attributes) === null || _this$attributes4 === void 0 ? void 0 : _this$attributes4.diff, round);
    }
  }, {
    key: "diffSum",
    get: function get() {
      var _this$attributes5, _this$attributes6, _this$attributes7;
      //если сумма в миллионах, то копейки отбросим
      var round = 2;
      if ((this === null || this === void 0 || (_this$attributes5 = this.attributes) === null || _this$attributes5 === void 0 ? void 0 : _this$attributes5.diff) > 1000000 || (this === null || this === void 0 || (_this$attributes6 = this.attributes) === null || _this$attributes6 === void 0 ? void 0 : _this$attributes6.diff) < -1000000) {
        round = 0;
      }
      return Math.round(this === null || this === void 0 || (_this$attributes7 = this.attributes) === null || _this$attributes7 === void 0 ? void 0 : _this$attributes7.diff, round);
    }
  }, {
    key: "valuation",
    get: function get() {
      if (this.attributes.valuation) {
        var _this$attributes8, _this$attributes9, _this$attributes10;
        //если сумма в миллионах, то копейки отбросим
        var round = 2;
        if (((_this$attributes8 = this.attributes) === null || _this$attributes8 === void 0 || (_this$attributes8 = _this$attributes8.valuation) === null || _this$attributes8 === void 0 ? void 0 : _this$attributes8.sum) > 1000000 || (this === null || this === void 0 || (_this$attributes9 = this.attributes) === null || _this$attributes9 === void 0 || (_this$attributes9 = _this$attributes9.valuation) === null || _this$attributes9 === void 0 ? void 0 : _this$attributes9.sum) < -1000000) {
          round = 0;
        }
        return Math.round((_this$attributes10 = this.attributes) === null || _this$attributes10 === void 0 || (_this$attributes10 = _this$attributes10.valuation) === null || _this$attributes10 === void 0 ? void 0 : _this$attributes10.sum, round);
      }
      return 0;
    }
  }, {
    key: "originValuation",
    get: function get() {
      if (this.attributes.origin_valuation) {
        var _this$attributes11, _this$attributes12, _this$attributes13;
        //если сумма в миллионах, то копейки отбросим
        var round = 2;
        if (((_this$attributes11 = this.attributes) === null || _this$attributes11 === void 0 || (_this$attributes11 = _this$attributes11.origin_valuation) === null || _this$attributes11 === void 0 ? void 0 : _this$attributes11.sum) > 1000000 || (this === null || this === void 0 || (_this$attributes12 = this.attributes) === null || _this$attributes12 === void 0 || (_this$attributes12 = _this$attributes12.origin_valuation) === null || _this$attributes12 === void 0 ? void 0 : _this$attributes12.sum) < -1000000) {
          round = 0;
        }
        return Math.round((_this$attributes13 = this.attributes) === null || _this$attributes13 === void 0 || (_this$attributes13 = _this$attributes13.origin_valuation) === null || _this$attributes13 === void 0 ? void 0 : _this$attributes13.sum, round);
      }
      return 0;
    },
    set: function set(x) {
      this['tmp_originValuation'] = x;
    }
  }, {
    key: "originValuationWithCurrency",
    get: function get() {
      //проверим что в аттрибутах уже есть поле valuation или origin_valuation
      if (this.attributes.origin_valuation) {
        var _this$attributes14, _this$attributes15;
        return _helpers.Money.format((_this$attributes14 = this.attributes) === null || _this$attributes14 === void 0 || (_this$attributes14 = _this$attributes14.origin_valuation) === null || _this$attributes14 === void 0 ? void 0 : _this$attributes14.sum) + ' ' + ((_this$attributes15 = this.attributes) === null || _this$attributes15 === void 0 || (_this$attributes15 = _this$attributes15.origin_valuation) === null || _this$attributes15 === void 0 ? void 0 : _this$attributes15.sign);
      }
      return '';
    }
  }, {
    key: "getFactPercent",
    value: function () {
      var _getFactPercent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getFactPercent() {
        return _getFactPercent.apply(this, arguments);
      }
      return getFactPercent;
    }()
  }, {
    key: "factPercent",
    get: function get() {},
    set: function set(x) {
      this['tmp_factPercent'] = x;
    }
  }, {
    key: "getAnnuallyPercent",
    value: function () {
      var _getAnnuallyPercent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getAnnuallyPercent() {
        return _getAnnuallyPercent.apply(this, arguments);
      }
      return getAnnuallyPercent;
    }()
  }, {
    key: "annuallyPercent",
    get: function get() {},
    set: function set(x) {}
  }, {
    key: "item",
    get: function get() {
      if (!this.related.item.loaded && this.attributes['item']) {
        this['tmp_item'] = new _Catalog["default"](this.attributes['item']);
        this.related.item.loaded = true;
      }
      return this['tmp_item'] ? this['tmp_item'] : new _Catalog["default"]({});
    }
  }]);
}(_BaseModel2["default"]);