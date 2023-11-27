import AccountConstants from "../constants/AccountConstants";
import Money from "./Money";

export default class Account
{
  /**
   * если счет был удалён, то операция будет привязана к временному счету
   * данная функция фильтрует счета, чтобы нельзя было выбрать временный счет,
   * но показывает в качестве выбранного временный счет после удаления
   *
   * @param value
   * @param propsAccounts
   * @param types
   * @returns {Array}
   */
  static getFiltered(value, propsAccounts, types)
  {
    let accounts = [];

    propsAccounts.map((item) => {
      if(types.indexOf(item.type_id) !== -1)
      {
        accounts.push(item);
      }else if(item.type_id === AccountConstants.TEMP){
        item.accounts.map((subAccount) =>
        {
          if(subAccount.id === value)
          {
            let copyItem = {...item};
            copyItem.accounts = [];
            copyItem.accounts.push(subAccount);

            accounts.push(copyItem);
          }
        });
      }
    });

    return accounts;
  }

  /**
   *
   * @param value
   * @param propCurrencies
   * @returns {Array}
   */
  static getCurrencyFiltered(value, propCurrencies)
  {
    let currencies = [];

    propCurrencies.map((item) => {
      // if(['RUB', 'USD', 'EUR'].indexOf(item.code) !== -1)
      // {
        currencies.push(item);
      // }else{
      //   if(value && value.id === item.id)
      //   {
      //     currencies.push(item);
      //   }
      // }
    });

    return currencies;
  }

  /**
   *
   * @param accounts
   * @param currency
   * @param textLength
   * @returns {Array}
   */
  static prepareAccounts(accounts, currency, textLength = 20)
  {
    let preparedAccounts = [];

    accounts.map((account) =>
    {
      let name = '';
      if(currency){

        account.accounts.map((subAccount) =>
        {
          if(currency.id === subAccount.currency_id){
            name = '';
            if(subAccount.name && subAccount.name.length > textLength)
            {
              name = subAccount.name.substr(0, textLength - 1) + '...';
            }else{
              name = subAccount.name ? subAccount.name : 'Счёт без названия';
            }

            preparedAccounts.push({
              id: subAccount.id,
              name: name.capitalize() + ': ' +  Money.format(subAccount.sum) + ' ' + subAccount.currency.sign
            });
          }
        });
      }else{
        account.accounts.map((subAccount) =>
        {
          name = '';
          if(subAccount.name && subAccount.name.length > textLength)
          {
            name = subAccount.name.substr(0, textLength - 1) + '...';
          }else{
            name = subAccount.name ? subAccount.name : 'Счёт без названия';
          }

          preparedAccounts.push({
            id: subAccount.id,
            name: name.capitalize() + ': ' +  Money.format(subAccount.sum) + ' ' + subAccount.currency.sign
          });
        });
      }
    });

    return preparedAccounts
  }
}
