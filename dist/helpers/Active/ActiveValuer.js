import moment from "moment/moment";
import ActiveValueCalculator from "./ActiveValueCalculator";
import ActiveConstants from "./../../constants/ActiveConstants";
export default class ActiveValuer {
  /**
   * 
   * @param item
   * @param date
   * @param sign
   * @param code
   * @param original
   * @return {{code: string, sum: number}|{code: string, sign, sum: number}|{code: string, sign, sum: *}}
   */
  static getValuation(item, date, sign, code, original = false) {
    if (item) {
      //если актив не продан и является купонным, то нужно проверить дату, если дата погашения прошла и нет оценок, то рассчитываем оценку по номиналу
      if (item.sell_trades?.length) {
        let sum = ActiveValueCalculator.getSum(item.sell_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(item.sell_trades, original) - ActiveValueCalculator.getCommissionSum(item.buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);
        return {
          sum: sum,
          code: code,
          sign: sign
        };
      } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
        let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (date && sellDate && sellDate.isBefore(date)) {
          let count = Active.getCountSum(item, item.buy_trades);
          let buySum = item.buy_sum * count + ActiveValueCalculator.getCouponSellSum(item, original); // + ActiveValueCalculator.getCouponBuySum(item);
          return {
            sum: buySum,
            code: code,
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
          code: code,
          sign: sign
        };
      } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
        if (item.sell_sum > 0) {
          let sellSum = item.sell_sum;
          return {
            sum: sellSum,
            code: code,
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
            code: code,
            sign: sign
          };
        }
      } else if ([[...ActiveConstants.CREDIT_GROUP], ...[ActiveConstants.CUSTOM_OBLIGATION]].indexOf(item.type_id) !== -1) {
        return {
          sum: item.income * 12,
          code: code,
          sign: sign
        };
      } else if (item.type_id === ActiveConstants.MONEY_ACTIVE) {
        return {
          sum: item.buy_sum,
          code: code,
          sign: sign
        };
      }
      if (item.last_valuation && item.last_valuation.morph === 'active.user.valuation') {
        let count = Active.getCountSum(item, item.buy_trades);
        let lastValuation = item.last_valuation;
        let lotsize = item?.item ? item.item.lotsize : 1;
        let buySum = lastValuation.current_sum * count / lotsize + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
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
        let buySum = 0;
        if (!lastTradeDate.isValid()) {
          console.warn('not valid date', lastTrade);
        }
        if (!lastValuationDate.isValid()) {
          console.warn('not valid date', lastValuationDate);
        }
        if (lastTradeDate.isBefore(lastValuationDate)) {
          let lotsize = item?.item ? item.item.lotsize : 1;
          buySum = lastValuation.current_sum * count / lotsize + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
        } else {
          buySum = lastTrade.price * count + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
        }
        return {
          sum: buySum,
          code: code,
          sign: sign
        };
      } else if (item.buy_trades?.length) {
        if (item.buy_trades?.length === 1) {
          let buySum = item.buy_trades[item.buy_trades?.length - 1].sum + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
          return {
            sum: buySum,
            code: code,
            sign: sign
          };
        }
        let lotsize = item?.item ? item.item.lotsize : 1;
        let count = Active.getCountSum(item, item.buy_trades);
        let lastPrice = Active.getNotNullPrice(item.buy_trades, 'price');
        let buySum = lastPrice * count / lotsize + ActiveValueCalculator.getCouponSellSum(item) + ActiveValueCalculator.getDividendSum(item);
        return {
          sum: buySum,
          code: code,
          sign: sign
        };
      }
    }
  }
  static getOriginalValuation(item, date) {
    let {
      code,
      sign
    } = Active.getCodeAndSign(item);
    return this.getValuation(item, date, sign, code, true);
  }
}