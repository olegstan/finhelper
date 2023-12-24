import moment from "moment/moment";
import ActiveValueCalculator from "./ActiveValueCalculator";
import ActiveConstants from "./../../constants/ActiveConstants";
import Active from "./../Active";

export default class ActiveValuer
{
  /**
   *
   * @param item
   * @param date
   * @param sign
   * @param code
   * @param original
   * @return {{code: string, sum: number}|{code: string, sign, sum: number}|{code: string, sign, sum: *}}
   */
  static getValuation(item, date, sign, code, original = false)
  {
    if (item)
    {
      const {
        sell_trades,
        type_id,
        buy_trades,
        sell_at_datetime,
        rate_type_id,
        buy_sum,
        sell_sum,
        last_valuation,
        payments,
        income,
      } = item;

      const lotsize = item?.item ? item?.item.lotsize : 1;

      //если актив не продан и является купонным, то нужно проверить дату, если дата погашения прошла и нет оценок, то рассчитываем оценку по номиналу
      if (sell_trades?.length)
      {
        let sum = ActiveValueCalculator.getSum(sell_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(sell_trades, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);

        return {sum: sum, code: code, sign: sign};
      } else if (ActiveConstants.COUPON_GROUP.indexOf(type_id) !== -1 && buy_trades?.length)
      {
        let sellDate = moment(sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (date && sellDate && sellDate.isBefore(date))
        {
          let count = Active.getCountSum(item, buy_trades);
          let buySum = (buy_sum * count) + ActiveValueCalculator.getCouponSellSum(item, original);// + ActiveValueCalculator.getCouponBuySum(item);
          return {sum: buySum, code: code, sign: sign};
        }
      } else if (ActiveConstants.DEBT_GROUP.indexOf(type_id) !== -1)
      {
        let sellDate = moment(sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        let sellSum = 0;
        switch (rate_type_id)
        {
          case ActiveConstants.SIMPLE:
            sellSum = Active.getConfirmedPaymentsSum(payments) + buy_sum;
            break;
          case ActiveConstants.DIFFERENTIAL:
            sellSum = Active.getConfirmedPaymentsSum(payments);
            break;
        }

        return {sum: sellSum, code: code, sign: sign};
      } else if (ActiveConstants.PROPERTY_GROUP.indexOf(type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(type_id) !== -1)
      {
        if (sell_sum > 0)
        {
          let sellSum = sell_sum;
          return {sum: sellSum, code: code, sign: sign};
        } else if (last_valuation)
        {
          return {sum: last_valuation.current_sum / lotsize, code: ''};
        } else
        {
          return {sum: buy_sum, code: code, sign: sign};
        }
      } else if ([[...ActiveConstants.CREDIT_GROUP], ...[ActiveConstants.CUSTOM_OBLIGATION]].indexOf(type_id) !== -1)
      {
        return {sum: income * 12, code: code, sign: sign};
      } else if (type_id === ActiveConstants.MONEY_ACTIVE)
      {

        return {sum: buy_sum, code: code, sign: sign};
      }

      if (last_valuation && last_valuation.morph === 'active.user.valuation')
      {
        let count = Active.getCountSum(item, buy_trades);

        let buySum = (last_valuation.current_sum * count / lotsize) + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);

        return {sum: buySum, code: code, sign: sign};
      }

      if (last_valuation && buy_trades?.length)
      {
        let count = Active.getCountSum(item, buy_trades);

        let lastTrade = buy_trades[buy_trades?.length - 1];

        let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
        let lastValuationDate = moment(last_valuation.value_at_date, 'DD.MM.YYYY');

        let buySum = 0;

        if (!lastTradeDate.isValid())
        {
          console.warn('not valid date', lastTrade)
        }

        if (!lastValuationDate.isValid())
        {
          console.warn('not valid date', lastValuationDate)
        }

        if (lastTradeDate.isBefore(lastValuationDate))
        {
          buySum = (last_valuation.current_sum * count / lotsize) + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
        } else
        {
          buySum = (lastTrade.price * count) + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);
        }

        return {sum: buySum, code: code, sign: sign};
      } else if (buy_trades?.length)
      {
        if (buy_trades?.length === 1)
        {
          let buySum = buy_trades[buy_trades?.length - 1].sum + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);

          return {sum: buySum, code: code, sign: sign};
        }
        
        let count = Active.getCountSum(item, buy_trades);
        let lastPrice = Active.getNotNullPrice(buy_trades, 'price');
        let buySum = (lastPrice * count / lotsize) + ActiveValueCalculator.getCouponSellSum(item, original) + ActiveValueCalculator.getDividendSum(item, original);

        return {sum: buySum, code: code, sign: sign};
      }
    }
  }

  static getOriginalValuation(item, date)
  {
    let {code, sign} = Active.getCodeAndSign(item);

    return this.getValuation(item, date, sign, code, true)
  }
}