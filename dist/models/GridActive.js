import BaseModel from "./BaseModel";
import ActiveHelper from "../helpers/Active";
import InvestCalc from "../helpers/InvestCalc";
import BuyTrade from "./BuyTrade";
import SellTrade from "./SellTrade";
import Payment from "./Payment";
import moment from "moment/moment";
import ActiveValuer from "./../helpers/Active/ActiveValuer";
import Catalog from "./Catalog";
import { Money } from "../helpers";
export default class GridActive extends BaseModel {
  /**
   *
   * @type {string}
   */
  controller = 'active';

  /**
   *
   * @param {Array} attributes
   */
  constructor(attributes) {
    super();
    this.attributes = attributes;
    this.setGetters(attributes);
  }
  get avg_own_date_by_value() {
    if (this['tmp_avg_own_date_by_value'] === null || typeof this['tmp_avg_own_date_by_value'] === 'undefined') {
      let trades = this.buy_trades;
      let date = null;
      let value = 0;
      if (trades.length) {
        trades.sort((a, b) => {
          let dateA = moment(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          let dateB = moment(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
          if (!dateA.isValid() || !dateB.isValid()) {
            return 0; // если дата невалидна, считаем их равными
          }
          return dateA - dateB;
        });
        for (let i = 0; i < trades.length; i++) {
          let trade = trades[i];
          if (trade.trade_at) {
            if (date) {
              //каждая следующая дата будет больше прошлой,
              //поэтому всегда двигаемся вперед
              //разница в днях
              let tradeDate = moment(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
              if (tradeDate.isValid()) {
                let diffInDays = Math.abs(date.diff(tradeDate, 'days'));

                //сумма объёмов
                let sumValue = value + trade.count;
                //пропорция
                //из будущего объёма вычитаем текущий
                let diffValue = trade.count - value;
                //процентное соотношение к общему объёму
                let percentValue = Math.abs(diffValue) / sumValue;
                //среднее количество дней учитывая вес объема
                let avgDays = diffInDays / 100 * percentValue;

                //для следующей итерации сохраняем объём по текущей дате
                value = sumValue;
                if (diffValue > 0) {
                  date.add(avgDays, 'days');
                } else {
                  let momentDate = moment(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss').clone().startOf('day');
                  if (momentDate.isValid()) {
                    date.add(avgDays, 'days');
                  }
                }
              }
            } else {
              value = trade.count;
              let momentDate = moment(trade.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss').clone().startOf('day');
              if (momentDate.isValid()) {
                date = momentDate;
              }
            }
          }
        }
      }
      this.attributes['tmp_avg_own_date_by_value'] = date ? date.format('DD.MM.YYYY') : '';
    }
    return this.attributes['tmp_avg_own_date_by_value'];
  }
  get avg_own_date() {
    if (this['tmp_avg_own_date'] === null || typeof this['tmp_avg_own_date'] === 'undefined') {
      let buyTrades = this.buy_trades;
      let sellTrades = this.sell_trades;
      let date = null;
      buyTrades.sort((a, b) => {
        let dateA = moment(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        let dateB = moment(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (!dateA.isValid() || !dateB.isValid()) {
          return 0; // если дата невалидна, считаем их равными
        }
        return dateA - dateB;
      });
      sellTrades.sort((a, b) => {
        let dateA = moment(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        let dateB = moment(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (!dateA.isValid() || !dateB.isValid()) {
          return 0; // если дата невалидна, считаем их равными
        }
        return dateA - dateB;
      });
      if (buyTrades?.length) {
        for (let i = 0; i < buyTrades.length; i++) {
          let trade = buyTrades[i];
          date = ActiveHelper.getAvgDate(trade, date);
        }
        this['tmp_avg_own_date'] = date ? date.format('DD.MM.YYYY') : '';
      }
      if (sellTrades?.length) {
        for (let i = 0; i < sellTrades.length; i++) {
          let trade = sellTrades[i];
          date = ActiveHelper.getAvgDate(trade, date);
        }
        this['tmp_avg_own_date'] = date ? date.format('DD.MM.YYYY') : '';
      }
    }
    return this['tmp_avg_own_date'];
  }
  set avg_own_date(x) {
    this['tmp_avg_own_date'] = x;
  }
  get trades() {
    if (!this.related.trades.loaded) {
      this['tmp_trades'] = [];
      if (this.attributes['sell_trades'] && this.attributes['sell_trades'].length) {
        this.attributes['sell_trades'].map(item => {
          let newTrade = SellTrade.create({
            ...item
          });
          this['tmp_trades'].push(newTrade);
        });
      }
      if (this.attributes['buy_trades'] && this.attributes['buy_trades'].length) {
        this.attributes['buy_trades'].map(item => {
          let newTrade = BuyTrade.create({
            ...item
          });
          this['tmp_trades'].push(newTrade);
        });
      }
      this['tmp_trades']?.sort((a, b) => {
        let aDate = moment(a.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        let bDate = moment(b.trade_at_datetime, 'DD.MM.YYYY HH:mm:ss');
        if (a.active_id < b.active_id) {
          return -1;
        }
        if (b.active_id < a.active_id) {
          return 1;
        }
        if (aDate.isBefore(bDate)) {
          return -1;
        }
        if (bDate.isBefore(aDate)) {
          return 1;
        }
        return 0;
      });
      this.related.trades.loaded = true;
    }
    return this['tmp_trades'] ? this['tmp_trades'] : [];
  }
  set trades(x) {
    this['tmp_trades'] = x;
  }
  get payments() {
    if (!this.related.payments.loaded && this.attributes['payments'] && this.attributes['payments'].length) {
      this['tmp_payments'] = this.attributes['payments'].map(item => {
        return Payment.create(item);
      });
      this.related.payments.loaded = true;
    }
    return this['tmp_payments'] ? this['tmp_payments'] : [];
  }
  set payments(x) {
    this['tmp_payments'] = x;
  }
  get buy_trades() {
    if (!this.related.buy_trades.loaded && this.attributes['buy_trades'] && this.attributes['buy_trades'].length) {
      this['tmp_buy_trades'] = this.attributes['buy_trades'].map(item => {
        return new BuyTrade(item);
      });
      this.related.buy_trades.loaded = true;
    }
    return this['tmp_buy_trades'] ? this['tmp_buy_trades'] : [];
  }
  get sell_trades() {
    if (!this.related.sell_trades.loaded && this.attributes['sell_trades'] && this.attributes['sell_trades'].length) {
      this['tmp_sell_trades'] = this.attributes['sell_trades'].map(item => {
        return new SellTrade(item);
      });
      this.related.sell_trades.loaded = true;
    }
    return this['tmp_sell_trades'] ? this['tmp_sell_trades'] : [];
  }
  set sell_trades(x) {
    this['tmp_sell_trades'] = x;
  }
  get buySum() {
    //если сумма в миллионах, то копейки отбросим
    let round = 2;
    if (this.buy_valuation > 1000000) {
      round = 0;
    }
    return Money.format(this.buy_valuation, round);
  }
  get buyOriginalSum() {
    //если сумма в миллионах, то копейки отбросим
    let round = 2;
    if (this.buy_valuation > 1000000) {
      round = 0;
    }
    return Money.format(this.buy_valuation, round);
  }
  get valuation() {
    if (this.attributes.valuation) {
      return this.attributes?.valuation?.sum;
    }
    return 0;
  }
  get period() {
    return this?.attributes?.period;
  }
  get originDiff() {
    //если сумма в миллионах, то копейки отбросим
    let round = 2;
    if (this?.attributes?.diff > 1000000) {
      round = 0;
    }
    return Math.round(this?.attributes?.diff, round);
  }
  get diff() {
    //если сумма в миллионах, то копейки отбросим
    let round = 2;
    if (this?.attributes?.diff > 1000000) {
      round = 0;
    }
    return Math.round(this?.attributes?.diff, round);
  }
  get originValuation() {
    if (this.attributes.origin_valuation) {
      return this.attributes?.origin_valuation?.sum;
    }
    return 0;
  }
  set originValuation(x) {
    this['tmp_originValuation'] = x;
  }
  get originValuationWithCurrency() {
    //проверим что в аттрибутах уже есть поле valuation или origin_valuation
    if (this.attributes.origin_valuation) {
      return Money.format(this.attributes?.origin_valuation?.sum) + ' ' + this.attributes?.origin_valuation?.sign;
    }
    return '';
  }
  async getFactPercent() {}
  get factPercent() {}
  set factPercent(x) {
    this['tmp_factPercent'] = x;
  }
  async getAnnuallyPercent() {}
  get annuallyPercent() {}
  set annuallyPercent(x) {}
  set buy_trades(x) {
    this['tmp_buy_trades'] = x;
  }
  get item() {
    if (!this.related.item.loaded && this.attributes['item']) {
      this['tmp_item'] = new Catalog(this.attributes['item']);
      this.related.item.loaded = true;
    }
    return this['tmp_item'] ? this['tmp_item'] : new Catalog({});
  }
}
//# sourceMappingURL=GridActive.js.map