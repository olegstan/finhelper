import ModelHelper from "../helpers/ModelHelper";
import Trade from "./Trade";
export default class SellTrade extends Trade {
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
}