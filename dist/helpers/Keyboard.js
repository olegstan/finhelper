"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Keyboard = exports["default"] = /*#__PURE__*/function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);
  }
  return _createClass(Keyboard, null, [{
    key: "mount",
    value: function mount(callback) {
      Keyboard.func = function (event) {
        // if (eventPrevented)
        // {
        //   return; // Do nothing if the event was already processed
        // }

        callback(event.key);

        // switch (event.key)
        // {
        //   case "Down": // IE/Edge specific value
        //   case "ArrowDown":
        //     // Do something for "down arrow" key press.
        //     break;
        //   case "Up": // IE/Edge specific value
        //   case "ArrowUp":
        //     // Do something for "up arrow" key press.
        //     break;
        //   case "Left": // IE/Edge specific value
        //   case "ArrowLeft":
        //     // Do something for "left arrow" key press.
        //     break;
        //   case "Right": // IE/Edge specific value
        //   case "ArrowRight":
        //     // Do something for "right arrow" key press.
        //     break;
        //   case "Enter":
        //     // Do something for "enter" or "return" key press.
        //     break;
        //   case "Esc": // IE/Edge specific value
        //   case "Escape":
        //     // Do something for "esc" key press.
        //     break;
        //   default:
        //     return; // Quit when this doesn't handle the key event.
        // }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      };
      window.addEventListener("keydown", Keyboard.func, true);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      window.removeEventListener("keydown", Keyboard.func);
    }
  }]);
}();
_defineProperty(Keyboard, "func", function () {});