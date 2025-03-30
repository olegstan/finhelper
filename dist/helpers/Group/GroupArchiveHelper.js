"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ActiveConstants = _interopRequireDefault(require("../../constants/ActiveConstants"));
var _Active = _interopRequireDefault(require("../../models/Active"));
var _AccountConstants = _interopRequireDefault(require("../../constants/AccountConstants"));
var _GroupHelper = _interopRequireDefault(require("./GroupHelper"));
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
var GroupArchiveHelper = /*#__PURE__*/function () {
  function GroupArchiveHelper() {
    _classCallCheck(this, GroupArchiveHelper);
  }
  return _createClass(GroupArchiveHelper, null, [{
    key: "prepareActives",
    value:
    /**
     *
     * @param actives
     * @param groupType
     * @param modelClass
     * @returns {*[]}
     */
    function prepareActives(actives, groupType) {
      var modelClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Active["default"];
      try {
        var activeSortedItems = [];
        var sortedItems = [];
        var activeSubIndex = [];
        actives.map(function (item) {
          var _item$attributes, _item$attributes2;
          var subkey = item.item_id ? item.item_type + '.' + item.item_id : item.name_text;
          if (activeSubIndex.indexOf(subkey) === -1) {
            activeSubIndex.push(subkey);
          }
          var keyId = activeSubIndex.indexOf(subkey);
          item.keyId = keyId;
          item.attributes.keyId = keyId;
          if (typeof activeSortedItems[keyId] === 'undefined') {
            activeSortedItems[keyId] = modelClass.create(_objectSpread({}, item.attributes));
            activeSortedItems[keyId].attributes.buy_trades = [];
            activeSortedItems[keyId].attributes.sell_trades = [];
          }
          (_item$attributes = item.attributes) === null || _item$attributes === void 0 || (_item$attributes = _item$attributes.buy_trades) === null || _item$attributes === void 0 || _item$attributes.map(function (trade) {
            activeSortedItems[keyId].attributes.buy_trades.push(_objectSpread({}, trade));
          });
          (_item$attributes2 = item.attributes) === null || _item$attributes2 === void 0 || (_item$attributes2 = _item$attributes2.sell_trades) === null || _item$attributes2 === void 0 || _item$attributes2.map(function (trade) {
            activeSortedItems[keyId].attributes.sell_trades.push(_objectSpread({}, trade));
          });
        });
        if (groupType === _ActiveConstants["default"].BY_TYPE) {
          sortedItems = activeSortedItems;
        } else if (groupType === _ActiveConstants["default"].BY_GROUP) {
          sortedItems = activeSortedItems;
        } else if (groupType === _ActiveConstants["default"].BY_ACCOUNT) {
          var activeIndex = [];
          activeSortedItems.map(function (item) {
            if (_ActiveConstants["default"].isPackage(item.type_id)) {
              var _item$attributes3, _item$attributes4, _item$attributes5, _item$attributes6;
              (_item$attributes3 = item.attributes) === null || _item$attributes3 === void 0 || (_item$attributes3 = _item$attributes3.buy_trades) === null || _item$attributes3 === void 0 || _item$attributes3.map(function (trade) {
                var account = _AccountConstants["default"].getAccountBySubAccountId(trade.from_account_id);
                var key = item.id + (account ? account.id : 'none');
                if (activeIndex.indexOf(key) === -1) {
                  activeIndex.push(key);
                }
                var keyId = activeIndex.indexOf(key);
                item.keyId = keyId;
                item.attributes.keyId = keyId;
                if (typeof sortedItems[keyId] === 'undefined') {
                  sortedItems[keyId] = modelClass.create(_objectSpread({}, item.attributes));
                  sortedItems[keyId].attributes.buy_trades = [];
                  sortedItems[keyId].attributes.sell_trades = [];
                }
              });
              (_item$attributes4 = item.attributes) === null || _item$attributes4 === void 0 || (_item$attributes4 = _item$attributes4.sell_trades) === null || _item$attributes4 === void 0 || _item$attributes4.map(function (trade) {
                var account;
                if (item.type_id === _ActiveConstants["default"].CURRENCY) {
                  account = _AccountConstants["default"].getAccountBySubAccountId(trade.to_account_id);
                } else {
                  account = _AccountConstants["default"].getAccountBySubAccountId(trade.from_account_id);
                }
                var key = item.id + (account ? account.id : 'none');
                if (activeIndex.indexOf(key) === -1) {
                  activeIndex.push(key);
                }
                var keyId = activeIndex.indexOf(key);
                item.keyId = keyId;
                item.attributes.keyId = keyId;
                if (typeof sortedItems[keyId] === 'undefined') {
                  sortedItems[keyId] = modelClass.create(_objectSpread({}, item.attributes));
                  sortedItems[keyId].attributes.buy_trades = [];
                  sortedItems[keyId].attributes.sell_trades = [];
                }
              });
              (_item$attributes5 = item.attributes) === null || _item$attributes5 === void 0 || (_item$attributes5 = _item$attributes5.buy_trades) === null || _item$attributes5 === void 0 || _item$attributes5.map(function (trade) {
                var account = _AccountConstants["default"].getAccountBySubAccountId(trade.from_account_id);
                var key = item.id + (account ? account.id : 'none');
                var keyId = activeIndex.indexOf(key);
                sortedItems[keyId].attributes.buy_trades.push(_objectSpread({}, trade));
              });
              (_item$attributes6 = item.attributes) === null || _item$attributes6 === void 0 || (_item$attributes6 = _item$attributes6.sell_trades) === null || _item$attributes6 === void 0 || _item$attributes6.map(function (trade) {
                var account;
                if (item.type_id === _ActiveConstants["default"].CURRENCY) {
                  account = _AccountConstants["default"].getAccountBySubAccountId(trade.to_account_id);
                } else {
                  account = _AccountConstants["default"].getAccountBySubAccountId(trade.from_account_id);
                }
                var key = item.id + (account ? account.id : 'none');
                var keyId = activeIndex.indexOf(key);
                sortedItems[keyId].attributes.sell_trades.push(_objectSpread({}, trade));
              });
            } else {
              var key = item.id + 'none';
              if (item.buy_account_id) {
                var account = _AccountConstants["default"].getAccountBySubAccountId(item.buy_account_idd);
                key = item.id + (account ? account.id : 'none');
              }
              if (activeIndex.indexOf(key) === -1) {
                activeIndex.push(key);
              }
              var keyId = activeIndex.indexOf(key);
              item.keyId = keyId;
              item.attributes.keyId = keyId;
              if (typeof sortedItems[keyId] === 'undefined') {
                sortedItems[keyId] = modelClass.create(_objectSpread({}, item.attributes));
                sortedItems[keyId].attributes.buy_trades = [];
                sortedItems[keyId].attributes.sell_trades = [];
              }
            }
          });
          _GroupHelper["default"].setValuation(sortedItems);
          _GroupHelper["default"].setPaidSum(sortedItems);
        }
        return _GroupHelper["default"].group(sortedItems, groupType);
      } catch (e) {
        console.log(e);
        return [];
      }
    }
  }]);
}();
var _default = exports["default"] = GroupArchiveHelper;