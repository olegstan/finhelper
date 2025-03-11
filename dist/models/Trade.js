import BaseModel from "./BaseModel";
import ModelHelper from "../helpers/ModelHelper";
import { Api } from "laravel-request";
export default class Trade extends BaseModel {
  /**
   *
   * @type {string}
   */
  controller = 'active_trade';
  modelFields = {
    'currency': {
      loaded: false
    },
    'from_account': {
      loaded: false
    }
  };
  constructor(attributes) {
    super();
    this.attributes = attributes;
    this.setGetters(attributes);
  }
  get currency() {
    if (!this.modelFields.currency.loaded && this.attributes['currency_id']) {
      this.attributes['currency'] = ModelHelper.getCurrencyById(this.attributes['currency_id']);
      this.modelFields.currency.loaded = true;
    }
    return this.attributes['currency'];
  }
  set currency(x) {
    return this.attributes['currency'] = x;
  }
  get from_account() {
    if (!this.modelFields.from_account.loaded && this.attributes['from_account_id']) {
      this.attributes['from_account'] = ModelHelper.getUserAccountById(this.attributes['from_account_id']);
      this.modelFields.from_account.loaded = true;
    }
    return this.attributes['from_account'];
  }
  set from_account(x) {
    return this.attributes['from_account'] = x;
  }

  //TODO pass user_id for manager
  static getById(id, callback) {
    Api.get('active-trade', 'index').setDomain(process.env.REACT_APP_API_WHITESWAN_URL).where('id', id).with('currency').with('to_account', 'to_account.currency', 'to_account.user_account').with('from_account', 'from_account.currency', 'from_account.user_account').with('get_account', 'get_account.currency').with('payments', 'payments.currency').with('commissions', 'commissions.currency').with('active', 'active.item', 'active.sell_trades', 'active.buy_trades').orderBy('trade_at', 'DESC').first(callback);
  }
}
//# sourceMappingURL=Trade.js.map