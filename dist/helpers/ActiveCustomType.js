"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ActiveCustomType = exports["default"] = /*#__PURE__*/function () {
  function ActiveCustomType() {
    _classCallCheck(this, ActiveCustomType);
  }
  return _createClass(ActiveCustomType, null, [{
    key: "getColor",
    value: function getColor(budget, types, type) {
      var color = null;
      if (budget.type_id === '') {
        color = null;
      } else {
        var typeId = parseInt(budget.type_id);
        var customTypeId = parseInt(budget.custom_type_id);
        types.map(function (item) {
          if (typeId === type) {
            if (parseInt(item.type_id) === customTypeId) {
              color = item.color;
            }
          } else if (item.id === typeId) {
            color = item.color;
          }
        });
      }
      return color;
    }
  }, {
    key: "getIcon",
    value: function getIcon(budget, types, type) {
      var icon = null;
      if (budget.type_id === '') {
        icon = 'non_category.svg';
      } else {
        var typeId = parseInt(budget.type_id);
        var customTypeId = parseInt(budget.custom_type_id);
        types.map(function (item) {
          if (typeId === type) {
            if (parseInt(item.type_id) === customTypeId) {
              icon = item.icon;
            }
          } else if (item.id === typeId) {
            icon = item.icon;
          }
        });
      }
      if (icon) {
        return icon;
      } else {
        return 'non_category.svg';
      }
    }
  }, {
    key: "getName",
    value: function getName(budget, types, type) {
      var name = null;
      if (budget.type_id === '') {
        name = 'Новая';
      } else {
        var typeId = parseInt(budget.type_id);
        var customTypeId = parseInt(budget.custom_type_id);
        types.map(function (item) {
          if (typeId === type) {
            if (parseInt(item.type_id) === customTypeId) {
              name = item.name;
            }
          } else if (item.id === typeId) {
            name = item.name;
          }
        });
      }
      return name;
    }
  }, {
    key: "getItem",
    value: function getItem(budget, types, type) {
      var foundItem = null;
      if (budget.type_id === '') {
        foundItem = null;
      } else {
        var typeId = parseInt(budget.type_id);
        var customTypeId = parseInt(budget.custom_type_id);
        types.map(function (item) {
          if (typeId === type) {
            if (parseInt(item.type_id) === customTypeId) {
              foundItem = item;
            }
          } else if (item.id === typeId) {
            foundItem = item;
          }
        });
      }
      return foundItem;
    }
  }]);
}();