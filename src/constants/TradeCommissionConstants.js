export default class TradeCommissionConstants
{
  static FIX = 1;
  static PERCENT = 2;

  static TRANSACTION = 1;
  static BROKER = 2;
  static OPERATION = 3;
  static CUSTOM = 4;

  static types()
  {
    return [
      {id: TradeCommissionConstants.FIX, name: 'Фиксированная сумма'},
      {id: TradeCommissionConstants.PERCENT, name: 'Процент от сделки'},
    ];
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  static getTypeById(id)
  {
    let type = null;

    TradeCommissionConstants.types().map((item) =>
    {
      if (item.id === id)
      {
        type = item
      }


    })

    return type;
  }
}