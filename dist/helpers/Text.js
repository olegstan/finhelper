export default class Text {
  static getYears(n) {
    n = parseInt(n);
    if (n === 1) {
      return 'год';
    }
    if (n > 1 && n < 5) {
      return 'года';
    }
    if (n >= 5) {
      return 'лет';
    }
  }
  static fio(client) {
    if (client.last_name && client.first_name && client.middle_name) {
      return (client.last_name ? client.last_name : '') + ' ' + (client.first_name ? client.first_name : '') + ' ' + (client.middle_name ? client.middle_name : '');
    }
    if (client.last_name && client.first_name) {
      return (client.last_name ? client.last_name : '') + ' ' + (client.first_name ? client.first_name : '');
    }
    if (client.name) {
      return client.name;
    }
    if (client.last_name) {
      return client.last_name;
    }
    if (client.email) {
      return client.email;
    }
  }
  static transliterate(word) {
    let a = {
      "Ё": "YO",
      "Й": "I",
      "Ц": "TS",
      "У": "U",
      "К": "K",
      "Е": "E",
      "Н": "N",
      "Г": "G",
      "Ш": "SH",
      "Щ": "SCH",
      "З": "Z",
      "Х": "H",
      "Ъ": "'",
      "ё": "yo",
      "й": "i",
      "ц": "ts",
      "у": "u",
      "к": "k",
      "е": "e",
      "н": "n",
      "г": "g",
      "ш": "sh",
      "щ": "sch",
      "з": "z",
      "х": "h",
      "ъ": "'",
      "Ф": "F",
      "Ы": "I",
      "В": "V",
      "А": "A",
      "П": "P",
      "Р": "R",
      "О": "O",
      "Л": "L",
      "Д": "D",
      "Ж": "ZH",
      "Э": "E",
      "ф": "f",
      "ы": "i",
      "в": "v",
      "а": "a",
      "п": "p",
      "р": "r",
      "о": "o",
      "л": "l",
      "д": "d",
      "ж": "zh",
      "э": "e",
      "Я": "Ya",
      "Ч": "CH",
      "С": "S",
      "М": "M",
      "И": "I",
      "Т": "T",
      "Ь": "'",
      "Б": "B",
      "Ю": "YU",
      "я": "ya",
      "ч": "ch",
      "с": "s",
      "м": "m",
      "и": "i",
      "т": "t",
      "ь": "'",
      "б": "b",
      "ю": "yu"
    };
    return word.split('').map(function (char) {
      return a[char] || char;
    }).join("");
  }
}