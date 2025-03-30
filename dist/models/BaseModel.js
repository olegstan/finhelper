"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _laravelRequest = require("laravel-request");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseModel = exports["default"] = /*#__PURE__*/function () {
  /**
   *
   * @param {Array} attributes
   */
  function BaseModel(attributes) {
    _classCallCheck(this, BaseModel);
    /**
     *
     * @type {Array}
     */
    _defineProperty(this, "attributes", []);
    /**
     *
     * @type {{}}
     */
    _defineProperty(this, "related", {});
    /**
     *
     * @type {string}
     */
    _defineProperty(this, "controller", '');
    this.attributes = attributes;
    this.setGetters(attributes);
  }

  /**
   *
   * @return {*}
   */
  return _createClass(BaseModel, [{
    key: "id",
    get: function get() {
      return this.attributes.id;
    }

    /**
     *
     * @param x
     */,
    set: function set(x) {
      this.attributes.id = x;
    }

    /**
     *
     * @param attributes
     * @return {BaseModel}
     */
  }, {
    key: "setGetters",
    value:
    /**
     *
     * @param attributes
     * @return {*}
     *
     * в JavaScript, свойства дочернего класса инициализируются
     * после вызова конструктора родительского класса.
     * Это означает, что внутри конструктора родительского
     * класса вы не сможете обратиться к свойствам, определенным в
     * дочернем классе, потому что они еще не были созданы.
     */
    function setGetters(attributes) {
      var _this = this;
      var _loop = function _loop(index) {
        if (typeof _this.related[index] !== 'undefined' || index === 'attributes' || index === 'related' || index === 'modelFields' || index === 'currencyFields') {} else {
          try {
            Object.defineProperty(_this, index, {
              get: function get() {
                return this.attributes[index];
              },
              set: function set(x) {
                this.attributes[index] = x;
              }
            });
          } catch (e) {
            console.warn(e.message);
          }
        }
      };
      for (var index in attributes) {
        _loop(index);
      }
    }

    /**
     *
     * @param prop
     * @returns {*}
     */
  }, {
    key: "get",
    value: function get(prop) {
      if (typeof this.attributes[prop] === "undefined") return null;else return this.attributes[prop];
    }

    /**
     *
     * @param prop
     * @param value
     */
  }, {
    key: "set",
    value: function set(prop, value) {
      this.attributes[prop] = value;
    }
  }], [{
    key: "create",
    value: function create(attributes) {
      return new this(attributes);
    }

    /**
     *
     * @param array
     * @returns {*}
     */
  }, {
    key: "load",
    value: function load(array) {
      var _this2 = this;
      return array.map(function (item) {
        return _this2.create(item);
      });
    }

    /**
     *
     * @return {BaseModel}
     */
  }, {
    key: "getInstance",
    value: function getInstance() {
      return new this();
    }

    /**
     *
     * @param params
     * @return {*}
     */
  }, {
    key: "fetch",
    value: function fetch() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var method = 'index';
      return _laravelRequest.Api.get(this.getInstance().controller, method, params);
    }
  }]);
}();