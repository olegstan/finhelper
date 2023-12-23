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

}