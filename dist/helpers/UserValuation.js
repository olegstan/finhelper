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
    sum += InvestCalc.getValuation(state.properties);
    sum += InvestCalc.getValuation(state.invests);
    sum += UserValuation.getAccountValuation(state.bankBalance);
    sum += UserValuation.getAccountValuation(state.brokerBalance);
    sum += UserValuation.getAccountValuation(state.cashBalance);
    sum += UserValuation.getAccountValuation(state.digitBalance);
    return sum;
  }
  static async getValuation(clientId, currencyId, courses) {
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
          currency_id: currencyId
        };
        Active.getAccountsByDate(component, 'accounts', currencyData, clientId, now, () => {
          Active.getBalanceByDate(component, component.state.accounts, currencyData, clientId, now, () => {
            Active.getInvestsByDate(component, 'invests', currencyData, clientId, now, () => {
              Active.getPropertiesByDate(component, 'properties', currencyData, clientId, now, () => {
                Api.get('active', 'index', currencyData).setDomain(process.env.REACT_APP_API_WHITESWAN_URL).whereObligationType(true).with('sell_trades').with('valuations').with('buy_currency').with('sell_currency').with('income_currency').with('buy_account').with('sell_account').with('income_account').with('payments').with('invests', 'sell').all(response => {
                  component.setState(prv => {
                    prv['obligations'] = ActiveModel.load(response.data);
                    return prv;
                  }, () => {
                    let valuation = UserValuation.getWholeActivesSum(component.state);
                    Cache.setItem('cache.' + clientId, valuation);
                    resolve(valuation);
                  });
                });
              });
            });
          }, [AccountConstants.BROKER_ACCOUNT, AccountConstants.BANK_ACCOUNT, AccountConstants.CASH, AccountConstants.DIGIT_MONEY], courses);
        });
      });
    }
  }
}