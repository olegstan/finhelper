import moment from "moment/moment";
import ActiveConstants from "../constants/ActiveConstants";
import CurrencyConstants from "../constants/CurrencyConstants";
import exactMath from "exact-math";
export default class Money {
  static formatForInput(amount, decimalCount = 2, decimalSign = ".", thousands = " ") {
    try {
      if (amount === '') {
        return '';
      }
      const __ret = this.getDecimal(decimalCount, amount);
      decimalCount = __ret.decimalCount;
      const negativeSign = __ret.negativeSign;
      let amountInt = parseInt(amount = Math.abs(Number(amount) || '').toFixed(decimalCount)).toString();
      let amountFloat = Math.abs(amount - amountInt);
      let j = amountInt.length > 3 ? amountInt.length % 3 : 0;
      return negativeSign + (j ? amountInt.substr(0, j) + thousands : '') + amountInt.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimalSign + amountFloat.toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.error(e);
      return '';
    }
  }
  static getDecimal(decimalCount, amount) {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? '' : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    return {
      decimalCount,
      negativeSign
    };
  }

  //TODO написать проверку, если цифра заканчивается на больше e+20, такие числа toFixed не может правильно обработать
  static format = (amount, decimalCount = 2, decimalSign = ".", thousands = " ") => {
    try {
      if (typeof amount === 'number') {
        amount = amount.toString();
      }
      if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(/,/g, '.').replace(/ /g, ''));
      }
      if (amount === '') {
        return '';
      }
      if (amount === 0) {
        return 0;
      }
      if (isNaN(amount)) {
        try {
          throw new Error('Error number is NaN');
        } catch (e) {
          console.error(e.stack);
        }
        return 0;
      }
      if (!isFinite(amount)) {
        return '∞';
      }
      const __ret = this.getDecimal(decimalCount, amount);
      decimalCount = __ret.decimalCount;
      const negativeSign = __ret.negativeSign;
      let amountInt = parseInt(amount = Math.abs(Number(amount) || '')).toString();
      let amountFloat = Money.toFixed(Math.abs(exactMath.sub(amount, amountInt)), decimalCount).slice(2); //убрали 0. ноль и точку

      amountFloat = amountFloat.replace(/([0]{0,100})$/, '');
      let j = amountInt.length > 3 ? amountInt.length % 3 : 0;
      return negativeSign + (j ? amountInt.substr(0, j) + thousands : '') + amountInt.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount && amountFloat > 0 ? decimalSign + amountFloat : "");
    } catch (e) {
      console.error(e);
      return '';
    }
  };

  /**
   *
   * @param num
   * @param fix
   * @return {string|*}
   */
  static toFixed(num, fix) {
    if (typeof num === 'number') {
      num = num.toString();
    }
    if (typeof num === 'string') {
      let decimalIndex = num.toString().indexOf('.');

      // Если десятичная точка не найдена, выводим исходное число
      if (decimalIndex === -1) {
        return num.replace('.', ''); //удалим точку
      } else {
        if (fix === 0) {
          return Math.trunc(num).toString();
        }

        // Получаем подстроку числа, включая нужное количество знаков после точки
        return num.toString().substring(0, decimalIndex + fix + 1);
      }
    }
  }

  /**
   *
   * @param amount
   * @param fix
   * @param space
   * @return {*|string}
   */
  static toThousands(amount, fix = 2, space = '') {
    let preparedAmount = Math.abs(amount);
    if (preparedAmount >= 1000000000) {
      return Money.toFixed(amount / 1000000000, fix) + space + 'B';
    } else if (preparedAmount >= 1000000) {
      return Money.toFixed(amount / 1000000, fix) + space + 'M';
    } else if (preparedAmount >= 1000) {
      return Money.toFixed(amount / 1000, fix) + space + 'K';
    } else {
      return Money.toFixed(amount, fix);
    }
  }
  static getAccumulatedCouponIncome(startDate, endDate, nominal, rate, ratePeriodTypeId) {
    let nowDate = moment();
    let period = 0;
    let delimiter = 0;
    switch (ratePeriodTypeId) {
      case ActiveConstants.DAILY:
        break;
      case ActiveConstants.WEEKLY:
        break;
      case ActiveConstants.MONTHLY:
        period = 1;
        delimiter = 12;
        break;
      case ActiveConstants.QUARTER:
        period = 3;
        delimiter = 4;
        break;
      case ActiveConstants.HALFYEAR:
        period = 6;
        delimiter = 2;
        break;
      case ActiveConstants.YEARLY:
        period = 12;
        delimiter = 1;
        break;
    }
    let periodDays = Math.abs(startDate.diff(endDate, 'days', true));
    let couponDiffDays = Math.abs(startDate.diff(nowDate, 'days'));
    return nominal * (rate / 100 / delimiter) / periodDays * couponDiffDays;
  }

  /**
   *
   * @param sum
   * @returns {number}
   */
  static toDigits(sum) {
    if (typeof sum === 'number') {
      sum = sum.toString();
    }
    if (typeof sum === 'string') {
      return parseFloat(sum.replace(/,/g, '.').replace(/ /g, ''));
    }
  }
  static getCourseByCurrencyId(courses, id) {
    let course = null;
    if (courses) {
      courses.map(item => {
        if (item.cb_currency.currency.id === id) {
          course = item;
        }
      });
    }
    return course;
  }

  /**
   *
   * @param sum
   * @param fromCurrencyId
   * @param toCurrencyId
   * @param courses
   * @returns {*}
   */
  static convert(sum, fromCurrencyId, toCurrencyId, courses = CurrencyConstants.courses) {
    try {
      if (courses.length > 0 && fromCurrencyId && toCurrencyId) {
        let fromCurrencyCourse = Money.getCourseByCurrencyId(courses, fromCurrencyId);
        let toCurrencyCourse = Money.getCourseByCurrencyId(courses, toCurrencyId);
        if (fromCurrencyId === toCurrencyId) {
          return sum;
        }

        //если выбранная валюта рубль, тогда просто изпользуем
        //базу курсов с учётом даты
        if (fromCurrencyId === CurrencyConstants.RUBBLE_ID) {
          return sum * toCurrencyCourse.value / toCurrencyCourse.nominal;
        }
        if (toCurrencyId === CurrencyConstants.RUBBLE_ID) {
          return sum * (1 / fromCurrencyCourse.value / fromCurrencyCourse.nominal);
        }
        return sum * (toCurrencyCourse.value / toCurrencyCourse.nominal) / (fromCurrencyCourse.value / fromCurrencyCourse.nominal);
      } else {
        return 0;
      }
    } catch (e) {
      console.warn(e.message);
      return 0;
    }
  }
}