import ActiveConstants from "./ActiveConstants";
export default class CurrencyConstants {
  static RUBBLE_ID = 1;
  static DOLLAR_ID = 12;
  static EURO_ID = 13;
  static DEFAULT_CODES = ['RUB', 'USD', 'EUR'];

  /**
   *
   * @type {[]}
   */
  static currencies = [];
  /**
   *
   * @type {[]}
   */
  static courses = [];

  /**
   *
   * @param id
   * @return {*}
   */
  static getCurrencyNameById(id) {
    let currency = CurrencyConstants.getCurrencyById(id);
    if (currency) {
      return currency.name;
    }
  }
  static getCurrencyNameByCode(code) {
    switch (code) {
      case 'USD':
        return 'Доллар США';
      case 'EUR':
        return 'Евро';
      case 'Российский рубль':
        return 'Евро';
      default:
        return code;
    }
  }

  /**
   *
   * @param id
   * @return {null}
   */
  static getCurrencyById(id) {
    let currency = null;
    CurrencyConstants.currencies.map(item => {
      if (item.id === id) {
        currency = item;
      }
    });
    return currency;
  }

  /**
   *
   * @param id
   * @return {*}
   */
  static getCurrencySignById(id) {
    let currency = CurrencyConstants.getCurrencyById(id);
    if (currency) {
      if (currency.sign) {
        return currency.sign;
      } else {
        return currency.code;
      }
    }
  }

  /**
   *
   * @param id
   * @return {*}
   */
  static getCurrencyCodeById(id) {
    let currency = CurrencyConstants.getCurrencyById(id);
    if (currency) {
      if (currency.code) {
        return currency.code;
      } else {
        return currency.sign;
      }
    }
  }

  /**
   *
   * @param item
   * @return {string}
   */
  static getCurrencySignByActive(item) {
    let sign = '';
    if (ActiveConstants.isPackage(item.type_id)) {
      if (item.buy_trades[item.buy_trades?.length - 1]?.currency_id) {
        sign = CurrencyConstants.getCurrencySignById(item.buy_trades[item.buy_trades?.length - 1].currency_id);
      } else if (item.sell_trades[item.sell_trades?.length - 1]?.currency_id) {
        sign = CurrencyConstants.getCurrencySignById(item.sell_trades[item.sell_trades?.length - 1].currency_id);
      }
    } else {
      if (item.buy_currency_id) {
        sign = CurrencyConstants.getCurrencySignById(item.buy_currency_id);
      } else if (item.sell && item.sell.currency_id) {
        sign = CurrencyConstants.getCurrencySignById(item.sell.currency_id);
      } else if (item.invests && item.invests?.length && item.invests[item.invests?.length - 1]?.child_item) {
        let lastInvest = {
          ...item.invests[item.invests?.length - 1].child_item
        };
        sign = CurrencyConstants.getCurrencySignById(lastInvest.currency_id);
      }
    }
    return sign;
  }

  /**
   *
   * @param item
   * @return {string}
   */
  static getCurrencyCodeByActive(item) {
    let code = '';
    if (ActiveConstants.isPackage(item.type_id)) {
      if (item.buy_trades[item.buy_trades?.length - 1]?.currency_id) {
        code = CurrencyConstants.getCurrencyCodeById(item.buy_trades[item.buy_trades?.length - 1].currency_id);
      } else if (item.sell_trades[item.sell_trades?.length - 1]?.currency_id) {
        code = CurrencyConstants.getCurrencyCodeById(item.sell_trades[item.sell_trades?.length - 1].currency_id);
      }
    } else {
      if (item.buy_currency_id) {
        code = CurrencyConstants.getCurrencyCodeById(item.buy_currency_id);
      } else if (item.sell && item.sell.currency_id) {
        code = CurrencyConstants.getCurrencyCodeById(item.sell.currency_id);
      } else if (item.invests && item.invests?.length && item.invests[item.invests?.length - 1]?.child_item) {
        let lastInvest = {
          ...item.invests[item.invests?.length - 1].child_item
        };
        code = CurrencyConstants.getCurrencyCodeById(lastInvest.currency_id);
      }
    }
    return code;
  }
}
//# sourceMappingURL=CurrencyConstants.js.map