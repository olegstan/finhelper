"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ActiveConstants = _interopRequireDefault(require("../constants/ActiveConstants"));
var _Active = _interopRequireDefault(require("../helpers/Active"));
var _Active2 = _interopRequireDefault(require("../models/Active"));
var _Color = _interopRequireDefault(require("../helpers/Color"));
var _Money = _interopRequireDefault(require("../helpers/Money"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CaseGroupHelper = /*#__PURE__*/function () {
  function CaseGroupHelper() {
    _classCallCheck(this, CaseGroupHelper);
  }
  return _createClass(CaseGroupHelper, null, [{
    key: "getNameByGroup",
    value: function getNameByGroup(item, groupType) {
      var name = '';
      if (groupType === _ActiveConstants["default"].BY_TYPE) {
        name = _ActiveConstants["default"].getActiveNameByType(item);
      } else if (groupType === _ActiveConstants["default"].BY_GROUP) {
        name = _ActiveConstants["default"].getActiveNameByGroup(item);
      } else if (groupType === _ActiveConstants["default"].BY_ACCOUNT) {
        name = _ActiveConstants["default"].getAccountNameByActive(item);
      } else if (groupType === _ActiveConstants["default"].BY_COMPANY) {
        name = _ActiveConstants["default"].getActiveCompany(item);
      } else if (groupType === _ActiveConstants["default"].BY_NAME) {
        name = _Active["default"].getName(item);
      } else if (groupType === _ActiveConstants["default"].BY_CURRENCY) {
        name = _ActiveConstants["default"].getActiveCurrency(item);
      } else if (groupType === _ActiveConstants["default"].BY_BOND_DATE) {
        name = _ActiveConstants["default"].getBondDate(item);
      } else if (groupType === _ActiveConstants["default"].BY_BROKER_NAME) {
        name = _ActiveConstants["default"].getBondDate(item);
      }
      return name;
    }
  }, {
    key: "prepareSortedItems",
    value: function prepareSortedItems(actives, firstGroupType) {
      var sortedItems = [];
      var activeIndex = [];
      actives.map(function (item) {
        if (_ActiveConstants["default"].isPackage(item.type_id)) {
          var _item$attributes, _item$attributes2;
          (_item$attributes = item.attributes) === null || _item$attributes === void 0 || (_item$attributes = _item$attributes.buy_trades) === null || _item$attributes === void 0 || _item$attributes.map(function (trade) {
            var name = CaseGroupHelper.getNameByGroup(item, firstGroupType);
            var key = item.id + name;
            if (activeIndex.indexOf(key) === -1) {
              activeIndex.push(key);
            }
            if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
              sortedItems[activeIndex.indexOf(key)] = _Active2["default"].create(_objectSpread({}, item.attributes));
              sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
              sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
            }
            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades.push(_objectSpread({}, trade));
          });
          (_item$attributes2 = item.attributes) === null || _item$attributes2 === void 0 || (_item$attributes2 = _item$attributes2.sell_trades) === null || _item$attributes2 === void 0 || _item$attributes2.map(function (trade) {
            var name = CaseGroupHelper.getNameByGroup(item, firstGroupType);
            var key = item.id + name;
            if (activeIndex.indexOf(key) === -1) {
              activeIndex.push(key);
            }
            if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
              sortedItems[activeIndex.indexOf(key)] = _Active2["default"].create(_objectSpread({}, item.attributes));
              sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
              sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
            }
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades.push(_objectSpread({}, trade));
          });
        } else {
          var name = CaseGroupHelper.getNameByGroup(item, firstGroupType);
          var key = item.id + name + 'none';
          if (activeIndex.indexOf(key) === -1) {
            activeIndex.push(key);
          }
          if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
            sortedItems[activeIndex.indexOf(key)] = _Active2["default"].create(_objectSpread({}, item.attributes));
            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
          }
        }
      });
      return [sortedItems, activeIndex];
    }
  }, {
    key: "groupThreeLevels",
    value: function groupThreeLevels(actives, firstGroupType, secondGroupType, getNameFunc) {
      var index = [];
      var indexSecond = [];
      var indexThird = [];
      var data = [];
      var _CaseGroupHelper$prep = CaseGroupHelper.prepareSortedItems(actives, firstGroupType),
        _CaseGroupHelper$prep2 = _slicedToArray(_CaseGroupHelper$prep, 2),
        sortedItems = _CaseGroupHelper$prep2[0],
        activeIndex = _CaseGroupHelper$prep2[1];
      sortedItems.map(function (item) {
        var name = CaseGroupHelper.getNameByGroup(item, firstGroupType);
        if (index.indexOf(name) === -1) {
          index.push(name);
          var itemKey = index.indexOf(name);
          data[itemKey] = {};
          data[itemKey]['name'] = name;
          data[itemKey]['children'] = [];
          indexSecond[itemKey] = [];
          indexThird[itemKey] = [];
        }
      });
      sortedItems.map(function (item) {
        var firstName = CaseGroupHelper.getNameByGroup(item, firstGroupType);
        var secondName = CaseGroupHelper.getNameByGroup(item, secondGroupType);
        if (index.indexOf(firstName) !== -1) {
          var itemKey = index.indexOf(firstName);
          if (indexSecond[itemKey].indexOf(secondName) === -1) {
            indexSecond[itemKey].push(secondName);
          }
          var subItemKey = indexSecond[itemKey].indexOf(secondName);
          data[itemKey]['children'][subItemKey] = {};
          data[itemKey]['children'][subItemKey]['name'] = secondName;
          data[itemKey]['children'][subItemKey]['children'] = [];
          indexThird[itemKey][subItemKey] = [];
        }
      });
      var key = index.length;
      sortedItems.map(function (item) {
        var firstName = CaseGroupHelper.getNameByGroup(item, firstGroupType);
        var secondName = CaseGroupHelper.getNameByGroup(item, secondGroupType);
        if (item.valuation > 0) {
          var itemKey = index.indexOf(firstName);
          var subItemKey = indexSecond[itemKey].indexOf(secondName);
          var name = getNameFunc(item);
          if (indexThird[itemKey][subItemKey].indexOf(name) === -1) {
            indexThird[itemKey][subItemKey].push(name);
          }
          var subSubItemKey = indexThird[itemKey][subItemKey].indexOf(name);
          if (typeof data[itemKey]['children'][subItemKey]['children'][subSubItemKey] === 'undefined') {
            data[itemKey]['children'][subItemKey]['children'][subSubItemKey] = {};
            data[itemKey]['children'][subItemKey]['children'][subSubItemKey]['name'] = name;
            data[itemKey]['children'][subItemKey]['children'][subSubItemKey]['value'] = 0;
          }
          data[itemKey]['children'][subItemKey]['children'][subSubItemKey]['value'] += parseFloat(item.valuation);
          key++;
        }
      });
      return data;
    }
  }, {
    key: "groupFourLevels",
    value: function groupFourLevels(actives, firstGroupType, secondGroupType, thirdGroupType) {
      var index = [];
      var indexSecond = [];
      var data = [];
      var _CaseGroupHelper$prep3 = CaseGroupHelper.prepareSortedItems(actives, firstGroupType),
        _CaseGroupHelper$prep4 = _slicedToArray(_CaseGroupHelper$prep3, 2),
        sortedItems = _CaseGroupHelper$prep4[0],
        activeIndex = _CaseGroupHelper$prep4[1];
      var colorIndex = 0;
      var subColorIndex = 0;
      sortedItems.map(function (item) {
        var name = CaseGroupHelper.getNameByGroup(item, firstGroupType);
        if (index.indexOf(name) === -1) {
          index.push(name);
          var itemKey = index.indexOf(name);
          data[itemKey] = {};
          data[itemKey]['name'] = name;
          data[itemKey]['type'] = 'group';
          data[itemKey]['value1'] = 0;
          data[itemKey]['value2'] = 0;
          data[itemKey]['value3'] = 0;
          data[itemKey]['value4'] = 0;
          if (typeof _Color["default"].colors[colorIndex] === 'undefined') {
            colorIndex = 0;
          }
          data[itemKey]['colorIndex'] = colorIndex;
          data[itemKey]['color'] = _Color["default"].colors[colorIndex].color;
          colorIndex++;
        }
      });
      sortedItems.map(function (item) {
        var name = CaseGroupHelper.getNameByGroup(item, secondGroupType);
        if (index.indexOf(name) === -1) {
          index.push(name);
          var itemKey = index.indexOf(name);
          data[itemKey] = {};
          data[itemKey]['name'] = name;
          data[itemKey]['type'] = 'group';
          data[itemKey]['value1'] = 0;
          data[itemKey]['value2'] = 0;
          data[itemKey]['value3'] = 0;
          data[itemKey]['value4'] = 0;
          if (typeof _Color["default"].colors[colorIndex] === 'undefined') {
            colorIndex = 0;
          }
          data[itemKey]['colorIndex'] = colorIndex;
          // data[itemKey]['color'] = Color.colors[colorIndex].color;
          // colorIndex++;
        }
      });
      sortedItems.map(function (item) {
        var name = CaseGroupHelper.getNameByGroup(item, thirdGroupType);
        if (index.indexOf(name) === -1) {
          index.push(name);
          var itemKey = index.indexOf(name);
          data[itemKey] = {};
          data[itemKey]['name'] = name;
          data[itemKey]['type'] = 'group';
          data[itemKey]['value1'] = 0;
          data[itemKey]['value2'] = 0;
          data[itemKey]['value3'] = 0;
          data[itemKey]['value4'] = 0;
          if (typeof _Color["default"].colors[colorIndex] === 'undefined') {
            colorIndex = 0;
          }
          data[itemKey]['colorIndex'] = colorIndex;
          // data[itemKey]['color'] = Color.colors[colorIndex].color;
          // colorIndex++;
        }
      });
      var key = index.length;
      sortedItems.map(function (item) {
        var firstName = CaseGroupHelper.getNameByGroup(item, firstGroupType);
        var secondName = CaseGroupHelper.getNameByGroup(item, secondGroupType);
        var thirdName = CaseGroupHelper.getNameByGroup(item, thirdGroupType);
        if (item.valuation > 0) {
          var percent = item.factPercent;
          var type = _Active["default"].getName(item);
          var shortName = type;
          if (type.length > 38) {
            shortName = type.slice(0, 39) + '...';
          }
          data[key] = {};
          data[key]['name'] = shortName + ' - дох.: ' + _Money["default"].format((percent - 1) * 100, 2, ".", "") + '%';
          data[key]['type'] = 'active';
          data[key]['value1'] = parseFloat(item.valuation);
          data[key]['value2'] = 0;
          data[key]['value3'] = 0;
          var itemKey = index.indexOf(thirdName);
          data[itemKey]['value2'] += parseFloat(item.valuation);
          // colorIndex = data[itemKey]['colorIndex'];

          itemKey = index.indexOf(secondName);
          data[itemKey]['value3'] += parseFloat(item.valuation);
          itemKey = index.indexOf(firstName);
          data[itemKey]['value4'] += parseFloat(item.valuation);
          // colorIndex = data[itemKey]['colorIndex'];

          // let color = Color.colors[colorIndex];

          // if (typeof Color.colors[colorIndex].subColors[subColorIndex] === 'undefined') {
          //   subColorIndex = 0;
          // }
          // data[key]['color'] = Color.colors[colorIndex].subColors[subColorIndex];
          // subColorIndex++;

          key++;
        }
      });
      return data;
    }
  }, {
    key: "group",
    value: function group(actives, groupType) {
      var colors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Color["default"].colors;
      var sortCallback = arguments.length > 3 ? arguments[3] : undefined;
      var index = [];
      var data = [];
      var sortedItems = [];
      var activeIndex = [];
      actives.map(function (item) {
        if (_ActiveConstants["default"].isPackage(item.type_id)) {
          var _item$attributes3, _item$attributes4;
          (_item$attributes3 = item.attributes) === null || _item$attributes3 === void 0 || (_item$attributes3 = _item$attributes3.buy_trades) === null || _item$attributes3 === void 0 || _item$attributes3.map(function (trade) {
            var name = CaseGroupHelper.getNameByGroup(item, groupType);
            var key = item.id + name;
            if (activeIndex.indexOf(key) === -1) {
              activeIndex.push(key);
            }
            if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
              sortedItems[activeIndex.indexOf(key)] = _Active2["default"].create(_objectSpread({}, item.attributes));
              sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
              sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
            }
            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades.push(_objectSpread({}, trade));
          });
          (_item$attributes4 = item.attributes) === null || _item$attributes4 === void 0 || (_item$attributes4 = _item$attributes4.sell_trades) === null || _item$attributes4 === void 0 || _item$attributes4.map(function (trade) {
            var name = CaseGroupHelper.getNameByGroup(item, groupType);
            var key = item.id + name;
            if (activeIndex.indexOf(key) === -1) {
              activeIndex.push(key);
            }
            if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
              sortedItems[activeIndex.indexOf(key)] = _Active2["default"].create(_objectSpread({}, item.attributes));
              sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
              sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
            }
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades.push(_objectSpread({}, trade));
          });
        } else {
          var name = CaseGroupHelper.getNameByGroup(item, groupType);
          var key = item.id + name + 'none';
          if (activeIndex.indexOf(key) === -1) {
            activeIndex.push(key);
          }
          if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
            sortedItems[activeIndex.indexOf(key)] = _Active2["default"].create(_objectSpread({}, item.attributes));
            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
          }
        }
      });
      var colorIndex = 0;
      sortedItems.map(function (item) {
        var name = CaseGroupHelper.getNameByGroup(item, groupType);
        if (index.indexOf(name) === -1) {
          index.push(name);
        }
        var itemKey = index.indexOf(name);
        if (typeof data[itemKey] === 'undefined') {
          data[itemKey] = {};
          data[itemKey]['name'] = name;
          data[itemKey]['type'] = 'group';
          data[itemKey]['value1'] = 0;
          data[itemKey]['value2'] = 0;
          data[itemKey]['value3'] = 0;
        }
        data[itemKey]['value1'] += parseFloat(item.valuation);
      });
      if (typeof sortCallback === 'function') {
        data = data.sort(sortCallback);
      }
      data.map(function (item) {
        if (typeof colors[colorIndex] === 'undefined') {
          colorIndex = 0;
        }
        item.colorIndex = colorIndex;
        item.color = colors[colorIndex].color;
        colorIndex++;
        return item;
      });
      return data;
    }
  }]);
}();
var _default = exports["default"] = CaseGroupHelper;