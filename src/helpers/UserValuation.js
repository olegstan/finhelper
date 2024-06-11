import moment from "moment/moment";
import Cache from "./Cache";
import Active from "./Active";
import InvestCalc from "./InvestCalc";
import IndexedDBCache from "./IndexedDBCache";
import {Api} from "laravel-request";

class ReactComponentEmulator
{
  state = {};

  setState(param, callback)
  {
    if (typeof param === 'function')
    {
      this.state = param(this.state);
    } else if (typeof param === 'object')
    {
      this.state = param;
    }

    if (typeof callback === 'function')
    {
      callback();
    }
  }
}

export default class UserValuation
{
  static getAccountValuation(array)
  {
    return array.sum > 0 ? array.sum : 0;
  }

  /**
   *
   * @param state
   * @return {number}
   */
  static getWholeActivesSum(state)
  {
    let sum = 0;

    // sum += InvestCalc.getValuation(state.properties);
    sum += InvestCalc.getValuation(state.invests);
    // sum += UserValuation.getAccountValuation(state.bankBalance);
    // sum += UserValuation.getAccountValuation(state.brokerBalance);
    // sum += UserValuation.getAccountValuation(state.cashBalance);
    // sum += UserValuation.getAccountValuation(state.digitBalance);

    return sum;
  }

  /**
   *
   * @param state
   * @return {number}
   */
  static getInvestActivesSum(state)
  {
    let sum = 0;

    // sum += InvestCalc.getValuation(state.properties);
    sum += InvestCalc.getValuation(state.invests);
    // sum += UserValuation.getAccountValuation(state.bankBalance);
    // sum += UserValuation.getAccountValuation(state.brokerBalance);
    // sum += UserValuation.getAccountValuation(state.cashBalance);
    // sum += UserValuation.getAccountValuation(state.digitBalance);

    return sum;
  }

  /**
   *
   * @param clientId
   * @param currencyId
   * @param accountBanks
   * @param courses
   * @param atonValuation
   * @return {Promise<unknown>}
   */
  static async getInvestActivesValuation(clientId, currencyId, accountBanks = [], courses, atonValuation = false )
  {
    if(atonValuation)
    {
      return await (new Promise((resolve, reject) =>
      {
        Api.get('aton-portfolio', 'index', {user_id: clientId})
          .setDomain(process.env.REACT_APP_API_WHITESWAN_URL)
          .all(({data}) =>
          {
            let sum = 0

            data.map((row) => {
              sum += row.score_position_rub;
            })

            resolve(sum)
          })
      }))
    }else{
      //если данные
      var component = new ReactComponentEmulator();

      component.state = {
        accounts: [],
        actives: [],
        invests: [],
        properties: [],
        spendings: [],
        obligations: [],

        cashBalance: {
          sum: 0
        },
        bankBalance: {
          sum: 0
        },
        brokerBalance: {
          sum: 0
        },
        digitBalance: {
          sum: 0
        }
      }

      let cachedValue = await IndexedDBCache.get('client.valuation.' + clientId)

      if (cachedValue !== null)
      {
        return cachedValue;
      } else
      {
        return await (new Promise((resolve, reject) =>
        {
          let now = moment();

          let currencyData = {
            currency_id: currencyId,
            user_id: clientId
          };

          Active.getAccountsByDate(component, 'accounts', currencyData, clientId, accountBanks, now, () =>
          {
            Active.getInvestsByDate(component, 'invests', currencyData, clientId, accountBanks, now, () =>
            {
              let valuation = UserValuation.getInvestActivesSum(component.state);

              if(valuation > 0)
              {
                Cache.setItem('client.valuation.' + clientId, valuation)
              }
              resolve(valuation)
            })
          })
        }))
      }
    }
  }
}