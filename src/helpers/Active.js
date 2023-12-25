import moment from "moment/moment";
import ActiveConstants from "../constants/ActiveConstants";
import {Api} from "laravel-request";
import ActiveModel from "../models/Active";
import AccountConstants from "../constants/AccountConstants";
import Money from "./Money";
import CurrencyConstants from "../constants/CurrencyConstants";

export default class Active
{
  /**
   *
   * @param item
   * @return {string|*|string}
   */
  static getName(item)
  {
    if (ActiveConstants.isPackage(item.type_id))
    {
      return (item.name_text ? item.name_text : 'Без названия');
    }

    if (item.type_text && item.name_text)
    {
      return item.type_text + ' ' + item.name_text;
    }

    if (item.type_text)
    {
      return item.type_text;
    }

    return 'Без названия';
  }

  static getGroup(items)
  {
    let stocks = [];

    items.map((group, key) =>
    {
      stocks[key] = {};
      stocks[key].id = group.id;
      stocks[key].name = group.name;
      stocks[key].items = [];

      group.items.map((item, groupKey) =>
      {
        stocks[key].items[groupKey] = {...item};
        stocks[key].items[groupKey].id = item.id + '-' + item.type_id + (item.ticker ? '-' + item.ticker : '');
      })
    });

    return stocks;
  }

  static getRangesByValue(value)
  {
    let preparedValue = value > 100 ? Math.abs(value) : 100;
    let ranges = [];
    if (preparedValue <= 500)
    {
      ranges.push(0);
      ranges.push(preparedValue);
      ranges.push(preparedValue);
      ranges.push(preparedValue);
    } else if (preparedValue <= 1500)
    {
      ranges.push(0);
      ranges.push(500);
      ranges.push(Math.floor(preparedValue));
      ranges.push(Math.floor(preparedValue));
    } else
    {
      ranges.push(0);
      ranges.push(Math.floor(preparedValue / 100 * 30));
      ranges.push(Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 30));
      ranges.push(Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 30) + Math.floor(preparedValue / 100 * 40));
    }

    return ranges;
  }

  static getAvgDate(trade, date)
  {
    if (trade.trade_at)
    {
      if (date)
      {
        let tradeDate = moment(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');

        let diffInDays = Math.abs(date.diff(tradeDate, 'days'));

        //каждая следующая дата будет больше прошлой,
        //поэтому всегда двигаемся вперед
        return date.add(diffInDays / 2, 'days');
      } else
      {
        return moment(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss').clone().startOf('day');
      }
    }
  }


  /**
   *
   * @param active
   * @param {Object[]} items
   * @returns {*}
   */
  static getCountSum(active, items)
  {
    let count = 0;
    let lotsize = active.item ? active.item.lotsize : 1;

    items.map((trade) =>
    {
      count += trade.count;
    });

    return count * lotsize;
  }

  /**
   *
   * @param active
   * @param {Object[]} items
   * @returns {*}
   */
  static getCountSumWithoutLotSize(active, items)
  {
    let count = 0;

    items.map((trade) =>
    {
      count += trade.count;
    });

    return count;
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getConfirmedPaymentsSum(payments, original = false)
  {
    let sum = 0;
    if (payments?.length)
    {
      payments.map((payment) =>
      {
        if (payment.is_confirmed)
        {
          sum += original ? payment.original_sum : payment.sum;
        }
      });
    }

    return sum;
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getConfirmedPaymentsOriginalSum(payments)
  {
    return this.getConfirmedPaymentsSum(payments, true)
  }

  /**
   *
   * @param payments
   * @returns {number}
   */
  static getPaymentsOriginalSum(payments)
  {
    let sum = 0;
    if (payments.length)
    {
      payments.map((payment) =>
      {
        sum += payment.original_sum;


      });
    }

    return sum;
  }

  static getObligationCurrent(item, date)
  {
    let sum = 0;
    let futureDate = date.clone().add('12', 'months').startOf('day');

    item.payments.map((payment) =>
    {
      let paymentDate = moment(payment.paid_at_date, 'DD.MM.YYYY').startOf('day');

      if (payment.is_confirmed === false && paymentDate.isBefore(futureDate))
      {
        sum += Math.abs(payment.sum);
      }
    });

    return {sum: sum, code: ''};
  }

  static getObligationLongTerm(item, date, birthDate)
  {
    let sum = 0;
    let count = 0;
    let futureDate = date.clone().add('12', 'months').startOf('day');

    item.payments.map((payment) =>
    {
      let paymentDate = moment(payment.paid_at_date, 'DD.MM.YYYY').startOf('day');

      if (payment.is_confirmed === false && paymentDate.isSameOrAfter(futureDate))
      {
        sum += Math.abs(payment.sum);
        count++
      }
    });

    return {sum: sum, code: ''};
  }

  static getCodeAndSign(item)
  {
    let code = '';
    let sign = '';

    if (item.last_valuation)
    {
      code = CurrencyConstants.getCurrencyCodeById(item.last_valuation.currency_id);
      sign = CurrencyConstants.getCurrencySignById(item.last_valuation.currency_id);
    }

    if (!code && !sign)
    {
      code = CurrencyConstants.getCurrencyCodeByActive(item);
      sign = CurrencyConstants.getCurrencySignByActive(item);
    }
    return {code, sign};
  }

  /**
   * метод для того чтобы если были переводы на счёт, то цена внесения 0 будет, получается
   * что это будет учитываться при оценке, нужно это исключить, проверкой > 0
   * @param array
   * @param field
   * @returns {number|*}
   */
  static getNotNullPrice(array, field)
  {
    for (let i = array.length - 1; i >= 0; i--)
    {
      if (array[i][field] > 0)
      {
        return array[i][field];
      }
    }

    return 0;
  }

  static getAccountsByDate(self, bindString, data, clientId, accountBanks = [], date = moment(), callback)
  {
    let query = Api.get('user-account', 'index', data)
      .setDomain(process.env.REACT_APP_API_WHITESWAN_URL)
      .where('user_id', clientId)
      .where('is_visible', 1)
      .with('accounts', 'accounts.currency');

    if (accountBanks.length)
    {
      query.whereIn('bank_id', accountBanks);
    }

    query
      .all(() =>
      {
        callback()
      })
      .bind(self, bindString)
  }

  static getBalanceByDate(self, accounts, currencyData, clientId, accountBanks = [], date = moment(), callback, types, courses)
  {
    self.setState((prv) =>
    {
      prv.brokerBalance.sum = 0;
      prv.cashBalance.sum = 0;
      prv.bankBalance.sum = 0;
      prv.digitBalance.sum = 0;
      accounts.map((item) =>
      {
        item.accounts.map((account) =>
        {
          try
          {
            if (account.sum > 0)
            {
              switch (item.type_id)
              {
                case AccountConstants.BROKER_ACCOUNT:
                  prv.brokerBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case AccountConstants.CASH:
                  prv.cashBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case AccountConstants.BANK_ACCOUNT:
                  prv.bankBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
                case AccountConstants.DIGIT_MONEY:
                  prv.digitBalance.sum += Money.convert(Money.toDigits(account.sum), currencyData.currency_id, account.currency_id);
                  break;
              }
            }
          } catch (e)
          {
            console.log(e)
          }
        })
      });

      return prv;
    }, () =>
    {
      if (typeof callback === 'function')
      {
        callback();
      }
    })
  }

  static getActivesByDate(self, bindString, data, clientId, accountBanks = [], date = moment(), callback)
  {
    let now = date.clone().format('YYYY-MM-DD HH:mm:ss');
    let before = date.clone().add('12', 'months').format('YYYY-MM-DD HH:mm:ss');

    data.user_id = clientId;

    Api.get('active', 'index', data)
      .setDomain(process.env.REACT_APP_API_WHITESWAN_URL)
      .where((query) =>
      {
        return query.where('type_id', ActiveConstants.OBLIGATION)
          .whereDate('sell_at', '<=', before)
          .whereDoesntHave('sell_trades', (query) =>
          {
            return query.whereDate('trade_at', '<=', now);
          })
      })
      .with('buy_currency')
      .with('sell_currency')
      .with('income_currency')
      .with('buy_account')
      .with('sell_account')
      .with('income_account')
      .with('valuations')//TODO
      .with('payments', 'payments.currency')
      .with('buy_trades', (query) =>
      {
        return query
          .with('currency', 'commissions')
          .where('trade_at', '<=', now);
      })
      .with('sell_trades', (query) =>
      {
        return query
          .with('currency', 'commissions')
          .where('trade_at', '<=', now);
      })
      .with('dividends')
      .all((response) =>
      {
        self.setState((prv) =>
        {
          prv[bindString] = ActiveModel.load(response.data);

          return prv;
        }, () =>
        {
          callback()
        });
      });
  }

  static getInvestsByDate(self, bindString, data, clientId, accountBanks = [], date = moment(), callback)
  {
    let now = date.clone().format('YYYY-MM-DD HH:mm:ss');
    let before = date.clone().add('12', 'months').format('YYYY-MM-DD HH:mm:ss');

    data.user_id = clientId;
    data.exchange_valuation = 1;
    data.with_convert_trade = 1;
    data.profitability = 1;

    Api.get('active', 'invest-grid-index', data)
      .setDomain(process.env.REACT_APP_API_WHITESWAN_URL)
      .where('type_id', '!=', ActiveConstants.CURRENCY)
      .where((query) => {
        return query.orWhere((query) =>
        {
          return query.whereIn('type_id', [
            ActiveConstants.DEPOSIT,
            ActiveConstants.DEBT,
            ActiveConstants.FUNDED_LIFE_INSURANCE,
          ])
        })
          .orWhere((query) =>
          {
            query.whereIn('type_id', ActiveConstants.PACKAGE_GROUP)
              .whereDoesntHave('sell_trades', (query) =>
              {
                return query.whereDate('trade_at', '<=', now);
              })

            if(accountBanks.length)
            {
              query.whereHas('buy_trades.from_account.user_account', (query) => {
                return query.whereIn('bank_id', accountBanks);
              })
                .orWhereHas('buy_trades.to_account.user_account', (query) => {
                  return query.whereIn('bank_id', accountBanks);
                })
            }

            return query;
          })
          .orWhere((query) =>
          {
            return query.where('group_id', ActiveConstants.INVEST)
              .whereDate('buy_at', '<=', before)
              .where((query) =>
              {
                return query.where('sell_at', '>', now)
                  .orWhereNull('sell_at')
                  .whereDoesntHave('sell');
              })
              .wherePropertyType(true)
          })
      })

      .all((response) =>
      {
        self.setState((prv) =>
        {
          prv[bindString] = ActiveModel.load(response.data)?.sort((c1, c2) =>
          {
            let valuation1 = c1.valuation;
            let valuation2 = c2.valuation;

            return (valuation1 < valuation2) ? 1 : (valuation1 > valuation2) ? -1 : 0
          });

          return prv;
        }, () =>
        {
          callback()
        });
      });
  }

  static getPropertiesByDate(self, bindString, data, clientId, accountBanks = [], date = moment(), callback)
  {
    let now = date.clone().format('YYYY-MM-DD HH:mm:ss');

    data.user_id = clientId;

    Api.get('active', 'index', data)
      .setDomain(process.env.REACT_APP_API_WHITESWAN_URL)
      .where('buy_at', '<=', now)
      .where((query) =>
      {
        return query.where('sell_at', '>', now)
          .orWhereNull('sell_at')
          .whereDoesntHave('sell')
      })
      .where('group_id', ActiveConstants.OWN)
      .wherePropertyType(true)
      .with('sell_trades')
      .with('valuations')
      .with('buy_currency')
      .with('sell_currency')
      .with('income_currency')
      .with('buy_account')
      .with('sell_account')
      .with('income_account')
      .all((response) =>
      {
        self.setState((prv) =>
        {
          prv[bindString] = ActiveModel.load(response.data);

          return prv;
        }, () =>
        {
          callback()
        });
      });
  }

  static getSpendingsByDate(self, bindString, data, clientId, date = moment(), callback)
  {
    data.user_id = clientId;

    Api.get('active', 'index', data)
      .setDomain(process.env.REACT_APP_API_WHITESWAN_URL)
      .where('buy_at', '<=', date.format('YYYY-MM-DD HH:mm:ss'))
      .whereSpendingType(true)
      .with('sell_trades')
      .with('valuations')
      .with('buy_currency')
      .with('sell_currency')
      .with('income_currency')
      .with('buy_account')
      .with('sell_account')
      .with('income_account')
      .with('payments')
      .all(() =>
      {
        callback()
      })
      .bind(self, bindString);
  }

  static getObligationsByDate(self, bindString, data, clientId, accountBanks = [], date = moment(), callback)
  {
    data.user_id = clientId;

    Api.get('active', 'invest-grid-index', data)
      .setDomain(process.env.REACT_APP_API_WHITESWAN_URL)
      .where('buy_at', '<=', date.format('YYYY-MM-DD HH:mm:ss'))
      .whereObligationType(true)
      .with('buy_currency')
      .with('sell_currency')
      .with('income_currency')
      .with('buy_account')
      .with('sell_account')
      .with('income_account')
      .with('payments')
      .all((response) =>
      {
        self.setState((prv) =>
        {
          prv[bindString] = ActiveModel.load(response.data);

          return prv;
        }, () =>
        {
          callback()
        });
      });
  }

  static isRetire(user, year)
  {
    let startDate = moment(year, 'YYYY').startOf('year');
    let retiredDate = moment(user.birth_at_date, 'DD.MM.YYYY').add(user.retired_age, 'year')
    let deadDate = moment(user.birth_at_date, 'DD.MM.YYYY').add(user.retired_age, 'year').add(user.dead_age, 'year')

    if (startDate.isAfter(retiredDate) && startDate.isSameOrBefore(deadDate))
    {
      return true;
    }
  }
}
