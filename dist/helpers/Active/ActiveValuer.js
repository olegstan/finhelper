import moment from "moment/moment";
import ActiveValueCalculator from "./ActiveValueCalculator";
import ActiveConstants from "./../../constants/ActiveConstants";
import Active from "./../Active";
export default class ActiveValuer {
  /**
   *
   * @param item
   * @param now
   * @param sign
   * @param code
   * @param original
   * @return {{code, sign, sum: number}}
   */
  static getDiff(item, now, sign, code, original = false) {
    let buySum = this.getBuyValuation(item, original);
    let obj = this.getValuation(item, now, sign, code);
    if (obj) {
      return {
        sum: obj.sum - buySum,
        sign: sign,
        code: code
      };
    }
  }
  static getDiffCurrency(item, now) {
    let {
      code,
      sign
    } = Active.getCodeAndSign(item);
    return this.getDiff(item, now, sign, code, true);
  }

  /**
   *
   * @param item
   * @param original
   * @return {number|*}
   */
  static getBuyValuation(item, original = false) {
    if (item) {
      const {
        buy_trades
      } = item;
      let buy_sum = original ? item.original_buy_sum : item.buy_sum;
      if (ActiveConstants.isPackage(item.type_id)) {
        return ActiveValueCalculator.getSum(buy_trades, original) + ActiveValueCalculator.getCouponBuySum(item, original);
      } else {
        return buy_sum;
      }
    }
  }

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
      const {
        sell_trades,
        type_id,
        buy_trades,
        sell_at_datetime,
        rate_type_id,
        last_valuation,
        payments
      } = item;
      let buy_sum = original ? item.original_buy_sum : item.buy_sum;
      let sell_sum = original ? item.original_sell_sum : item.sell_sum;
      let income = original ? item.original_income : item.income;
      const lotsize = item?.item ? item?.item.lotsize : 1;
      if (ActiveConstants.isPackage(item.type_id)) {
        if (sell_trades?.length) {
          let sum = ActiveValueCalculator.getSum(sell_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(sell_trades, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);
          return {
            sum: parseFloat(sum),
            code: code,
            sign: sign
          };
        } else if (ActiveConstants.COUPON_GROUP.indexOf(type_id) !== -1 && buy_trades?.length) {
          let sellDate = moment(sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          if (date && sellDate && sellDate.isBefore(date)) {
            let count = Active.getCountSum(item, buy_trades);
            let buySum = buy_sum * count + ActiveValueCalculator.getCouponSellSum(item, original); // + ActiveValueCalculator.getCouponBuySum(item);
            return {
              sum: parseFloat(buySum),
              code: code,
              sign: sign
            };
          }
        }
        if (last_valuation && last_valuation.morph === 'active.user.valuation') {
          let count = Active.getCountSum(item, buy_trades);
          let valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
          let buySum = valuation * count / lotsize + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
          return {
            sum: parseFloat(buySum),
            code: code,
            sign: sign
          };
        }
        if (last_valuation && buy_trades?.length) {
          let count = Active.getCountSum(item, buy_trades);
          let lastTrade = buy_trades[buy_trades?.length - 1];
          let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
          let lastValuationDate = moment(last_valuation.value_at_date, 'DD.MM.YYYY');
          let buySum;
          if (!lastTradeDate.isValid()) {
            console.warn('not valid date', lastTrade);
          }
          if (!lastValuationDate.isValid()) {
            console.warn('not valid date', lastValuationDate);
          }
          if (lastTradeDate.isBefore(lastValuationDate)) {
            let valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
            buySum = valuation * count + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
          } else {
            let valuation = original ? lastTrade.original_price : lastTrade.price;
            buySum = valuation * count + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
          }
          return {
            sum: parseFloat(buySum),
            code: code,
            sign: sign
          };
        } else if (buy_trades?.length) {
          if (buy_trades?.length === 1) {
            let lastTrade = buy_trades[buy_trades?.length - 1];
            let buySum = original ? lastTrade.original_sum : lastTrade.sum;
            buySum += ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
            return {
              sum: parseFloat(buySum),
              code: code,
              sign: sign
            };
          }
          let count = Active.getCountSum(item, buy_trades);
          let lastPrice = Active.getNotNullPrice(buy_trades, original ? 'original_price' : 'price');
          let buySum = lastPrice * count / lotsize + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
          return {
            sum: parseFloat(buySum),
            code: code,
            sign: sign
          };
        }
      } else {
        //если актив не продан и является купонным, то нужно проверить дату, если дата погашения прошла и нет оценок, то рассчитываем оценку по номиналу
        if (ActiveConstants.DEBT_GROUP.indexOf(type_id) !== -1) {
          let sellDate = moment(sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          let sellSum = 0;
          switch (rate_type_id) {
            case ActiveConstants.SIMPLE:
              sellSum = Active.getConfirmedPaymentsSum(payments, original) + buy_sum;
              break;
            case ActiveConstants.DIFFERENTIAL:
              sellSum = Active.getConfirmedPaymentsSum(payments, original);
              break;
          }
          return {
            sum: parseFloat(sellSum),
            code: code,
            sign: sign
          };
        } else if (ActiveConstants.PROPERTY_GROUP.indexOf(type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(type_id) !== -1) {
          if (sell_sum > 0) {
            return {
              sum: parseFloat(sell_sum),
              code: code,
              sign: sign
            };
          } else if (item.sell && item.sell.sum > 0) {
            return {
              sum: parseFloat(item.sell.sum),
              code: code,
              sign: sign
            };
          } else if (last_valuation) {
            let valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
            return {
              sum: parseFloat(valuation) / lotsize,
              code: code,
              sign: sign
            };
          } else {
            let addSum = 0;
            if (item.invests && item.invests.length) {
              item.invests.map(investAction => {
                let invest = {
                  ...investAction.child_item
                };
                addSum += parseFloat(invest.sum);
              });
            }
            return {
              sum: parseFloat(buy_sum + addSum),
              code: code,
              sign: sign
            };
          }
        } else if ([[...ActiveConstants.CREDIT_GROUP], ...[ActiveConstants.CUSTOM_OBLIGATION]].indexOf(type_id) !== -1) {
          return {
            sum: parseFloat(income * 12),
            code: code,
            sign: sign
          };
        } else if (type_id === ActiveConstants.MONEY_ACTIVE) {
          return {
            sum: parseFloat(buy_sum),
            code: code,
            sign: sign
          };
        }
      }
    }
  }

  /**
   *
   * @param item
   * @param date
   * @return {{code: string, sum: number}|{code: string, sign, sum: number}|{code: string, sign, sum: *}}
   */
  static getOriginalValuation(item, date) {
    let {
      code,
      sign
    } = Active.getCodeAndSign(item);
    return this.getValuation(item, date, sign, code, true);
  }
}