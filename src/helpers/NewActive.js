export default class NewActive
{
  static getDiffCurrency(item)
  {

  }

  static getDiff(item)
  {
    if (item?.profit?.instrument?.stock)
    {
      let firstKey = Object.keys(item.profit.instrument.stock)[0];

      if (typeof item.profit.instrument.stock[firstKey] !== 'undefined')
      {
        return item.profit.instrument.stock[firstKey].absolute_returns;
      }
    }
  }

  static getFactPercentByItem(item)
  {
    if (item?.profit?.instrument?.stock)
    {
      let firstKey = Object.keys(item.profit.instrument.stock)[0];

      if (typeof item.profit.instrument.stock[firstKey] !== 'undefined')
      {
        return item.profit.instrument.stock[firstKey].absolute_returns / item.profit.instrument.stock[firstKey].trade_volume * 100;
      }
    }
  }

  static getAnnuallyPercentByItem(item)
  {
    if (item?.profit?.instrument?.stock)
    {
      let firstKey = Object.keys(item.profit.instrument.stock)[0];

      if (typeof item.profit.instrument.stock[firstKey] !== 'undefined')
      {
        return item.profit.instrument.stock[firstKey].yaer_rate_of_return;
      }
    }
  }
}
