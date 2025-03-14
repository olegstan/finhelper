import ModelHelper from "../helpers/ModelHelper";
import Trade from "./Trade";
export default class BuyTrade extends Trade {
  constructor(attributes) {
    super();
    this.attributes = attributes;
    this.setGetters(attributes);
  }
  loadConvertTrade() {
    if (!this.modelFields.convert_trade.loaded && this.attributes?.convert_trade?.active?.buy_trades?.length > 0) {
      let trade = this.attributes?.convert_trade?.active?.buy_trades[0];
      //находим пропорционально цену 1 лота
      let price = 0,
        originalPrice = 0,
        accumulatedCouponPerOne = 0,
        originalAccumulatedCouponPerOne = 0;
      if (trade['count'] > 0) {
        price = trade['sum'] / trade['count'];
        originalPrice = trade['original_sum'] / trade['count'];
        accumulatedCouponPerOne = trade['accumulated_coupon'] / trade['count'];
        originalAccumulatedCouponPerOne = trade['original_accumulated_coupon'] / trade['count'];
      }
      this.attributes['currency'] = ModelHelper.getCurrencyById(trade['currency_id']);
      // this.attributes['id'] = trade['id'];//нельзя менять id так как будет открываться на редатирование старый трейд
      this.attributes['price'] = price;
      this.attributes['original_price'] = originalPrice;
      this.attributes['sum'] = this.attributes['count'] * price;
      this.attributes['original_sum'] = this.attributes['count'] * originalPrice;
      this.attributes['count'] = this.attributes['count'];
      this.attributes['accumulated_coupon'] = this.attributes['count'] * accumulatedCouponPerOne;
      this.attributes['original_accumulated_coupon'] = this.attributes['count'] * originalAccumulatedCouponPerOne;
      this.attributes['type_id'] = trade['type_id'];
      this.attributes['trade_at'] = trade['trade_at'];
      this.attributes['trade_at_date'] = trade['trade_at_date'];
      this.attributes['trade_at_datetime'] = trade['trade_at_datetime'];
      this.modelFields.convert_trade.loaded = true;
    }
  }
}
//# sourceMappingURL=BuyTrade.js.map