export default class TransferConstants
{
  static BETWEEN_ACCOUNTS = 1;
  static TAX = 2;
  static SPENDING = 3;
  static INCOME = 4;
  static CHANGE = 5;
  static BETWEEN_ACCOUNTS_TEMP = 6;

  static BUY_OWN_ACTIVE = 7;
  static BUY_INVEST_ACTIVE = 8;

  static SELL_OWN_ACTIVE = 9;
  static SELL_INVEST_ACTIVE = 10;

  static ADD_OWN_ACTIVE = 11;
  static ADD_INVEST_ACTIVE = 12;

  static ADD_PAYMENT = 13;
  static ADD_OBLIGATION_PAYMENT = 14;

  static CONNECT_PAYMENT = 15;

  static FIX = 1;
  static PERCENT = 2;

  static TRANSACTION = 1;
  static BROKER = 2;
  static OPERATION = 3;
  static CUSTOM = 4;

  static items(actionTypeId)
  {
    let variants = [
      {id: TransferConstants.BETWEEN_ACCOUNTS, name: 'Перевод между счетами'},
      {id: TransferConstants.TAX, name: 'Уплата налога'},
      {id: TransferConstants.SPENDING, name: 'Расход'},
      {id: TransferConstants.INCOME, name: 'Доход'},
      {id: TransferConstants.CHANGE, name: 'Перевод на другой счет с конвертацией'},
      {id: TransferConstants.BETWEEN_ACCOUNTS_TEMP, name: 'Перевод между счетами'},
      {id: TransferConstants.BUY_OWN_ACTIVE, name: 'Покупка личного актива'},
      {id: TransferConstants.BUY_INVEST_ACTIVE, name: 'Покупка инвестиционного актива'},
      {id: TransferConstants.ADD_OWN_ACTIVE, name: 'Привязка к личному активу'},
      {id: TransferConstants.ADD_INVEST_ACTIVE, name: 'Привязка к инвестиционному активу'},
      {id: TransferConstants.SELL_OWN_ACTIVE, name: 'Продажа личного актива'},
      {id: TransferConstants.SELL_INVEST_ACTIVE, name: 'Продажа инвестиционного актива'},
      {id: TransferConstants.ADD_PAYMENT, name: 'Привязка платежа к активу'},
      {id: TransferConstants.ADD_OBLIGATION_PAYMENT, name: 'Привязка платежа к обязательству'},
    ];

    if (actionTypeId === TransferConstants.SPENDING)
    {
      variants.push({id: TransferConstants.CONNECT_PAYMENT, name: 'К доходу'})
    } else if (actionTypeId === TransferConstants.INCOME)
    {
      variants.push({id: TransferConstants.CONNECT_PAYMENT, name: 'К расходу'})
    }

    return variants;
  }

  static types()
  {
    return [
      {id: TransferConstants.FIX, name: 'Фиксированная сумма'},
      {id: TransferConstants.PERCENT, name: 'Процент от сделки'},
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

    TransferConstants.types().map((item) =>
    {
      if (item.id === id)
      {
        type = item
      }


    })

    return type;
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  static getItemById(id, oldActionTypeId = null)
  {
    let type = null;

    TransferConstants.items(oldActionTypeId).map((item) =>
    {
      if (item.id === id)
      {
        type = item
      }


    })

    return type;
  }
}