"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _UserTaskTypeConstants;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UserTaskTypeConstants = exports["default"] = /*#__PURE__*/function () {
  function UserTaskTypeConstants() {
    _classCallCheck(this, UserTaskTypeConstants);
  }
  return _createClass(UserTaskTypeConstants, null, [{
    key: "getStatuses",
    value: function getStatuses() {
      return [{
        id: UserTaskTypeConstants.CALLS,
        name: 'Звонок'
      }, {
        id: UserTaskTypeConstants.MEETINGS,
        name: 'Встреча'
      }, {
        id: UserTaskTypeConstants.CONSULTATION,
        name: 'Консультация'
      }, {
        id: UserTaskTypeConstants.LETTERS,
        name: 'Письмо'
      }, {
        id: UserTaskTypeConstants.OTHER,
        name: 'Прочее'
      }, {
        id: UserTaskTypeConstants.PERSONAL,
        name: 'Личное'
      }];
    }
  }, {
    key: "getTextByType",
    value: function getTextByType(type) {
      switch (type) {
        case UserTaskTypeConstants.CALLS:
          return 'Звонок';
        case UserTaskTypeConstants.MEETINGS:
          return 'Встреча';
        case UserTaskTypeConstants.CONSULTATION:
          return 'Консультация';
        case UserTaskTypeConstants.LETTERS:
          return 'Письмо';
        case UserTaskTypeConstants.BUSINESS:
        case UserTaskTypeConstants.OTHER:
          return 'Прочее';
        case UserTaskTypeConstants.DONE:
          return 'Выполнено';
        case UserTaskTypeConstants.BIRTH_DAY:
          return 'День рождения';
        case UserTaskTypeConstants.PERSONAL:
          return 'Личное';
        case UserTaskTypeConstants.MESSAGE:
          return 'Сообщение в чате';
      }
    }
  }]);
}();
_UserTaskTypeConstants = UserTaskTypeConstants;
_defineProperty(UserTaskTypeConstants, "CALLS", 1001);
_defineProperty(UserTaskTypeConstants, "MEETINGS", 1002);
_defineProperty(UserTaskTypeConstants, "CONSULTATION", 1003);
_defineProperty(UserTaskTypeConstants, "LETTERS", 1004);
_defineProperty(UserTaskTypeConstants, "BUSINESS", 1005);
_defineProperty(UserTaskTypeConstants, "OTHER", 1005);
_defineProperty(UserTaskTypeConstants, "DONE", 1006);
_defineProperty(UserTaskTypeConstants, "BIRTH_DAY", 1007);
_defineProperty(UserTaskTypeConstants, "PERSONAL", 1008);
_defineProperty(UserTaskTypeConstants, "MESSAGE", 1009);
_defineProperty(UserTaskTypeConstants, "statuses", [_UserTaskTypeConstants.CALLS, _UserTaskTypeConstants.MEETINGS, _UserTaskTypeConstants.CONSULTATION, _UserTaskTypeConstants.LETTERS, _UserTaskTypeConstants.OTHER, _UserTaskTypeConstants.DONE, _UserTaskTypeConstants.BIRTH_DAY, _UserTaskTypeConstants.PERSONAL, _UserTaskTypeConstants.MESSAGE]);