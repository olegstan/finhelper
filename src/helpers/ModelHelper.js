import CurrencyConstants from "../constants/CurrencyConstants";

export default class ModelHelper
{
  /**
   *
   * @type {Array}
   */
  static currencies = [];

  /**
   *
   * @type {Array}
   */
  static accounts = [];

  static getCurrencyById(id)
  {
    let res = null;
    CurrencyConstants.currencies.forEach((item) =>
    {
      if (item.id === id)
      {
        res = item;
      }
    });

    return res;
  }

  static getUserAccountById(id)
  {
    let res = null;
    ModelHelper.accounts.forEach((account) =>
    {
      account.accounts.forEach((item) =>
      {
        if (item.id === id)
        {
          res = item;
        }
      })
    });

    return res;
  }
}