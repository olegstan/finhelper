import moment from "moment/moment";
import AccountConstants from "./../constants/AccountConstants";
import { Api } from "laravel-request";
import Cache from "./Cache";
import Active from "./Active";
import InvestCalc from "./InvestCalc";
import ActiveModel from "./../models/Active";
class ReactComponentEmulator {
  state = {};
  setState(param, callback) {
    if (typeof param === 'function') {
      this.state = param(this.state);
    } else if (typeof param === 'object') {
      this.state = param;
    }
    if (typeof callback === 'function') {
      callback();
    }
  }
}
export default class UserValuation {
  static getAccountValuation(array) {
    return array.sum > 0 ? array.sum : 0;
  }
  static getWholeActivesSum(state) {
    let sum = 0;

    // sum += InvestCalc.getValuation(state.properties);
    sum += InvestCalc.getValuation(state.invests);
    // sum += UserValuation.getAccountValuation(state.bankBalance);
    // sum += UserValuation.getAccountValuation(state.brokerBalance);
    // sum += UserValuation.getAccountValuation(state.cashBalance);
    // sum += UserValuation.getAccountValuation(state.digitBalance);

    return sum;
  }
  static getInvestActivesSum(state) {
    let sum = 0;

    // sum += InvestCalc.getValuation(state.properties);
    sum += InvestCalc.getValuation(state.invests);
    // sum += UserValuation.getAccountValuation(state.bankBalance);
    // sum += UserValuation.getAccountValuation(state.brokerBalance);
    // sum += UserValuation.getAccountValuation(state.cashBalance);
    // sum += UserValuation.getAccountValuation(state.digitBalance);

    return sum;
  }
  static async getInvestActivesValuation(clientId, currencyId, accountBanks = [], courses) {
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
    };
    let cachedValue = Cache.getItem('cache.' + clientId);
    if (cachedValue !== null) {
      return cachedValue;
    } else {
      return await new Promise((resolve, reject) => {
        let now = moment();
        let currencyData = {
          currency_id: currencyId,
          user_id: clientId
        };
        Active.getAccountsByDate(component, 'accounts', currencyData, clientId, accountBanks, now, () => {
          // Active.getBalanceByDate(component, component.state.accounts, currencyData, clientId, accountBanks, now, () =>
          // {
          Active.getInvestsByDate(component, 'invests', currencyData, clientId, accountBanks, now, () => {
            // Active.getPropertiesByDate(component, 'properties', currencyData, clientId, accountBanks, now, () =>
            // {
            //   Active.getObligationsByDate(component, 'obligations', currencyData, clientId, accountBanks, now, () =>
            //   {
            let valuation = UserValuation.getInvestActivesValuation(component.state);
            if (valuation > 0) {
              Cache.setItem('cache.' + clientId, valuation);
            }
            resolve(valuation);
            //   })
            // })
          });
          // }, [
          //   AccountConstants.BROKER_ACCOUNT,
          //   AccountConstants.BANK_ACCOUNT,
          //   AccountConstants.CASH,
          //   AccountConstants.DIGIT_MONEY
          // ], courses)
        });
      });
    }
  }
}