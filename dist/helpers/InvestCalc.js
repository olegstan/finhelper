import React from 'react';
import Money from "./Money";
import moment from 'moment/moment';
import ActiveConstants from "../constants/ActiveConstants";
import AccountConstants from "../constants/AccountConstants";
import Active from "./Active";
import exactMath from "exact-math";
import CurrencyConstants from "../constants/CurrencyConstants";
import BuyTrade from "../models/BuyTrade";
import SellTrade from "../models/SellTrade";
import ActiveValueCalculator from "./Active/ActiveValueCalculator";
import IndexedDBCache from "./IndexedDBCache";
import CryptoJS from 'crypto-js';
class InvestCalc {
  static getRoundPriceByValue(item, value) {
    let number = 2;

    // Логика для определения числа знаков после запятой
    let parts = String(value).split('.');
    if (parts.length > 1) {
      if (parseInt(parts[0]) === 0) {
        // Если целая часть равна 0, вернуть длину дробной части
        return parts[1].length;
      } else {
        // Если целая часть больше 0, вернуть 2
        return number;
      }
    } else {
      // Если значение целое, вернуть 2
      return number;
    }

    // Проверка типа для криптовалюты
    if (item.type_id === ActiveConstants.CRYPTO || item.item && item.item.type === 'CRYPTOCURRENCY') {
      number = 8;
    }
    return number;
  }
  static getRoundPrice(item, field) {
    let number = 2;
    let smallestNumberPrice = null;
    let hasWholeNumber = false;
    const checkTrade = trade => {
      const value = trade[field];
      if (value >= 1) hasWholeNumber = true;
      if (smallestNumberPrice === null || value < smallestNumberPrice) {
        smallestNumberPrice = value;
      }
    };
    if (item?.buy_trades?.length) {
      for (const trade of item.buy_trades) {
        checkTrade(trade);
        if (hasWholeNumber) break; // Прерываем цикл при нахождении целого числа
      }
    }
    if (!hasWholeNumber && item?.sell_trades?.length) {
      for (const trade of item.sell_trades) {
        checkTrade(trade);
        if (hasWholeNumber) break; // Прерываем цикл при нахождении целого числа
      }
    }
    if (hasWholeNumber) return 2;
    if (smallestNumberPrice !== null) {
      const [integerPart, decimalPart] = String(smallestNumberPrice).split('.');
      if (integerPart === "0" && decimalPart) return decimalPart.length;
      return number;
    }
    if (item.type_id === ActiveConstants.CRYPTO || item.item && item.item.type === 'CRYPTOCURRENCY') {
      number = 8;
    }
    return number;
  }
  static getRound(item) {
    let number = 2;
    if (item.type_id === ActiveConstants.CRYPTO) {
      number = 8;
    }
    if (item.item && item.item.type === 'CRYPTOCURRENCY') {
      number = 8;
    }
    return number;
  }
  static getCount(item) {
    if (item?.buy_trades?.length) {
      return Money.format(Active.getCountSum(item, item.buy_trades), InvestCalc.getRound(item));
    }
  }
  static getBuyPrice(item, sign) {
    if (item?.buy_trades?.length) {
      return Money.format(ActiveValueCalculator.getAvgPrice(item, item.buy_trades), InvestCalc.getRoundPrice(item, 'price')) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      return '';
    }
  }
  static getBuyOriginalPrice(item) {
    if (item?.buy_trades?.length) {
      return Money.format(ActiveValueCalculator.getAvgOriginalPrice(item, item.buy_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + CurrencyConstants.getCurrencySignByActive(item);
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      return '';
    }
  }
  static getBuySum(item, sign) {
    if (item?.buy_trades?.length) {
      let sum = ActiveValueCalculator.getSum(item.buy_trades);
      return Money.format(ActiveValueCalculator.getSum(item.buy_trades), InvestCalc.getRoundPriceByValue(item, sum)) + ' ' + sign;
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sum = item.buy_sum;
      return Money.format(sum) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      return Money.format(item.buy_sum) + ' ' + sign;
    }
  }
  static getBuyOriginalSum(item) {
    if (item?.buy_trades?.length) {
      let sum = ActiveValueCalculator.getOriginalSum(item.buy_trades);
      return Money.format(sum, InvestCalc.getRoundPriceByValue(item, sum)) + ' ' + CurrencyConstants.getCurrencySignByActive(item);
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sign = CurrencyConstants.getCurrencySignById(item.buy_currency_id);
      return Money.format(item.original_buy_sum) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      let {
        code,
        sign
      } = Active.getCodeAndSign(item);
      return Money.format(item.original_buy_sum) + ' ' + sign;
    }
  }
  static getBuyDate(item) {
    if (item?.buy_trades?.length) {
      return item.avg_own_date;
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      return item.buy_at_date;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      return item.buy_at_date;
    }
  }
  static getSellPrice(item, now) {
    if (item.sell_trades?.length) {
      return Money.format(ActiveValueCalculator.getAvgPrice(item, item.sell_trades));
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now)) {
        return Money.format(item.buy_sum);
      }
    }
  }
  static getSellOriginalPrice(item) {
    if (item.sell_trades?.length) {
      let sign = this.getSign(item);
      return Money.format(ActiveValueCalculator.getAvgOriginalPrice(item, item.sell_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      return '';
    }
  }
  static getSellSum(item, now, sign) {
    if (item.sell_trades?.length) {
      return Money.format(ActiveValueCalculator.getSum(item.sell_trades), InvestCalc.getRoundPrice(item, 'price')) + ' ' + sign;
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now)) {
        let count = Active.getCountSum(item, item.buy_trades);
        return Money.format(item.buy_sum * count) + ' ' + sign;
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now)) {
        return Money.format(Active.getPaymentsSum(item.payments)) + ' ' + sign;
      }
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      if (item.sell) {
        let sell = item.sell.child_item;
        return Money.format(sell.sum) + ' ' + sign;
      }
      return Money.format(item.sell_sum) + ' ' + sign;
    }
  }
  static getSellOriginalSum(item) {
    if (item.sell_trades?.length) {
      let sign = this.getSign(item);
      return Money.format(ActiveValueCalculator.getOriginalSum(item.sell_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + sign;
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sign = CurrencyConstants.getCurrencySignById(item.sell_currency_id);
      return Money.format(item.original_sell_sum) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      let sign = CurrencyConstants.getCurrencySignById(item.sell_currency_id);
      return Money.format(item.original_sell_sum) + ' ' + sign;
    }
  }
  static getSign(item) {
    let sign = '';
    if (item.type_id === ActiveConstants.CURRENCY) {
      let account = AccountConstants.getSubAccountById(item.sell_trades[0].to_account_id);
      if (account) {
        sign = CurrencyConstants.getCurrencySignById(account.currency_id);
      }
    } else {
      let account = AccountConstants.getSubAccountById(item.sell_trades[0].from_account_id);
      if (account) {
        sign = CurrencyConstants.getCurrencySignById(account.currency_id);
      }
    }
    return sign;
  }
  static getSellDate(item, now) {
    if (item.sell_trades?.length) {
      let date = item.sell_trades[item.sell_trades?.length - 1].trade_at_date;
      return date;
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now)) {
        return item.sell_at_date;
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now)) {
        return item.sell_at_date;
      }
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      if (item.sell) {
        let sell = item.sell.child_item;
        return sell.paid_at_date;
      }
      return item.sell_at_date;
    }
  }
  static getPeriod(item, now) {
    if (item.sell_trades?.length) {
      let date = item.sell_trades[item.sell_trades?.length - 1].trade_at_date;
      let nowDate = moment(date, 'DD.MM.YYYY');
      let buyDate = moment(item.avg_own_date, 'DD.MM.YYYY');
      return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      let nowDate = sellDate.isBefore(now) ? sellDate : now;
      let buyDate = moment(item.avg_own_date, 'DD.MM.YYYY');
      return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      let nowDate = sellDate.isBefore(now) ? sellDate : now;
      let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');
      return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      if (item.sell_at_date) {
        let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
        let nowDate = sellDate.isBefore(now) ? sellDate : now;
        let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');
        return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
      } else if (item.sell) {
        let sell = item.sell.child_item;
        let sellDate = moment(sell.paid_at_date, 'DD.MM.YYYY');
        let nowDate = sellDate.isBefore(now) ? sellDate : now;
        let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');
        return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
      } else {
        let nowDate = now;
        let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');
        return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
      }
    }
    if (item.buy_trades?.length && item.buy_trades?.length) {
      let nowDate = moment().startOf('day');
      let buyDate = moment(item.avg_own_date, 'DD.MM.YYYY');
      return Math.round(nowDate.diff(buyDate, 'months', true) * 10) / 10 + ' мес.';
    }
  }

  //TODO похоже на зачикливание
  static getAnnuallyPercentByActives(actives, now, self) {
    let firstBuyDate = InvestCalc.getFirstBuyDate(actives);
    if (firstBuyDate) {
      // let hasSell = false;
      // let profit = InvestCalc.getAnnuallyPercentByActives(actives, now, self, hasSell);
      //
      // let diffInDays = Math.abs(firstBuyDate.diff(moment().startOf('day'), 'days'));
      // profit -= 1;
      //
      // let annulyProfit = (Math.pow(profit + 1, (360 / (diffInDays ? diffInDays : 1)) - 1));

      return 0;
    }
    return 0;
  }
  static getAnnuallyPercentWithFactPercentByActives(actives, profit) {
    let firstBuyDate = InvestCalc.getFirstBuyDate(actives);
    if (firstBuyDate) {
      let diffInDays = Math.abs(firstBuyDate.diff(moment().startOf('day'), 'days'));
      profit -= 1;
      let annulyProfit = Math.pow(profit + 1, 360 / diffInDays) - 1;
      return annulyProfit;
    }
    return 0;
  }

  /**
   * Инициализирует структуру данных (index, sums, values, sold, grids, gridIndex)
   * и ищет дату первой покупки (firstBuyDate)
   */
  static initActivesData(activesWithoutCurrency) {
    const index = [];
    const sums = [];
    const values = [];
    const sold = [];
    const grids = [];
    const gridIndex = [];
    const firstBuyDate = InvestCalc.getFirstBuyDate(activesWithoutCurrency);
    return {
      index,
      sums,
      values,
      sold,
      grids,
      gridIndex,
      firstBuyDate
    };
  }

  /**
   *
   * @param valuationObj
   * @param newDate
   * @param newPrice
   */
  static updateLastValuation(valuationObj, newDate, newPrice) {
    if (valuationObj.olderDate === null) {
      valuationObj.olderDate = newDate;
      valuationObj.olderPrice = newPrice;
    } else if (newDate.isSameOrAfter(valuationObj.olderDate)) {
      valuationObj.olderDate = newDate;
      valuationObj.olderPrice = newPrice;
    }
  }

  /**
   * Рассчитывает массив индексов валют (currencyIndex) и объект последних
   * оценок (lastValuations) для каждого типа валюты из списка активов
   */
  static calculateCurrencyValuations(actives) {
    const currencyIndex = [];
    const lastValuations = [];
    actives.forEach(active => {
      // Фиксируем валютный символ в currencyIndex (чтобы понять, какой это индекс)
      if (!currencyIndex.includes(active.item.symbol)) {
        currencyIndex.push(active.item.symbol);
      }
      const currencyKey = currencyIndex.indexOf(active.item.symbol);

      // Инициализируем объект с датой/ценой
      if (typeof lastValuations[currencyKey] === 'undefined') {
        lastValuations[currencyKey] = {
          olderDate: null,
          olderPrice: null
        };
      } else {
        // Сбрасываем перед перерасчётом
        lastValuations[currencyKey].olderDate = null;
        lastValuations[currencyKey].olderPrice = null;
      }

      // Обрабатываем покупки
      active.buy_trades.forEach(trade => {
        if (trade.price <= 0) return;
        const tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
        this.updateLastValuation(lastValuations[currencyKey], tradeDate, trade.price);
      });

      // Обрабатываем valuations
      if (Array.isArray(active.attributes.valuations)) {
        active.attributes.valuations.forEach(value => {
          const valueDate = value.morph === 'active.user.valuation' ? moment() : moment(value.value_at_date, 'DD.MM.YYYY');
          this.updateLastValuation(lastValuations[currencyKey], valueDate, value.current_sum);
        });
      }

      // Обрабатываем продажи
      if (Array.isArray(active.attributes.sell_trades)) {
        active.attributes.sell_trades.forEach(trade => {
          const tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
          this.updateLastValuation(lastValuations[currencyKey], tradeDate, trade.price);
        });
      }
    });

    // Превращаем lastValuations в JSON-строку
    const lastValuationsJSON = JSON.stringify(lastValuations);

    // Делаем хеш (md5 или любой другой)
    const lastValuationsHash = CryptoJS.MD5(lastValuationsJSON).toString();
    return {
      currencyIndex,
      lastValuations,
      lastValuationsHash
    };
  }

  /**
   * Заполняет данные (sums, values, sold и т.д.) для всех активов
   * по датам, начиная с firstBuyDate и заканчивая сегодня
   */
  static fillActivesDataByDates(activesWithoutCurrency, firstBuyDate, index, sums, values, sold, grids, gridIndex) {
    const nowDate = moment().startOf('day');

    // Клонируем дату, чтобы позже использовать в расчёте прибыли
    const cloneFirstBuyDate = firstBuyDate.clone();
    while (firstBuyDate && firstBuyDate.isSameOrBefore(nowDate)) {
      const formattedDate = firstBuyDate.format('DD.MM.YYYY');

      // Инициализируем массивы для данного индекса даты
      if (!index.includes(formattedDate)) {
        index.push(formattedDate);
      }
      const dateIndex = index.indexOf(formattedDate);
      if (typeof sums[dateIndex] === 'undefined') sums[dateIndex] = [];
      if (typeof sold[dateIndex] === 'undefined') sold[dateIndex] = [];
      if (typeof values[dateIndex] === 'undefined') values[dateIndex] = [];

      // Для каждого активa считаем его оценку
      activesWithoutCurrency.forEach(active => {
        this.calculateActiveValuationForDate(active, firstBuyDate, dateIndex, sums, values, sold, gridIndex, grids);
      });

      // Идём к следующему дню
      firstBuyDate.add(1, 'days');
    }
  }

  /**
   * Считает оценку конкретного актива на определённую дату (firstBuyDate)
   */
  static calculateActiveValuationForDate(active, currentDate, dateIndex, sums, values, sold, gridIndex, grids) {
    // Инициализируем "ячейки" для данного актива
    if (typeof values[dateIndex][active.id] === 'undefined') {
      values[dateIndex][active.id] = {};
    }
    if (typeof sums[dateIndex][active.id] === 'undefined') {
      sums[dateIndex][active.id] = 0;
    }
    if (typeof sold[dateIndex][active.id] === 'undefined') {
      sold[dateIndex][active.id] = 0;
    }
    if (!gridIndex.includes(active.id)) {
      gridIndex.push(active.id);
    }
    const gridKey = gridIndex.indexOf(active.id);
    if (typeof grids[gridKey] === 'undefined') {
      // Предполагаем, что InvestCalc.getGrid() вернёт сетку оценок для актива
      grids[gridKey] = InvestCalc.getGrid(active, moment().startOf('day'));
    }
    if (ActiveConstants.isPackage(active.type_id)) {
      this.calculatePackageActiveValuation(active, currentDate, dateIndex, sums, values, sold, grids[gridKey]);
    } else {
      this.calculateSingleActiveValuation(active, currentDate, dateIndex, sums, values, sold);
    }
  }

  /**
   * Подсчёт оценки для "пакета" (множественные покупки/продажи, переоценки и т.д.)
   */
  static calculatePackageActiveValuation(active, firstBuyDate, dateIndex, sums, values, sold, gridForActive) {
    let count = 0;
    let course = 0;
    let tradePrice = 0;
    let sell = false;
    let tradeOriginalPrice = 0;
    let lastTradeDate = null;
    let valuePrice = 0;
    let valueOriginalPrice = 0;
    let lastValueDate = null;

    // Покупки
    active.attributes.buy_trades.forEach(trade => {
      // Копия сделки с учётом комиссии
      const copyTrade = new BuyTrade({
        ...trade
      });
      copyTrade.price = trade.price + ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
      copyTrade.original_price = trade.original_price + ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
      const tradeDate = moment(copyTrade.trade_at_date, 'DD.MM.YYYY');
      if (!lastTradeDate) {
        lastTradeDate = tradeDate;
      }

      // Если сделка раньше или в день firstBuyDate, прибавляем
      if (tradeDate.isSameOrBefore(firstBuyDate)) {
        count += copyTrade.count;
        tradePrice = copyTrade.price;
        tradeOriginalPrice = copyTrade.original_price;
        course = copyTrade.price_course;
      }
    });

    // Переоценки
    active.attributes.valuations?.forEach(valuation => {
      const valueDate = valuation.morph === 'active.user.valuation' ? moment() : moment(valuation.value_at_date, 'DD.MM.YYYY');
      lastValueDate = valueDate;
      if (valueDate.isSameOrBefore(firstBuyDate)) {
        valuePrice = valuation.current_sum;
        valueOriginalPrice = valuation.original_current_sum;
        course = valuation.current_sum_course;
      }
    });

    // Продажи
    active.attributes.sell_trades.forEach(trade => {
      const copyTrade = new SellTrade({
        ...trade
      });
      copyTrade.price = trade.price - ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
      copyTrade.original_price = trade.original_price - ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
      const tradeDate = moment(copyTrade.trade_at_date, 'DD.MM.YYYY');
      lastTradeDate = tradeDate;
      if (tradeDate.isSameOrBefore(firstBuyDate)) {
        tradePrice = copyTrade.price;
        tradeOriginalPrice = copyTrade.original_price;
        course = copyTrade.price_course;
        sell = true;
      }
    });

    // Если нет продаж и переоценок, но были покупки -> берём цену из последней покупки
    if ((!active?.attributes?.valuations || active?.attributes?.valuations?.length === 0) && active.attributes.sell_trades.length === 0 && active.attributes.buy_trades.length > 0) {
      const lastTrade = active.attributes.buy_trades[active.attributes.buy_trades.length - 1];
      const nowDate = moment().startOf('day');
      if (nowDate.isSameOrBefore(firstBuyDate)) {
        lastTradeDate = nowDate;
        tradePrice = lastTrade.price;
        tradeOriginalPrice = lastTrade.original_price;
        course = lastTrade.price_course;
      }
    }

    // Логика выбора цены: продажа / переоценка / покупка
    if (sell) {
      // Если актив продан, исключаем его из дальнейшей переоценки
      // но учитываем цену продажи в дату продажи
      sums[dateIndex][active.id] = sums[dateIndex][active.id] || 0;

      // Если ещё не был помечен как "продан"
      if (!sums[dateIndex][active.id]) {
        sums[dateIndex][active.id] = tradePrice * count;
      }
    } else if (lastValueDate && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0) {
      // Оценка
      sums[dateIndex][active.id] = count * valuePrice;
    } else if (lastTradeDate && tradePrice > 0) {
      // Покупка
      sums[dateIndex][active.id] = count * tradePrice;
    }
  }

  /**
   * Подсчёт оценки для "единичного" актива (одна покупка/продажа)
   */
  static calculateSingleActiveValuation(active, firstBuyDate, dateIndex, sums, values, sold) {
    let count = 0;
    let tradePrice = 0;
    let sell = false;
    let tradeOriginalPrice = 0;
    let lastTradeDate = null;
    let valuePrice = 0;
    let lastValueDate = null;
    let paymentSum = 0;

    // Данные о покупке
    const buyTrade = {
      price: active.buy_sum,
      original_price: active.original_buy_sum,
      price_course: active.buy_sum_course
    };
    const buyTradeDate = moment(active.buy_at_date, 'DD.MM.YYYY');
    if (!lastTradeDate) {
      lastTradeDate = buyTradeDate;
    }

    // Если покупка была до (или в) firstBuyDate
    if (buyTradeDate.isSameOrBefore(firstBuyDate)) {
      count += 1;
      tradePrice = buyTrade.price;
      tradeOriginalPrice = buyTrade.original_price;
      // Примечание: здесь в вашем исходном коде, похоже, опечатка:
      // course = buyTradeDate.price_course; ?
    }

    // Переоценки
    active.attributes.valuations?.forEach(valuation => {
      const valueDate = valuation.morph === 'active.user.valuation' ? moment() : moment(valuation.value_at_date, 'DD.MM.YYYY');
      lastValueDate = valueDate;
      if (valueDate.isSameOrBefore(firstBuyDate)) {
        valuePrice = valuation.current_sum;
      }
    });

    // Платежи (например, дивиденды, купоны и т.д.)
    active.attributes?.payments?.forEach(payment => {
      const paidDate = moment(payment.paid_at_date, 'DD.MM.YYYY');
      if (paidDate.isSameOrBefore(firstBuyDate)) {
        paymentSum += payment.sum;
      }
    });

    // Продажа через sell_at
    if (active.sell_at) {
      const sellTrade = {
        price: active.sell_sum,
        original_price: active.original_sell_sum,
        price_course: active.sell_sum_course
      };
      const tradeSellDate = moment(active.sell_at_date, 'DD.MM.YYYY');
      lastTradeDate = tradeSellDate;
      if (tradeSellDate.isSameOrBefore(firstBuyDate)) {
        tradePrice = sellTrade.price;
        tradeOriginalPrice = sellTrade.original_price;
        sell = true;
      }
    }
    // Продажа через active.attributes.sell
    else if (active.attributes?.sell) {
      const sellObj = active.attributes.sell.child_item;
      const sellTrade = {
        price: sellObj.sum,
        original_price: sellObj.original_sum,
        price_course: sellObj.price_course
      };
      const tradeSellDate = moment(sellObj.paid_at_date, 'DD.MM.YYYY');
      lastTradeDate = tradeSellDate;
      if (tradeSellDate.isSameOrBefore(firstBuyDate)) {
        tradePrice = sellTrade.price;
        tradeOriginalPrice = sellTrade.original_price;
        sell = true;
      }
    }

    // Логика выбора цены: продано / переоценка / покупка
    if (sell) {
      if (!sums[dateIndex][active.id]) {
        // Если актив только что "продаём" в эту дату
        sums[dateIndex][active.id] = active.sell_at ? active.sell_sum : active.attributes.sell.child_item.sum;
      } else {
        sums[dateIndex][active.id] = 0;
      }
    } else if (lastValueDate && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0) {
      // Оценка
      sums[dateIndex][active.id] = count * valuePrice + paymentSum;
    } else if (lastTradeDate && tradePrice > 0) {
      // Покупка
      sums[dateIndex][active.id] = count * tradePrice + paymentSum;
    }
  }

  /**
   *
   * @param ActiveModel[] actives
   * @return {number}
   */
  static async getFactPercentByActives(actives) {
    let activesWithoutCurrency = actives.filter(active => {
      return active.type_id !== ActiveConstants.CURRENCY;
    });
    let ids = actives.map(active => {
      return active.id;
    }).join(',');

    // // 2. Рассчитываем последние оценки (lastValuations) для валют
    const {
      currencyIndex,
      lastValuations,
      lastValuationsHash
    } = InvestCalc.calculateCurrencyValuations(activesWithoutCurrency);
    let cacheKey = 'active.fact_percent.actives.' + ids + '.hash.' + lastValuationsHash;
    return await IndexedDBCache.get(cacheKey).then(cachedValue => {
      if (cachedValue) {
        return cachedValue;
      } else {
        // 3. Собираем индекс дат, суммы и др. для невалютных активов

        const {
          index,
          sums,
          values,
          sold,
          grids,
          gridIndex,
          firstBuyDate
        } = InvestCalc.initActivesData(activesWithoutCurrency);

        // Если не удалось определить дату покупки (нет покупок), возвращаем 0
        if (!firstBuyDate) {
          return 0;
        }

        // 4. Идём по датам от первой покупки до текущей, считаем оценки
        InvestCalc.fillActivesDataByDates(activesWithoutCurrency, firstBuyDate, index, sums, values, sold, grids, gridIndex);

        // 5. Считаем финальную доходность
        let profit = InvestCalc.calculateProfit(index, sums, activesWithoutCurrency, grids, gridIndex);
        IndexedDBCache.set(cacheKey, profit, 1000 * 60 * 60 * 24 * 7); //запомним на неделю

        return profit;
      }
    });
  }

  /**
   * Подсчёт итоговой "фактической" доходности (profit)
   * с учётом накопленных сумм, оценок и выплат
   */
  static calculateProfit(index, sums, activesWithoutCurrency, grids, gridIndex) {
    let profit = 1;
    const nowDate = moment().startOf('day');
    const cloneFirstBuyDate = moment(index[0], 'DD.MM.YYYY'); // Первая дата из массива index

    while (cloneFirstBuyDate && cloneFirstBuyDate.isSameOrBefore(nowDate)) {
      const formattedDate = cloneFirstBuyDate.format('DD.MM.YYYY');
      const dateIndex = index.indexOf(formattedDate);
      let dateProfit = 0;

      // Сумма всех активов в эту дату
      let totalSumInDate = 0;
      for (const activeId in sums[dateIndex]) {
        totalSumInDate += sums[dateIndex][activeId];
      }

      // Для каждого актива вычисляем вклад в доходность
      activesWithoutCurrency.forEach(active => {
        const gridKey = gridIndex.indexOf(active.id);
        const activeProfitByDate = InvestCalc.getFactMultiplierByDate(grids[gridKey], cloneFirstBuyDate);
        const activeSum = sums[dateIndex][active.id] || 0;
        const fraction = totalSumInDate ? activeSum / totalSumInDate : 0;
        try {
          if (activeProfitByDate !== 1) {
            // Когда актив продан, доходность != 1
            dateProfit = exactMath.add(dateProfit, activeProfitByDate * fraction);
          } else {
            dateProfit = exactMath.add(dateProfit, fraction);
          }
        } catch (e) {
          console.warn(e.message);
        }
      });

      // Умножаем совокупную доходность
      if (dateProfit !== 0) {
        profit = exactMath.mul(profit, dateProfit);
      }
      cloneFirstBuyDate.add(1, 'days');
    }
    return profit;
  }

  /**
   *
   * @param sortedGrid
   * @param date
   * @returns {number}
   */
  static getFactMultiplierByDate(sortedGrid, date) {
    let prevValuation = null;
    let prevPrice = null;
    let prevCount = null;
    let paymentSum = 0;
    let prevPaymentSum = 0;
    let hasSell = false;
    let multiplier = 1;
    sortedGrid.map((valuation, key) => {
      if (key === 0) {
        //пропускаем первый шаг, там доходности не будет
        prevValuation = valuation;
        prevPrice = valuation.type === 'buy_trade' ? valuation.item.price : 0;
        prevCount = valuation.type === 'buy_trade' ? valuation.item.count : 0;
        return;
      }
      let count = InvestCalc.getCountByType(valuation);
      let price = InvestCalc.getPriceByType(valuation);
      let currentDate = InvestCalc.getDateByType(valuation);

      //получаем доходность на конкретную дату
      if (currentDate && currentDate.isSame(date)) {
        let profitStartDay = prevPrice * prevCount + prevPrice * (count ? count : prevCount) + prevPaymentSum;
        let profitEndDay = price * prevCount + price * (count ? count : prevCount);
        multiplier *= 1 + (profitEndDay / profitStartDay - 1);
      }
      if (valuation.type === 'buy_trade') {
        prevPrice = valuation.item.price;
        prevCount = valuation.item.count;
      } else if (valuation.type === 'valuation') {
        prevPrice = valuation.item.current_sum;
      } else if (valuation.type === 'sell_trade') {
        prevPrice = valuation.item.price;
        hasSell = true;
      }
      prevValuation = valuation;
    });
    return multiplier;
  }

  /**
   *
   * @param item
   * @return {Promise<*>}
   */
  static async getFactPercentByItem(item) {
    return await InvestCalc.getFactPercentByActives([item]);
  }

  /**
   *
   * @param item
   * @returns {*|moment.Moment}
   */
  static getDateByType(item) {
    switch (item.type) {
      case 'buy_trade':
      case 'sell_trade':
        return moment(item.item.trade_at_date, 'DD.MM.YYYY');
      case 'valuation':
        if (item.morph === 'active.user.valuation') {
          return moment();
        }
        return moment(item.item.value_at_date, 'DD.MM.YYYY');
      case 'payment':
        return moment(item.item.paid_at_date, 'DD.MM.YYYY');
    }
  }

  /**
   *
   * @param item
   * @param type
   * @returns {*}
   */
  static getPriceByType(item, type) {
    switch (item.type) {
      case 'buy_trade':
      case 'sell_trade':
        return item.item.price;
      case 'valuation':
        return item.item.current_sum;
    }
  }

  /**
   *
   * @param item
   * @returns {boolean}
   */
  static getCountByType(item) {
    switch (item.type) {
      case 'buy_trade':
      case 'sell_trade':
        return item.item.count;
      case 'valuation':
        return false;
    }
  }
  static getGrid(active, now) {
    let grid = [];
    if (ActiveConstants.isPackage(active.type_id)) {
      if (active.attributes?.valuations?.length) {
        active.attributes.valuations?.map(valuation => {
          grid.push({
            item: valuation,
            type: 'valuation'
          });
        });
      }
      if (active.attributes.buy_trades.length) {
        active.attributes.buy_trades.map(trade => {
          //для рассчёта оценки сделаем копию с ценой с учетом комиссии
          let copyTrade = new BuyTrade({
            ...trade
          });
          copyTrade.price = trade.price + ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
          copyTrade.original_price = trade.original_price + ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
          grid.push({
            item: copyTrade,
            type: 'buy_trade'
          });
        });
      }
      if (active.attributes.sell_trades.length) {
        active.attributes.sell_trades.map(trade => {
          //для рассчёта оценки сделаем копию с ценой с учетом комиссии
          let copyTrade = new SellTrade({
            ...trade
          });
          copyTrade.price = trade.price - ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
          copyTrade.original_price = trade.original_price - ActiveValueCalculator.getCommissionSum([trade]) / trade.count;
          grid.push({
            item: copyTrade,
            type: 'sell_trade'
          });
        });
      }
      if (active.attributes?.valuations?.length === 0 && active.attributes.sell_trades?.length === 0 && active.attributes.buy_trades.length > 0) {
        let lastTrade = active.attributes.buy_trades[active.attributes.buy_trades.length - 1];
        grid.push({
          item: {
            price: lastTrade.price,
            original_price: lastTrade.original_price,
            trade_at_date: lastTrade.value_at_date
          },
          type: 'sell_trade'
        });
      }
    } else {
      if (active?.attributes?.valuations?.length) {
        active.attributes.valuations?.map(valuation => {
          grid.push({
            item: valuation,
            type: 'valuation'
          });
        });
      }

      // if(active.payments.length)
      // {
      //   active.payments.map((payment) => {
      //     grid.push({
      //       item: payment,
      //       type: 'payment'
      //     })
      //   })
      // }

      //для рассчёта оценки сделаем копию с ценой с учетом комиссии
      let buyTrade = {};
      buyTrade.price = active.buy_sum;
      buyTrade.original_price = active.original_buy_sum;
      buyTrade.trade_at_date = active.buy_at_date;
      buyTrade.count = 1;
      grid.push({
        item: buyTrade,
        type: 'buy_trade'
      });
      if (active.sell_at) {
        //для рассчёта оценки сделаем копию с ценой с учетом комиссии
        let sellTrade = {};
        sellTrade.price = active.sell_sum;
        sellTrade.original_price = active.original_sell_sum;
        sellTrade.trade_at_date = active.sell_at_date;
        sellTrade.count = 1;
        grid.push({
          item: sellTrade,
          type: 'sell_trade'
        });
      } else if (active.sell) {
        let sell = active.sell.child_item;
        let sellTrade = {};
        sellTrade.price = sell.sum;
        sellTrade.original_price = sell.original_sum;
        sellTrade.trade_at_date = sell.paid_at_date;
        sellTrade.count = 1;
        grid.push({
          item: sellTrade,
          type: 'sell_trade'
        });
      }
    }
    let sortedGrid = grid?.sort(function (a, b) {
      let firstDate = InvestCalc.getDateByType(a);
      let secondDate = InvestCalc.getDateByType(b);
      if (firstDate.isSame(secondDate)) {
        //продажу отодвигаем в конец
        if (a.type === 'sell_trade') {
          return 1;
        }
        if (b.type === 'sell_trade') {
          return -1;
        }
        if (a.type === 'valuation' || a.type === 'payment') {
          return 1;
        }
        if (b.type === 'valuation' || b.type === 'payment') {
          return -1;
        }
        return 0;
      }
      return firstDate - secondDate;
    });
    return sortedGrid;
  }

  /**
   *
   * @param actives
   * @return {number}
   */
  static getValuation(actives) {
    let sum = 0;
    actives?.map(active => {
      let value = active.valuation;
      if (value > 0) {
        sum += value;
      }
    });
    return sum;
  }

  /**
   *
   * @param actives
   * @return {number}
   */
  static getInsuranceValuation(actives) {
    let sum = 0;
    actives.map(active => {
      let value = Money.toDigits(active.buy_sum);
      if (value > 0) {
        sum += value;
      }
    });
    return sum;
  }

  /**
   *
   * @param item
   * @returns {number}
   */
  static async getAnnuallyPercentByItem(item) {
    let profit = await InvestCalc.getFactPercentByItem(item);
    let firstBuyDate = InvestCalc.getFirstBuyDate([item]);
    if (firstBuyDate) {
      let diffInDays = Math.abs(firstBuyDate.diff(moment().startOf('day'), 'days'));
      profit -= 1;
      let annulyProfit = Math.pow(profit + 1, 360 / diffInDays) - 1;
      return annulyProfit;
    }
    return 0;
  }
  static getFirstBuyDays(actives) {
    let nowDate = moment().startOf('day');
    let firstBuyDate = null;
    actives.map(active => {
      active.buy_trades.map(trade => {
        if (firstBuyDate === null) {
          firstBuyDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
        }
        let nextDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
        if (firstBuyDate.isAfter(nextDate)) {
          firstBuyDate = nextDate;
        }
      });
    });
    let diff = Math.abs(nowDate.diff(firstBuyDate, 'days'));
    return diff > 0 ? diff : 0;
  }

  /**
   *
   * @param actives
   * @returns {*}
   */
  static getFirstBuyDate(actives) {
    let firstBuyDate = null;
    actives.map(active => {
      if (ActiveConstants.isPackage(active.type_id)) {
        active.buy_trades.map(trade => {
          if (firstBuyDate === null) {
            firstBuyDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
          }
          let nextDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
          if (firstBuyDate.isAfter(nextDate)) {
            firstBuyDate = nextDate;
          }
        });
      } else {
        if (firstBuyDate === null) {
          firstBuyDate = moment(active.buy_at_date, 'DD.MM.YYYY');
        }
        let nextDate = moment(active.buy_at_date, 'DD.MM.YYYY');
        if (firstBuyDate.isAfter(nextDate)) {
          firstBuyDate = nextDate;
        }
      }
    });
    return firstBuyDate;
  }

  /**
   *
   * @param actives
   * @returns {number}
   *
   * тут считается так, у нас есть отрезок времени, например 10 дней для простоты возмём.
   *
   * в первый день я купил 10 акций по 100 и в пятый день купил 10 акций по 100, а на 7 день продал 10 акций
   *
   * изначально 0
   * 1.  +100 = 100
   * 2. +100 = 200
   * 3. +100 = 300
   * 4. +100 = 400
   * 5. +200 = 600
   * 6. +200 = 800
   * 7. +100 = 900
   * 8. +100 = 1000
   * 9. +100 = 1100
   * 10. +100 = 1200
   *
   *
   * сумму делим на количество дней
   * 1200 / 10 = 120 средняя
   */
  static getAverageActivesCost(actives) {
    let activesWithoutCurrency = actives.filter(active => {
      return active.type_id !== ActiveConstants.CURRENCY;
    });
    let sum = 0;
    let firstBuyDate = InvestCalc.getFirstBuyDate(activesWithoutCurrency);
    let nowDate = moment().startOf('day');
    let diffDays = nowDate.diff(firstBuyDate, 'days');
    while (firstBuyDate && firstBuyDate.isBefore(nowDate)) {
      activesWithoutCurrency.map(active => {
        let count = 0;
        let tradePrice = 0;
        let lastTradeDate = null;
        let valuePrice = 0;
        let lastValueDate = null;
        if (ActiveConstants.isPackage(active.type_id)) {
          active.buy_trades.map(trade => {
            let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
            if (lastTradeDate === null) {
              lastTradeDate = tradeDate;
            }
            if (tradeDate.isSameOrBefore(firstBuyDate)) {
              count += trade.count;
              tradePrice = trade.price;
            }
          });
          active.buy_trades.map(trade => {
            /**
             * @var ActiveTradeCoupon $coupon
             */
            if (trade.coupons) {
              trade.coupons.map(coupon => {
                if (coupon.is_confirmed) {
                  let couponDate = moment(coupon.paid_at_date, 'DD.MM.YYYY');
                  if (couponDate.isSame(nowDate)) {
                    sum += coupon.sum * count;
                  }
                }
              });
            }
          });
          active.attributes.valuations?.map(valuation => {
            let valueDate;
            if (valuation.morph === 'active.user.valuation') {
              valueDate = moment();
            } else {
              valueDate = moment(valuation.value_at_date, 'DD.MM.YYYY');
            }
            lastValueDate = valueDate;
            if (valueDate.isSameOrBefore(firstBuyDate)) {
              valuePrice = valuation.current_sum;
            }
          });
          active.attributes.dividends.map(dividend => {
            let paidDate = moment(dividend.paid_at_date, 'DD.MM.YYYY');
            //
            // if(lastTradeDate === null)
            // {
            // lastValueDate = valueDate;
            // }

            if (paidDate.isSame(firstBuyDate)) {
              sum += dividend.sum * count;
            }
          });
          active.attributes.sell_trades.map(trade => {
            let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
            lastTradeDate = tradeDate;
            if (tradeDate.isSameOrBefore(firstBuyDate)) {
              count -= trade.count;
            }
          });
        } else {
          let tradeDate = moment(active.buy_at_date, 'DD.MM.YYYY');
          if (lastTradeDate === null) {
            lastTradeDate = tradeDate;
          }
          if (tradeDate.isSameOrBefore(firstBuyDate)) {
            count += 1;
            tradePrice = active.buy_sum;
          }
          active.attributes.valuations?.map(valuation => {
            let valueDate;
            if (valuation.morph === 'active.user.valuation') {
              valueDate = moment();
            } else {
              valueDate = moment(valuation.value_at_date, 'DD.MM.YYYY');
            }
            lastValueDate = valueDate;
            if (valueDate.isSameOrBefore(firstBuyDate)) {
              valuePrice = valuation.current_sum;
            }
          });
          if (active.sell_at) {
            let tradeDate = moment(active.sell_at_date, 'DD.MM.YYYY');
            lastTradeDate = tradeDate;
            if (tradeDate.isSameOrBefore(firstBuyDate)) {
              count -= 1;
            }
          }
        }

        //если оценка была позже чем последняя сделка, то берем цену из оценки
        if (lastValueDate !== null && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0) {
          sum += count * valuePrice;
        } else if (lastTradeDate !== null && tradePrice > 0) {
          sum += count * tradePrice;
        }
      });
      firstBuyDate.add(1, 'days');
    }
    return sum / diffDays;
  }
  static getWholeActivesSum(state) {
    let sum = 0;
    sum += InvestCalc.getValuation(state.properties ?? []);
    sum += InvestCalc.getValuation(state.invests ?? []);
    sum += InvestCalc.getAccountValuation(state.bankBalance ?? 0);
    sum += InvestCalc.getAccountValuation(state.brokerBalance ?? 0);
    sum += InvestCalc.getAccountValuation(state.cashBalance ?? 0);
    sum += InvestCalc.getAccountValuation(state.digitBalance ?? 0);
    return sum;
  }
  static getWholeObligationSum(state, birthAtDate) {
    let sum = 0;
    sum += InvestCalc.getObligationCurrent(state.obligations ?? []);
    sum += InvestCalc.getObligationLongTerm(state.obligations ?? [], birthAtDate);
    return sum;
  }

  /**
   *
   * @param array
   * @return {*|number}
   */
  static getAccountValuation(array) {
    return array.sum > 0 ? array.sum : 0;
  }

  /**
   *
   * @param array
   * @return {number}
   */
  static getObligationCurrent(array) {
    let sum = 0;
    let now = moment();
    array?.map(item => {
      let obj = Active.getObligationCurrent(item, now);
      if (obj) {
        sum += parseFloat(obj.sum);
      }
      return null;
    });
    return sum;
  }

  /**
   *
   * @param array
   * @param birthAtDate
   * @return {number}
   */
  static getObligationLongTerm(array, birthAtDate) {
    let sum = 0;
    let now = moment();
    array?.map(item => {
      let obj = Active.getObligationLongTerm(item, now, moment(birthAtDate, 'DD.MM.YYYY'));
      if (obj) {
        sum += parseFloat(obj.sum);
      }
      return null;
    });
    return sum;
  }
}
export default InvestCalc;