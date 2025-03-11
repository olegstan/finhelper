import BaseModel from "./BaseModel";
import ModelHelper from "../helpers/ModelHelper";
export default class Payment extends BaseModel {
  /**
   *
   * @type {string}
   */
  controller = 'active_payment';
  modelFields = {
    'currency': {
      loaded: false
    },
    'account': {
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
  get account() {
    if (!this.modelFields.account.loaded && this.attributes['account_id']) {
      this.attributes['account'] = ModelHelper.getUserAccountById(this.attributes['account_id']);
      this.modelFields.account.loaded = true;
    }
    return this.attributes['account'];
  }
  set account(x) {
    return this.attributes['account'] = x;
  }
}
//# sourceMappingURL=Payment.js.map