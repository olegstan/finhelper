import moment from "moment/moment";
import TradeCommissionConstants from "./../../constants/TradeCommissionConstants";

export default class ActiveValueCalculator
{
  static calculate(active, items) {
    // template method
  }

  /**
   *
   * @param active
   * @param trades
   * @param original
   * @return {number}
   */
  static getAvgPrice(active, trades, original = false)
  {
    let count = 0;
    let sum = 0;
    let lotsize = active.item ? active.item.lotsize : 1;
    trades.map((trade) =>
    {
      count += trade.count;
      sum += original ? trade.original_sum : trade.sum;
    });

    return sum / count / lotsize;
  }

  static getAvgOriginalPrice(active, trades) {
    return this.getAvgPrice(active, trades, true)
  }

  static getAvgDate(active, items) {

  }

  /**
   *
   * @param items
   * @param original
   * @return {number}
   */
  static getSum(items, original = false)
  {
    let sum = 0;
    items.map((trade) =>
    {
      sum += original ? trade.original_sum : trade.sum;
    });

    return sum;
  }

  /**
   *
   * @param items
   * @return {number}
   */
  static getOriginalSum(items)
  {
    return this.getSum(items, true)
  }

  /**
   *
   * @param item
   * @param original
   * @return {number}
   */
  static getCouponBuySum(item, original = false)
  {
    let sum = 0;

    if (item?.buy_trades?.length)
    {
      for (let n = 0; n < item.buy_trades.length; n++)
      {
        sum -= original ? item.buy_trades[n].original_accumulated_coupon : item.buy_trades[n].accumulated_coupon
      }
    }

    return sum;
  }

  /**
   *
   * @param item
   * @returns {number}
   */
  static getCouponBuySum(item)
  {
    return this.getCouponSellSum(item, true)
  }

  /**
   *
   * @param item
   * @returns {number}
   */
  static getCouponSellOriginalSum(item)
  {
    return this.getCouponSellSum(item, true)
  }

  /**
   *
   * @param item
   * @returns {number}
   */
  static getCouponBuyOriginalSum(item)
  {
    return this.getCouponBuySum(item, true)
  }

  /**
   *
   * @param item
   * @param original
   * @return {number}
   */
  static getCouponSellSum(item, original = false)
  {
    let sum = 0;

    if (item.sell_trades?.length)
    {
      for (let n = 0; n < item.sell_trades.length; n++)
      {
        sum += original ? item.sell_trades[n].original_accumulated_coupon : item.sell_trades[n].accumulated_coupon
      }
    }

    return sum;
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getPaymentsSum(payments)
  {
    let sum = 0;
    if (payments.length)
    {
      payments.map((payment) =>
      {
        sum += payment.sum;
      });
    }

    return sum;
  }

  /**
   *
   * @param item
   * @param original
   * @return {number}
   */
  static getDividendSum(item, original = false)
  {
    let sum = 0;
    let nowDate = moment();
    if (item.dividends && item.dividends.length)
    {
      item.dividends.map((dividend) =>
      {
        let decideDate = moment(dividend.decided_at_date, 'DD.MM.YYYY').startOf('day');
        if (item.sell_trades && item.sell_trades.length === 0)
        {
          item.buy_trades.map((trade) =>
          {
            let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY').startOf('day');
            if (tradeDate.isBefore(decideDate) && decideDate.isBefore(nowDate))
            {
              sum += (original ? dividend.original_sum : dividend.sum) * trade.count;
            }


          });
        } else
        {
          if (item.buy_trades?.length && item.sell_trades?.length)
          {
            let buyTrade = item.buy_trades[0];
            let sellTrade = item.sell_trades[0];

            let buyTradeDate = moment(buyTrade.trade_at_date, 'DD.MM.YYYY').startOf('day');
            let sellTradeDate = moment(sellTrade.trade_at_date, 'DD.MM.YYYY').startOf('day');

            if (buyTradeDate.isBefore(decideDate) && decideDate.isBefore(sellTradeDate))
            {
              sum += (original ? dividend.original_sum : dividend.sum) * buyTrade.count;
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
  static getDividendOriginalSum(item)
  {
    return this.getDividendSum(item, true)
  }

  /**
   *
   * @param items
   * @param original
   * @return {number}
   */
  static getCommissionSum(items, original = false)
  {
    let sum = 0;
    if (items.length)
    {
      items.map((item) =>
      {
        if (item.commissions && item.commissions.length)
        {
          item.commissions.map((commission) =>
          {
            switch (commission.type_id)
            {
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
  static getCommissionOriginalSum(items)
  {
    return this.getCommissionSum(items, true)
  }
}