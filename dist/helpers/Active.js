import moment from "moment/moment";
import ActiveConstants from "../constants/ActiveConstants";
import TradeCommissionConstants from "../constants/TradeCommissionConstants";
import { Api } from "laravel-request";
import ActiveModel from "../models/Active";
import AccountConstants from "../constants/AccountConstants";
import Money from "./Money";
import CurrencyConstants from "../constants/CurrencyConstants";
import ActiveValueCalculator from "./Active/ActiveValueCalculator";
export default class Active {
  /**
   *
   * @param item
   * @return {string|*|string}
   */
  static getName(item) {
    if (ActiveConstants.isPackage(item.type_id)) {
      return item.name_text ? item.name_text : 'Без названия';
    }
    if (item.type_text && item.name_text) {
      return item.type_text + ' ' + item.name_text;
    }
    if (item.type_text) {
      return item.type_text;
    }
    return 'Без названия';
  }
  static getGroup(items) {
    let stocks = [];
    items.map((group, key) => {
      stocks[key] = {};
      stocks[key].id = group.id;
      stocks[key].name = group.name;
      stocks[key].items = [];
      group.items.map((item, groupKey) => {
        stocks[key].items[groupKey] = {
          ...item
        };
        stocks[key].items[groupKey].id = item.id + '-' + item.type_id + (item.ticker ? '-' + item.ticker : '');
      });
    });
    return stocks;
  }
  static getRangesByValue(value) {
    let preparedValue = value > 100 ? Math.abs(value) : 100;
    let ranges = [];
    if (preparedValue <= 500) {
      ranges.push(0);
      ranges.push(preparedValue);
      ranges.push(preparedValue);
      ranges.push(preparedValue);
    } else if (preparedValue <= 1500) {
      ranges.push(0);
      ranges.push(500);
      ranges.push(Math.floor(preparedValue));
      ranges.push(Math.floor(preparedValue));
    } else {
      ranges.push(0);
      ranges.push(Math.floor(preparedValue / 100 * 30));
      ranges.push(Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 30));
      ranges.push(Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 40));
    }
    return ranges;
  }
  static getAvgDate(trade, date) {
    if (trade.trade_at) {
      if (date) {
        let tradeDate = moment(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        let diffInDays = Math.abs(date.diff(tradeDate, 'days'));

        //каждая следующая дата будет больше прошлой,
        //поэтому всегда двигаемся вперед
        return date.add(diffInDays / 2, 'days');
      } else {
        return moment(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss').clone().startOf('day');
      }
    }
  }

  /**
   *
   * @param active
   * @param {Object[]} items
   * @returns {*}
   */
  static getCountSum(active, items) {
    let count = 0;
    let lotsize = active.item ? active.item.lotsize : 1;
    items.map(trade => {
      count += trade.count;
    });
    return count * lotsize;
  }

  /**
   *
   * @param active
   * @param {Object[]} items
   * @returns {*}
   */
  static getCountSumWithoutLotSize(active, items) {
    let count = 0;
    items.map(trade => {
      count += trade.count;
    });
    return count;
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getPaymentsSum(payments) {
    let sum = 0;
    if (payments.length) {
      payments.map(payment => {
        sum += payment.sum;
      });
    }
    return sum;
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getConfirmedPaymentsSum(payments) {
    let sum = 0;
    if (payments?.length) {
      payments.map(payment => {
        if (payment.is_confirmed) {
          sum += payment.sum;
        }
      });
    }
    return sum;
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getConfirmedPaymentsOriginalSum(payments) {
    let sum = 0;
    if (payments.length) {
      payments.map(payment => {
        if (payment.is_confirmed) {
          sum += payment.original_sum;
        }
      });
    }
    return sum;
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getPaymentsOriginalSum(payments) {
    let sum = 0;
    if (payments.length) {
      payments.map(payment => {
        sum += payment.original_sum;
      });
    }
    return sum;
  }

  /**
   *
   * @param item
   * @returns {number}
   */
  static getDividendSum(item) {
    let sum = 0;
    let nowDate = moment();
    if (item.dividends && item.dividends.length) {
      item.dividends.map(dividend => {
        let decideDate = moment(dividend.decided_at_date, 'DD.MM.YYYY').startOf('day');
        if (item.sell_trades && item.sell_trades.length === 0) {
          item.buy_trades.map(trade => {
            let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY').startOf('day');
            if (tradeDate.isBefore(decideDate) && decideDate.isBefore(nowDate)) {
              sum += dividend.sum * trade.count;
            }
          });
        } else {
          if (item.buy_trades?.length && item.sell_trades?.length) {
            let buyTrade = item.buy_trades[0];
            let sellTrade = item.sell_trades[0];
            let buyTradeDate = moment(buyTrade.trade_at_date, 'DD.MM.YYYY').startOf('day');
            let sellTradeDate = moment(sellTrade.trade_at_date, 'DD.MM.YYYY').startOf('day');
            if (buyTradeDate.isBefore(decideDate) && decideDate.isBefore(sellTradeDate)) {
              sum += dividend.sum * buyTrade.count;
            }
          }
        }
      });
    }
    return sum;
  }

  /**
   *
   * @param item
   * @returns {number}
   */
  static getDividendOriginalSum(item) {
    let sum = 0;
    let nowDate = moment();
    if (item.dividends && item.dividends.length) {
      item.dividends.map(dividend => {
        let decideDate = moment(dividend.decided_at, 'DD.MM.YYYY').startOf('day');
        if (item.sell_trades && item.sell_trades.length === 0) {
          item.buy_trades.map(trade => {
            let tradeDate = moment(trade.trade_at, 'DD.MM.YYYY').startOf('day');
            if (tradeDate.isBefore(decideDate) && decideDate.isBefore(nowDate)) {
              sum += dividend.original_sum * trade.count;
            }
          });
        } else {
          if (item.buy_trades?.length && item.sell_trades?.length) {
            let buyTrade = item.buy_trades[0];
            let sellTrade = item.sell_trades[0];
            let buyTradeDate = moment(buyTrade.trade_at, 'DD.MM.YYYY').startOf('day');
            let sellTradeDate = moment(sellTrade.trade_at, 'DD.MM.YYYY').startOf('day');
            if (buyTradeDate.isBefore(decideDate) && decideDate.isBefore(sellTradeDate)) {
              sum += dividend.original_sum * buyTrade.count;
            }
          }
        }
      });
    }
    return sum;
  }

  /**
   *
   * @param items
   * @param original
   * @return {number}
   */
  static getCommission(items, original = false) {
    let sum = 0;
    if (items.length) {
      items.map(item => {
        if (item.commissions && item.commissions.length) {
          item.commissions.map(commission => {
            switch (commission.type_id) {
              case TradeCommissionConstants.FIX:
                sum += original ? commission.original_sum : commission.sum;
                break;
              case TradeCommissionConstants.PERCENT:
                sum += commission.percent / 100 * (original ? item.original_sum : item.sum);
                break;
            }
          });
        }
      });
    }
    return sum;
  }

  /**
   *
   * @param items
   * @return {number}
   */
  static getOriginalCommission(items) {
    return this.getCommission(items, true);
  }
  static getObligationCurrent(item, date) {
    let sum = 0;
    let futureDate = date.clone().add('12', 'months').startOf('day');
    item.payments.map(payment => {
      let paymentDate = moment(payment.paid_at_date, 'DD.MM.YYYY').startOf('day');
      if (payment.is_confirmed === false && paymentDate.isBefore(futureDate)) {
        sum += Math.abs(payment.sum);
      }
    });
    return {
      sum: sum,
      code: ''
    };
  }
  static getObligationLongTerm(item, date, birthDate) {
    let sum = 0;
    let count = 0;
    let futureDate = date.clone().add('12', 'months').startOf('day');
    item.payments.map(payment => {
      let paymentDate = moment(payment.paid_at_date, 'DD.MM.YYYY').startOf('day');
      if (payment.is_confirmed === false && paymentDate.isSameOrAfter(futureDate)) {
        sum += Math.abs(payment.sum);
        count++;
      }
    });
    return {
      sum: sum,
      code: ''
    };
  }
  static getValuation(item, date, sign) {
    if (item) {
      //если актив не продан и является купонным, то нужно проверить дату, если дата погашения прошла и нет оценок, то рассчитываем оценку по номиналу
      if (item.sell_trades?.length) {
        let sum = ActiveValueCalculator.getSum(item.sell_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getCommission(item.sell_trades) - Active.getCommission(item.buy_trades) + Active.getDividendSum(item);
        return {
          sum: sum,
          code: '',
          sign: sign
        };
      } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
        let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (date && sellDate && sellDate.isBefore(date)) {
          let count = Active.getCountSum(item, item.buy_trades);
          let buySum = item.buy_sum * count + ActiveValueCalculator.getCouponSellSum(item); // + ActiveValueCalculator.getCouponBuySum(item);
          return {
            sum: buySum,
            code: '',
            sign: sign
          };
        }
      } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
        let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        let sellSum = 0;
        switch (item.rate_type_id) {
          case ActiveConstants.SIMPLE:
            sellSum = Active.getConfirmedPaymentsSum(item.payments) + item.buy_sum;
            break;
          case ActiveConstants.DIFFERENTIAL:
            sellSum = Active.getConfirmedPaymentsSum(item.payments);
            break;
        }
        return {
          sum: sellSum,
          code: '',
          sign: sign
        };
      } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        if (item.sell_sum > 0) {
          let sellSum = item.sell_sum;
          return {
            sum: sellSum,
            code: '',
            sign: sign
          };
        } else if (item.last_valuation) {
          let lotsize = item?.item ? item.item.lotsize : 1;
          return {
            sum: item.last_valuation.current_sum / lotsize,
            code: ''
          };
        } else {
          return {
            sum: item.buy_sum,
            code: '',
            sign: sign
          };
        }
      } else if ([[...ActiveConstants.CREDIT_GROUP], ...[ActiveConstants.CUSTOM_OBLIGATION]].indexOf(item.type_id) !== -1) {
        return {
          sum: item.income * 12,
          code: '',
          sign: sign
        };
      } else if (item.type_id === ActiveConstants.MONEY_ACTIVE) {
        return {
          sum: item.buy_sum,
          code: '',
          sign: sign
        };
      }
      if (item.last_valuation && item.last_valuation.morph === 'active.user.valuation') {
        let count = Active.getCountSum(item, item.buy_trades);
        let lastValuation = item.last_valuation;
        let lotsize = item?.item ? item.item.lotsize : 1;
        let buySum = lastValuation.current_sum * count / lotsize + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendSum(item);
        return {
          sum: buySum,
          code: '',
          sign: sign
        };
      }
      if (item.last_valuation && item.buy_trades?.length) {
        let count = Active.getCountSum(item, item.buy_trades);
        let lastTrade = item.buy_trades[item.buy_trades?.length - 1];
        let lastValuation = item.last_valuation;
        let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
        let lastValuationDate = moment(lastValuation.value_at_date, 'DD.MM.YYYY');
        let buySum = 0;
        if (!lastTradeDate.isValid()) {
          console.warn('not valid date', lastTrade);
        }
        if (!lastValuationDate.isValid()) {
          console.warn('not valid date', lastValuationDate);
        }
        if (lastTradeDate.isBefore(lastValuationDate)) {
          let lotsize = item?.item ? item.item.lotsize : 1;
          buySum = lastValuation.current_sum * count / lotsize + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendSum(item);
        } else {
          buySum = lastTrade.price * count + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendSum(item);
        }
        return {
          sum: buySum,
          code: '',
          sign: sign
        };
      } else if (item.buy_trades?.length) {
        if (item.buy_trades?.length === 1) {
          let buySum = item.buy_trades[item.buy_trades?.length - 1].sum + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendSum(item);
          return {
            sum: buySum,
            code: '',
            sign: sign
          };
        }
        let lotsize = item?.item ? item.item.lotsize : 1;
        let count = Active.getCountSum(item, item.buy_trades);
        let lastPrice = Active.getNotNullPrice(item.buy_trades, 'price');
        let buySum = lastPrice * count / lotsize + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendSum(item);
        return {
          sum: buySum,
          code: '',
          sign: sign
        };
      }
    }
  }
  static getOriginalValuation(item, date) {
    if (item) {
      //если актив не продан и является купонным, то нужно проверить дату, если дата погашения прошла и нет оценок, то рассчитываем оценку по номиналу
      if (item.sell_trades?.length) {
        let sum = ActiveValueCalculator.getOriginalSum(item.sell_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.sell_trades) - Active.getOriginalCommission(item.buy_trades) + Active.getDividendOriginalSum(item);
        let code = CurrencyConstants.getCurrencyCodeByActive(item);
        let sign = CurrencyConstants.getCurrencySignByActive(item);
        return {
          sum: sum,
          code: code,
          sign: sign
        };
      } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
        let code = CurrencyConstants.getCurrencyCodeByActive(item);
        let sign = CurrencyConstants.getCurrencySignByActive(item);
        let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (!sellDate.isValid()) {
          console.warn('not valid date', sellDate);
        }
        if (!date.isValid()) {
          console.warn('not valid date', date);
        }
        if (date && sellDate && sellDate.isBefore(date)) {
          let count = Active.getCountSum(item, item.buy_trades);
          let buySum = item.original_buy_sum * count + ActiveValueCalculator.getCouponSellSum(item);
          return {
            sum: buySum,
            code: code,
            sign: sign
          };
        }
      } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
        let sellSum = 0;
        let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        switch (item.rate_type_id) {
          case ActiveConstants.SIMPLE:
            sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments) + item.original_buy_sum;
            break;
          case ActiveConstants.DIFFERENTIAL:
            sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments);
            break;
        }
        return {
          sum: sellSum,
          code: code,
          sign: sign
        };
      } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        if (item.sell_sum > 0) {
          let sellSum = item.original_sell_sum;
          return {
            sum: sellSum,
            code: code,
            sign: sign
          };
        } else if (item.last_valuation) {
          let lotsize = item?.item ? item.item.lotsize : 1;
          return {
            sum: item.last_valuation.original_current_sum / lotsize,
            code: code,
            sign: sign
          };
        } else {
          return {
            sum: item.original_buy_sum,
            code: code,
            sign: sign
          };
        }
      } else if ([[...ActiveConstants.CREDIT_GROUP], ...[ActiveConstants.CUSTOM_OBLIGATION]].indexOf(item.type_id) !== -1) {
        let code = CurrencyConstants.getCurrencyCodeByActive(item);
        let sign = CurrencyConstants.getCurrencySignByActive(item);
        return {
          sum: item.original_income * 12,
          code: code,
          sign: sign
        };
      } else if (item.type_id === ActiveConstants.MONEY_ACTIVE) {
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        return {
          sum: item.original_buy_sum,
          code: '',
          sign: sign
        };
      }
      if (item.last_valuation && item.last_valuation.morph === 'active.user.valuation') {
        let count = Active.getCountSum(item, item.buy_trades);
        let lastValuation = item.last_valuation;
        let lotsize = item?.item ? item.item.lotsize : 1;
        let buySum = lastValuation.original_current_sum * count / lotsize + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
        let {
          code,
          sign
        } = this.getCodeAndSign(item);
        return {
          sum: buySum,
          code: code,
          sign: sign
        };
      }
      if (item.last_valuation && item.buy_trades?.length) {
        let count = Active.getCountSum(item, item.buy_trades);
        let lastTrade = item.buy_trades[item.buy_trades?.length - 1];
        let lastValuation = item.last_valuation;
        let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
        let lastValuationDate = moment(lastValuation.value_at_date, 'DD.MM.YYYY');
        if (!lastTradeDate.isValid()) {
          console.warn('not valid date', lastTradeDate);
        }
        if (!lastValuationDate.isValid()) {
          console.warn('not valid date', lastValuationDate);
        }
        let buySum = 0;
        if (lastTradeDate.isBefore(lastValuationDate)) {
          let lotsize = item?.item ? item.item.lotsize : 1;
          buySum = lastValuation.original_current_sum * count / lotsize + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
        } else {
          buySum = lastTrade.original_price * count + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
        }
        let {
          code,
          sign
        } = this.getCodeAndSign(item);
        return {
          sum: buySum,
          code: code,
          sign: sign
        };
      } else if (item.buy_trades?.length) {
        if (item.buy_trades?.length === 1) {
          let buySum = item.buy_trades[item.buy_trades?.length - 1].original_sum + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
          let code = CurrencyConstants.getCurrencyCodeByActive(item);
          let sign = CurrencyConstants.getCurrencySignByActive(item);
          return {
            sum: buySum,
            code: code,
            sign: sign
          };
        }
        let count = Active.getCountSum(item, item.buy_trades);
        let lastPrice = Active.getNotNullPrice(item.buy_trades, 'original_price');
        let lotsize = item?.item ? item.item.lotsize : 1;
        let buySum = lastPrice * count / lotsize + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
        let code = CurrencyConstants.getCurrencyCodeByActive(item);
        let sign = CurrencyConstants.getCurrencySignByActive(item);
        return {
          sum: buySum,
          code: code,
          sign: sign
        };
      }
    }
  }
  static getDiffCurrency(item, now, self) {
    if (item.sell_trades?.length) {
      let diff = ActiveValueCalculator.getOriginalSum(item.sell_trades) - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.sell_trades) - Active.getOriginalCommission(item.buy_trades) + Active.getDividendOriginalSum(item);
      let code = CurrencyConstants.getCurrencyCodeByActive(item);
      let sign = CurrencyConstants.getCurrencySignByActive(item);
      if (item.type_id === ActiveConstants.CURRENCY) {
        //TODO если куплена валюта, то нужно получать валюту покупки и сравнивать
        //если это шорт, то null будет в разнице
      }
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
      if (!sellDate.isValid()) {
        console.warn('not valid date', sellDate);
      }
      if (!now.isValid()) {
        console.warn('not valid date', now);
      }
      if (sellDate.isBefore(now)) {
        //высчитываем сумму продажи по номиналу облигации
        let count = Active.getCountSum(item, item.buy_trades);
        let sellSum = item.original_buy_sum * count; //умножаем номинальную цену на количество

        let diff = sellSum - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.buy_trades);
        let code = CurrencyConstants.getCurrencyCodeByActive(item);
        let sign = CurrencyConstants.getCurrencySignByActive(item);
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sellSum = 0;
      let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
      let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
      let diff = 0;
      switch (item.rate_type_id) {
        case ActiveConstants.SIMPLE:
          sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments) + item.original_buy_sum;
          diff = 0;
          break;
        case ActiveConstants.DIFFERENTIAL:
          sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments);
          diff = 0;
          break;
      }
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      if (item.sell_at_date) {
        let sellSum = item.original_sell_sum;
        let buySum = item.original_buy_sum;
        let code = item.sell_currency_id ? CurrencyConstants.getCurrencyCodeById(item.sell_currency_id) : null;
        let sign = item.sell_currency_id ? CurrencyConstants.getCurrencySignById(item.sell_currency_id) : null;
        let diff = sellSum - buySum;
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
      if (item.sell) {
        let sell = item.sell.child_item;
        let sellSum = sell.original_sum;
        let buySum = item.original_buy_sum;
        let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        let diff = sellSum - buySum;
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
      if (item.last_valuation) {
        let lotsize = item?.item ? item.item.lotsize : 1;
        let sellSum = item.last_valuation.original_current_sum / lotsize;
        let buySum = item.original_buy_sum;
        let code = item.last_valuation.currency_id ? CurrencyConstants.getCurrencyCodeById(item.last_valuation.currency_id) : null;
        let sign = item.last_valuation.currency_id ? CurrencyConstants.getCurrencySignById(item.last_valuation.currency_id) : null;
        let diff = sellSum - buySum;
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
      let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
      let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
      return {
        sum: 0,
        code: code,
        sign: sign
      };
    }
    if (item.last_valuation && item.last_valuation.morph === 'active.user.valuation') {
      let count = Active.getCountSum(item, item.buy_trades);
      let lastValuation = item.last_valuation;
      let lotsize = item?.item ? item.item.lotsize : 1;
      let diff = lastValuation.original_current_sum * count / lotsize - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
      let {
        code,
        sign
      } = this.getCodeAndSign(item);
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    }
    if (item.last_valuation && item.buy_trades?.length) {
      let count = Active.getCountSum(item, item.buy_trades);
      let lastTrade = item.buy_trades[item.buy_trades?.length - 1];
      let lastValuation = item.last_valuation;
      let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
      let lastValuationDate = moment(lastValuation.value_at_date, 'DD.MM.YYYY');
      if (!lastTradeDate.isValid()) {
        console.warn('not valid date', lastTradeDate);
      }
      if (!lastValuationDate.isValid()) {
        console.warn('not valid date', lastValuationDate);
      }
      let diff = 0;
      if (lastTradeDate.isBefore(lastValuationDate)) {
        let lotsize = item?.item ? item.item.lotsize : 1;
        diff = lastValuation.original_current_sum * count / lotsize - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
      } else {
        diff = lastTrade.original_price * count - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) + Active.getDividendOriginalSum(item);
      }
      let {
        code,
        sign
      } = this.getCodeAndSign(item);
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    } else if (item.buy_trades?.length) {
      let buySum = ActiveValueCalculator.getOriginalSum(item.buy_trades);
      let count = Active.getCountSum(item, item.buy_trades);
      let lastPrice = Active.getNotNullPrice(item.buy_trades, 'original_price');
      let lotsize = item?.item ? item.item.lotsize : 1;
      let sellSum = lastPrice * count / lotsize;
      let diff = sellSum - buySum + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.buy_trades) + Active.getDividendOriginalSum(item);
      let code = CurrencyConstants.getCurrencyCodeByActive(item);
      let sign = CurrencyConstants.getCurrencySignByActive(item);
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    }
    return {
      sum: 0,
      code: self.props.currency.code,
      sign: self.props.currency.sign
    };
  }
  static getCodeAndSign(item) {
    let code = CurrencyConstants.getCurrencyCodeById(item.last_valuation.currency_id);
    let sign = CurrencyConstants.getCurrencySignById(item.last_valuation.currency_id);
    if (!code && !sign) {
      code = CurrencyConstants.getCurrencyCodeByActive(item);
      sign = CurrencyConstants.getCurrencySignByActive(item);
    }
    return {
      code,
      sign
    };
  }

  /**
   * метод для того чтобы если были переводы на счёт, то цена внесения 0 будет, получается
   * что это будет учитываться при оценке, нужно это исключить, проверкой > 0
   * @param array
   * @param field
   * @returns {number|*}
   */
  static getNotNullPrice(array, field) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i][field] > 0) {
        return array[i][field];
      }
    }
    return 0;
  }
  static getDiffRubble(item, now) {
    if (item.sell_trades?.length) {
      let diff = ActiveValueCalculator.getOriginalSum(item.sell_trades) - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.sell_trades) - Active.getOriginalCommission(item.buy_trades) + Active.getDividendOriginalSum(item);
      let course = item.sell_trades[item.sell_trades?.length - 1].sum_rub_course;
      let calcDiff = course * diff;
      return calcDiff;
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
      if (!sellDate.isValid()) {
        console.warn('not valid date', sellDate);
      }
      if (!now.isValid()) {
        console.warn('not valid date', now);
      }
      if (sellDate.isBefore(now)) {
        //высчитываем сумму продажи по номиналу облигации
        let count = Active.getCountSum(item, item.buy_trades);
        let sellSum = item.original_buy_sum * count;
        let course = item.buy_sum_rub_course;
        let diff = sellSum - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.buy_trades);
        let calcDiff = course * diff;
        return calcDiff;
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sellSum = 0;
      let diff = 0;
      let course = 0;
      switch (item.rate_type_id) {
        case ActiveConstants.SIMPLE:
          sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments) + item.original_buy_sum;
          course = item.payments.length ? item.payments[item.payments.length - 1].sum_rub_course : 0;
          diff = 0;
          break;
        case ActiveConstants.DIFFERENTIAL:
          sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments);
          diff = 0;
          break;
      }
      let calcDiff = course * diff;
      return calcDiff;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      if (item.sell_at_date) {
        let sellSum = item.original_sell_sum;
        let buySum = item.original_buy_sum;
        let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        let course = item.buy_sum_rub_course;
        let diff = sellSum - buySum;
        let calcDiff = course * diff;
        return calcDiff;
      }
      if (item.sell) {
        let sell = item.sell.child_item;
        let sellSum = sell.original_sum;
        let buySum = item.original_buy_sum;
        let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        let course = item.buy_sum_rub_course;
        let diff = sellSum - buySum;
        let calcDiff = course * diff;
        return calcDiff;
      }
    }
    if (item.last_valuation && item.buy_trades?.length) {
      let count = Active.getCountSum(item, item.buy_trades);
      let lastTrade = item.buy_trades[item.buy_trades?.length - 1];
      let lastValuation = item.last_valuation;
      let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
      let lastValuationDate = moment(lastValuation.value_at_date, 'DD.MM.YYYY');
      let diff = 0;
      let course = 0;
      if (!lastTradeDate.isValid()) {
        console.warn('not valid date', lastTradeDate);
      }
      if (!lastValuationDate.isValid()) {
        console.warn('not valid date', lastValuationDate);
      }
      if (lastTradeDate.isBefore(lastValuationDate)) {
        let lotsize = item?.item ? item.item.lotsize : 1;
        diff = lastValuation.original_current_sum * count / lotsize - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.buy_trades) + Active.getDividendOriginalSum(item);
        course = lastValuation.current_sum_rub_course;
      } else {
        diff = lastTrade.original_price * count - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.buy_trades) + Active.getDividendOriginalSum(item);
        course = lastTrade.price_rub_course;
      }
      let calcDiff = course * diff;
      return calcDiff;
    } else if (item.buy_trades?.length) {
      // if(item.buy_trades?.length === 1)
      // {
      //   return 0;
      // }

      let buySum = ActiveValueCalculator.getOriginalSum(item.buy_trades);
      let count = Active.getCountSum(item, item.buy_trades);
      let lastPrice = Active.getNotNullPrice(item.buy_trades, 'original_price');
      let sellSum = lastPrice * count;
      let diff = sellSum - buySum + ActiveValueCalculator.getCouponSellSum(item) - Active.getOriginalCommission(item.buy_trades) + Active.getDividendOriginalSum(item);
      let course = item.buy_trades[item.buy_trades?.length - 1].sum_rub_course;
      let calcDiff = course * diff;
      return calcDiff;
    }
  }
  static getDiff(item, now) {
    if (item.sell_trades?.length) {
      let diff = ActiveValueCalculator.getSum(item.sell_trades) - ActiveValueCalculator.getSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getCommission(item.sell_trades) - Active.getCommission(item.buy_trades) + Active.getDividendSum(item);
      return diff;
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
      if (!sellDate.isValid()) {
        console.warn('not valid date', sellDate);
      }
      if (!now.isValid()) {
        console.warn('not valid date', now);
      }
      if (sellDate.isBefore(now)) {
        //высчитываем сумму продажи по номиналу облигации
        let count = Active.getCountSum(item, item.buy_trades);
        let sellSum = item.buy_sum * count;
        let diff = sellSum - ActiveValueCalculator.getSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getCommission(item.buy_trades);
        return diff;
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sellSum = 0;
      let diff = 0;
      switch (item.rate_type_id) {
        case ActiveConstants.SIMPLE:
          sellSum = Active.getConfirmedPaymentsSum(item.payments) + item.buy_sum;
          diff = 0;
          break;
        case ActiveConstants.DIFFERENTIAL:
          sellSum = Active.getConfirmedPaymentsSum(item.payments);
          diff = 0;
          break;
      }
      return diff;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      if (item.sell_at_date) {
        let sellSum = item.sell_sum;
        let buySum = item.buy_sum;
        let diff = sellSum - buySum;
        return diff;
      }
      if (item.sell) {
        let sell = item.sell.child_item;
        let sellSum = sell.sum;
        let buySum = item.buy_sum;
        let diff = sellSum - buySum;
        return diff;
      }
      if (item.last_valuation) {
        let lotsize = item?.item ? item.item.lotsize : 1;
        let valuationSum = item.last_valuation.current_sum / lotsize;
        let buySum = item.buy_sum;
        let diff = valuationSum - buySum;
        return diff;
      }
      return 0;
    }
    if (item.last_valuation && item.last_valuation.morph === 'active.user.valuation') {
      let count = Active.getCountSum(item, item.buy_trades);
      let lastValuation = item.last_valuation;
      let lotsize = item?.item ? item.item.lotsize : 1;
      let diff = lastValuation.current_sum * count / lotsize - ActiveValueCalculator.getSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getCommission(item.buy_trades) + Active.getDividendSum(item);
      return diff;
    }
    if (item.last_valuation && item.buy_trades?.length) {
      let count = Active.getCountSum(item, item.buy_trades);
      let lastTrade = item.buy_trades[item.buy_trades?.length - 1];
      let lastValuation = item.last_valuation;
      let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
      let lastValuationDate = moment(lastValuation.value_at_date, 'DD.MM.YYYY');
      if (!lastTradeDate.isValid()) {
        console.warn('not valid date', lastTradeDate);
      }
      if (!lastValuationDate.isValid()) {
        console.warn('not valid date', lastValuationDate);
      }
      let diff = 0;
      if (lastTradeDate.isBefore(lastValuationDate)) {
        let lotsize = item?.item ? item.item.lotsize : 1;
        diff = lastValuation.current_sum * count / lotsize - ActiveValueCalculator.getSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getCommission(item.buy_trades) + Active.getDividendSum(item);
      } else {
        diff = lastTrade.price * count - ActiveValueCalculator.getSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - Active.getCommission(item.buy_trades) + Active.getDividendSum(item);
      }
      return diff;
    } else if (item.buy_trades?.length) {
      // if(item.buy_trades?.length === 1)
      // {
      //   return 0;
      // }

      let buySum = ActiveValueCalculator.getSum(item.buy_trades);
      let count = Active.getCountSum(item, item.buy_trades);
      let lastPrice = Active.getNotNullPrice(item.buy_trades, 'price');
      let lotsize = item?.item ? item.item.lotsize : 1;
      let sellSum = lastPrice * count / lotsize;
      let diff = sellSum - buySum + ActiveValueCalculator.getCouponSellSum(item) - Active.getCommission(item.buy_trades) + Active.getDividendSum(item);
      return diff;
    }
  }
  static getAccountsByDate(self, bindString, data, clientId, date = moment(), callback) {
    Api.get('user-account', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('user_id', clientId).where('is_visible', 1).with('accounts', 'accounts.currency').all(() => {
      callback();
    }).bind(self, bindString);
  }
  static getBalanceByDate(self, accounts, currencyData, clientId, date = moment(), callback, types, courses) {
    self.setState(prv => {
      prv.brokerBalance.sum = 0;
      prv.cashBalance.sum = 0;
      prv.bankBalance.sum = 0;
      prv.digitBalance.sum = 0;
      accounts.map(item => {
        item.accounts.map(account => {
          try {
            if (account.sum > 0) {
              switch (item.type_id) {
                case AccountConstants.BROKER_ACCOUNT:
                  prv.brokerBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case AccountConstants.CASH:
                  prv.cashBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case AccountConstants.BANK_ACCOUNT:
                  prv.bankBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case AccountConstants.DIGIT_MONEY:
                  prv.digitBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
      return prv;
    }, () => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  }
  static getActivesByDate(self, bindString, data, clientId, date = moment(), callback) {
    let now = date.clone().format('YYYY-MM-DD HH:mm:ss');
    let before = date.clone().add('12', 'months').format('YYYY-MM-DD HH:mm:ss');
    data.user_id = clientId;
    Api.get('active', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where(query => {
      return query.where('type_id', ActiveConstants.OBLIGATION).whereDate('sell_at', '<=', before).whereDoesntHave('sell_trades', query => {
        return query.whereDate('trade_at', '<=', now);
      });
    }).with('buy_currency').with('sell_currency').with('income_currency').with('buy_account').with('sell_account').with('income_account').with('valuations') //TODO
    .with('payments', 'payments.currency').with('buy_trades', query => {
      return query.with('currency', 'commissions').where('trade_at', '<=', now);
    }).with('sell_trades', query => {
      return query.with('currency', 'commissions').where('trade_at', '<=', now);
    }).with('dividends').all(response => {
      self.setState(prv => {
        prv[bindString] = ActiveModel.load(response.data);
        return prv;
      }, () => {
        callback();
      });
    });
  }
  static getInvestsByDate(self, bindString, data, clientId, date = moment(), callback) {
    let now = date.clone().format('YYYY-MM-DD HH:mm:ss');
    let before = date.clone().add('12', 'months').format('YYYY-MM-DD HH:mm:ss');
    data.user_id = clientId;
    data.exchange_valuation = 1;
    data.with_convert_trade = 1;
    data.profitability = 1;
    Api.get('active', 'invest-grid-index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where(query => {
      return query.where('type_id', ActiveConstants.OBLIGATION).whereDoesntHave('sell_trades', query => {
        return query.whereDate('trade_at', '<=', now);
      });
    }).orWhere(query => {
      return query.whereIn('type_id', [ActiveConstants.DEPOSIT, ActiveConstants.DEBT, ActiveConstants.FUNDED_LIFE_INSURANCE]);
    }).orWhere(query => {
      return query.whereIn('type_id', [ActiveConstants.COMMODITY, ActiveConstants.PRECIOUS_METAL, ActiveConstants.CRYPTO, ActiveConstants.ETF, ActiveConstants.PIF, ActiveConstants.BPIF, ActiveConstants.HEDGE_FUND]).whereDoesntHave('sell_trades', query => {
        return query.whereDate('trade_at', '<=', now);
      });
    }).orWhere(query => {
      return query.whereIn('type_id', ActiveConstants.DIVIDEND_GROUP).whereDoesntHave('sell_trades', query => {
        return query.whereDate('trade_at', '<=', now);
      });
    }).orWhere(query => {
      return query.where('group_id', ActiveConstants.INVEST).whereDate('buy_at', '<=', before).where(query => {
        return query.where('sell_at', '>', now).orWhereNull('sell_at').whereDoesntHave('sell');
      }).wherePropertyType(true);
    }).all(response => {
      self.setState(prv => {
        prv[bindString] = ActiveModel.load(response.data)?.sort((c1, c2) => {
          let valuation1 = c1.valuation;
          let valuation2 = c2.valuation;
          return valuation1 < valuation2 ? 1 : valuation1 > valuation2 ? -1 : 0;
        });
        return prv;
      }, () => {
        callback();
      });
    });
  }
  static getPropertiesByDate(self, bindString, data, clientId, date = moment(), callback) {
    let now = date.clone().format('YYYY-MM-DD HH:mm:ss');
    data.user_id = clientId;
    Api.get('active', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('buy_at', '<=', now).where(query => {
      return query.where('sell_at', '>', now).orWhereNull('sell_at').whereDoesntHave('sell');
    }).where('group_id', ActiveConstants.OWN).wherePropertyType(true).with('sell_trades').with('valuations').with('buy_currency').with('sell_currency').with('income_currency').with('buy_account').with('sell_account').with('income_account').all(response => {
      self.setState(prv => {
        prv[bindString] = ActiveModel.load(response.data);
        return prv;
      }, () => {
        callback();
      });
    });
  }
  static getSpendingsByDate(self, bindString, data, clientId, date = moment(), callback) {
    data.user_id = clientId;
    Api.get('active', 'index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('buy_at', '<=', date.format('YYYY-MM-DD HH:mm:ss')).whereSpendingType(true).with('sell_trades').with('valuations').with('buy_currency').with('sell_currency').with('income_currency').with('buy_account').with('sell_account').with('income_account').with('payments').all(() => {
      callback();
    }).bind(self, bindString);
  }
  static getObligationsByDate(self, bindString, data, clientId, date = moment(), callback) {
    data.user_id = clientId;
    Api.get('active', 'invest-grid-index', data).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('buy_at', '<=', date.format('YYYY-MM-DD HH:mm:ss')).whereObligationType(true).with('buy_currency').with('sell_currency').with('income_currency').with('buy_account').with('sell_account').with('income_account').with('payments').all(response => {
      self.setState(prv => {
        prv[bindString] = ActiveModel.load(response.data);
        return prv;
      }, () => {
        callback();
      });
    });
  }
  static isRetire(user, year) {
    let startDate = moment(year, 'YYYY').startOf('year');
    let retiredDate = moment(user.birth_at_date, 'DD.MM.YYYY').add(user.retired_age, 'year');
    let deadDate = moment(user.birth_at_date, 'DD.MM.YYYY').add(user.retired_age, 'year').add(user.dead_age, 'year');
    if (startDate.isAfter(retiredDate) && startDate.isSameOrBefore(deadDate)) {
      return true;
    }
  }
  getSumRubble(items) {
    let now = moment();
    let sum = 0;
    items.map(item => {
      sum += Active.getDiffRubble(item, now);
    });
    return sum;
  }
}