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
var Color = exports["default"] = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }
  return _createClass(Color, null, [{
    key: "getColorByCategory",
    value: function getColorByCategory(category) {
      var data = {
        "Продукты": "#6FCA9E",
        "Кафе и рестораны": "#92CF88",
        "Машина": "#36B2AB",
        "Транспорт": "#5DD1D9",
        "Медицина": "#2CC0FF",
        "Салон красоты": "#9253E9",
        "Одежда взрослая": "#EF5E70",
        "Одежда детская": "#FFA429",
        "Детские игрушки": "#EF785E",
        "Отпуск": "#F2E6A1",
        "Образование": "#5F76F2",
        "Аренда жилья": "#84A6FB",
        "Досуг и развлечения": "#C96BE0",
        "Подарки": "#E479C0",
        "Спорт": "#FF624D",
        "Связь и ТВ": "#2CA6FF",
        "Без категории": "#DBDFE3",
        "Другое": "#DBDFE3",
        "Заработная плата": "#EF5E70",
        "Премия": "#FFA429",
        "Пенсия": "#F2E6A1",
        "Рента": "#6FCA9E",
        "Помощь от близких": "#5F76F2",
        "Доход от бизнеса": "#FF624D",
        "Агентское вознагр.": "#9253E9"
      };
      if (typeof category.name === 'string' && typeof data[category.name] !== 'undefined') {
        return data[category.name];
      } else if (category.color) {
        return category.color;
      } else {
        return '#7F818D';
      }
    }
  }, {
    key: "getColorByGroup",
    value: function getColorByGroup(category) {
      var data = {
        "Акции": "#EF785E",
        "Валюта": "#6FCA9E",
        "Облигации": "#EF5E70",
        "Металлы": "#ca6f9b",
        "Недвижимость": "#6f9bca",
        "Альтернативные инвестиции": "#D7DBE0",
        "Прямые инвестиции": "#6fc9ca",
        "Инструменты денежного рынка": "#9bca6f"
      };
      if (typeof category.name === 'string' && typeof data[category.name] !== 'undefined') {
        return data[category.name];
      } else if (category.color) {
        return category.color;
      } else {
        return '#7F818D';
      }
    }
  }, {
    key: "increaseBrightness",
    value: function increaseBrightness(col, amt) {
      var usePound = false;
      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }
      var num = parseInt(col, 16);
      var r = (num >> 16) + amt;
      if (r > 255) {
        r = 255;
      } else if (r < 0) {
        r = 0;
      }
      var b = (num >> 8 & 0x00FF) + amt;
      if (b > 255) {
        b = 255;
      } else if (b < 0) {
        b = 0;
      }
      var g = (num & 0x0000FF) + amt;
      if (g > 255) {
        g = 255;
      } else if (g < 0) {
        g = 0;
      }
      return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
    }
  }]);
}();
_defineProperty(Color, "colors", [{
  color: '#2CC0FF',
  subColors: ['#41c6ff', '#56ccff', '#6bd2ff', '#80d9ff', '#95dfff']
}, {
  color: '#9253E9',
  subColors: ['#9253E9', '#9c64eb', '#a775ed', '#b286ef', '#bd97f1', '#c8a9f4']
}, {
  color: '#EF5E70',
  subColors: ['#f06e7e', '#f27e8c', '#f38e9a', '#f59ea9', '#f7aeb7']
}, {
  color: '#5DD1D9',
  subColors: ['#6dd5dc', '#7ddae0', '#8ddee4', '#9de3e8', '#aee8ec']
}, {
  color: '#F2E6A1',
  subColors: ['#F2E6A1', '#f3e8aa', '#f4ebb3', '#f5edbd', '#f7f0c6']
}, {
  color: '#6FCA9E',
  subColors: ['#6fca9e', '#7dcfa7', '#8bd4b1', '#9ad9bb', '#a8dfc4']
}, {
  color: '#ffad3e',
  subColors: ['#ffad3e', '#ffb551', '#ffbd64', '#ffc577', '#ffcd8b']
}, {
  color: '#ffa094',
  subColors: ['#ff715e', '#ff8170', '#ff9182', '#ffa094', '#ffb0a6']
}, {
  color: '#EF553B',
  subColors: ['#f0664e', '#f27662', '#f38875', '#f59989', '#f7aa9d']
}, {
  color: '#FF97FF',
  subColors: ['#ffa1ff', '#ffabff', '#ffb6ff', '#ffc0ff', '#ffcbff']
}, {
  color: '#3D85C6',
  subColors: ['#5091cb', '#639dd1', '#77a9d7', '#8ab5dc', '#9ec2e2']
}, {
  color: '#8FCE00',
  subColors: ['#9ad219', '#a5d732', '#b0dc4c', '#bbe166', '#c7e67f']
}]);