import moment from "moment/moment";
import ActiveConstants from "../constants/ActiveConstants";
import CurrencyConstants from "../constants/CurrencyConstants";
import exactMath from "exact-math";

export default class Money
{
  static formatForInput(amount, decimalCount = 2, decimalSign = ".", thousands = " ")
  {
    try
    {
      if (amount === '')
      {
        return '';
      }

      const __ret = Money.getDecimal(decimalCount, amount);
      decimalCount = __ret.decimalCount;
      const negativeSign = __ret.negativeSign;

      let amountInt = parseInt(amount = Math.abs(Number(amount) || '').toFixed(decimalCount)).toString();
      let amountFloat = Math.abs(amount - amountInt);

      let j = (amountInt.length > 3) ? amountInt.length % 3 : 0;

      return (negativeSign + (j ? amountInt.substr(0, j) + thousands : '') + amountInt.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimalSign + amountFloat.toFixed(decimalCount).slice(2) : ""));
    } catch (e)
    {
      console.error(e)
      return '';
    }
  }

  static getDecimal(decimalCount, amount)
  {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? '' : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";
    return {decimalCount, negativeSign};
  }

//TODO написать проверку, если цифра заканчивается на больше e+20, такие числа toFixed не может правильно обработать
  static format = (amount, decimalCount = 2, decimalSign = ".", thousands = " ") =>
  {
    try {
      // 1) Переводим входные данные в число
      let numberValue;
      if (typeof amount === 'number') {
        numberValue = amount;
      } else if (typeof amount === 'string') {
        // Заменяем запятые на точки, убираем лишние пробелы
        numberValue = parseFloat(amount.replace(/,/g, '.').replace(/ /g, ''));
      } else {
        numberValue = parseFloat(amount);
      }

      // 2) Спец. случаи
      if (numberValue === '') {
        return '';
      }
      if (numberValue === 0) {
        // Явный ноль (считаем, что хотим вернуть "0" как строку)
        return '0';
      }
      if (isNaN(numberValue)) {
        // Ошибка, число не распарсилось
        try {
          throw new Error('Error number is NaN');
        } catch (e) {
          // console.warn(e.stack);
        }
        return '0';
      }
      if (!isFinite(numberValue)) {
        // Бесконечность
        return '∞';
      }

      const isNegative = numberValue < 0;
      const absAmount = Math.abs(numberValue);

      // 4) Преобразуем число в строку без экспоненциальной записи
      let strVal;
      if (absAmount < 1e-6 || absAmount >= 1e15) {
        // Для очень маленьких или больших чисел
        strVal = absAmount.toFixed(decimalCount);
      } else {
        // Для обычных чисел
        strVal = absAmount.toString();
      }

      // Если все еще есть экспоненциальная запись
      if (strVal.includes('e')) {
        strVal = absAmount.toFixed(decimalCount);
      }

      // 5) Разделяем целую и дробную части
      let [intPart, fractionPart = ''] = strVal.split('.');

      // 6) Обрезаем дробную часть
      if (fractionPart && decimalCount > 0) {
        fractionPart = fractionPart.substring(0, decimalCount);
      } else {
        fractionPart = '';
      }

      // 7) Формируем группу тысяч
      if (intPart.length > 3) {
        const j = intPart.length % 3;
        intPart = (j ? intPart.slice(0, j) + thousands : '') +
            intPart.slice(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
      }

      // 8) Собираем результат
      let result = intPart;
      if (fractionPart && decimalCount > 0) {
        result += decimalSign + fractionPart;
      }

      const isZero = parseFloat(result) === 0;

      // Возвращаем результат с учетом знака (если не ноль)
      return isZero ? '0' : (isNegative ? '-' : '') + result;
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
  static toFixed(num, fix)
  {
    if (typeof num === 'number')
    {
      num = num.toString();
    }

    if (typeof num === 'string')
    {
      let decimalIndex = num.toString().indexOf('.');

      // Если десятичная точка не найдена, выводим исходное число
      if (decimalIndex === -1)
      {
        return num.replace('.', '');//удалим точку
      } else
      {
        if (fix === 0)
        {
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
    const isNegative = amount < 0;
    let preparedAmount = Math.abs(amount);

    let result;
    if (preparedAmount >= 1000000000) {
      result = Money.toFixed(preparedAmount / 1000000000, fix) + space + 'B';
    } else if (preparedAmount >= 1000000) {
      result = Money.toFixed(preparedAmount / 1000000, fix) + space + 'M';
    } else if (preparedAmount >= 1000) {
      result = Money.toFixed(preparedAmount / 1000, fix) + space + 'K';
    } else {
      result = Money.toFixed(preparedAmount, fix);
    }

    return isNegative ? '-' + result : result;
  }

  static getAccumulatedCouponIncome(startDate, endDate, nominal, rate, ratePeriodTypeId)
  {
    let nowDate = moment();
    let period = 0;
    let delimiter = 0;
    switch (ratePeriodTypeId)
    {
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

    return (nominal * (rate / 100 / delimiter) / periodDays) * couponDiffDays;
  }

  /**
   *
   * @param sum
   * @returns {number}
   */
  static toDigits(sum)
  {
    if (typeof sum === 'number')
    {
      sum = sum.toString();
    }

    if (typeof sum === 'string')
    {
      return parseFloat(sum.replace(/,/g, '.').replace(/ /g, ''));
    }
  }

  /**
   *
   * @param courses
   * @param id
   * @return {null}
   */
  static getCourseByCurrencyId(courses, id)
  {
    let course = null;
    if (courses)
    {
      courses.map((item) =>
      {
        if (item.cb_currency.currency.id === id)
        {
          course = item
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
  static convert(sum, fromCurrencyId, toCurrencyId, courses = CurrencyConstants.courses)
  {
    try
    {
      if (courses.length > 0 && fromCurrencyId && toCurrencyId)
      {
        let fromCurrencyCourse = Money.getCourseByCurrencyId(courses, fromCurrencyId);
        let toCurrencyCourse = Money.getCourseByCurrencyId(courses, toCurrencyId);


        if (fromCurrencyId === toCurrencyId)
        {
          return sum;
        }

        //если выбранная валюта рубль, тогда просто изпользуем
        //базу курсов с учётом даты
        if (fromCurrencyId === CurrencyConstants.RUBBLE_ID)
        {
          return sum * toCurrencyCourse.value / toCurrencyCourse.nominal;
        }

        if (toCurrencyId === CurrencyConstants.RUBBLE_ID)
        {
          return sum * (1 / fromCurrencyCourse.value / fromCurrencyCourse.nominal);
        }

        return sum * (toCurrencyCourse.value / toCurrencyCourse.nominal) / (fromCurrencyCourse.value / fromCurrencyCourse.nominal);
      } else
      {
        return 0;
      }
    } catch (e)
    {
      console.warn(e.message);
      return 0;
    }
  }
}
