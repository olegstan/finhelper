import BaseModel from "./BaseModel";
import ActiveHelper from "../helpers/Active";
import InvestCalc from "../helpers/InvestCalc";
import BuyTrade from "./BuyTrade";
import SellTrade from "./SellTrade";
import Payment from "./Payment";
import moment from "moment/moment";
import ActiveValuer from "./../helpers/Active/ActiveValuer";
import Catalog from "./Catalog";
export default class Active extends BaseModel {
  /**
   *
   * @type {string}
   */
  controller = 'active';

  /**
   *
   * @type {{payments: BaseModel.load}}
   */
  related = {
    'payments': {
      func: Payment.create,
      loaded: false
    },
    'buy_trades': {
      func: BuyTrade.create,
      loaded: false
    },
    'sell_trades': {
      func: SellTrade.create,
      loaded: false
    },
    'item': {
      func: Catalog.create,
      loaded: false
    },
    'trades': {
      loaded: false
    }
  };
  currencyFields = ['buy_currency', 'income_currency', 'sell_currency'];

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
  get valuation() {
    if (this['tmp_valuation'] === null || typeof this['tmp_valuation'] === 'undefined') {
      let obj = ActiveValuer.getValuation(this.attributes, moment());
      if (obj) {
        this['tmp_valuation'] = obj.sum;
      } else {
        this['tmp_valuation'] = 0;
      }
    }
    return this['tmp_valuation'];
  }
  set valuation(x) {
    this['tmp_valuation'] = x;
  }
  get originValuation() {
    if (this['tmp_originValuation'] === null || typeof this['tmp_originValuation'] === 'undefined') {
      let obj = ActiveValuer.getOriginalValuation(this.attributes, moment());
      if (obj) {
        this['tmp_originValuation'] = obj.sum;
      } else {
        this['tmp_originValuation'] = 0;
      }
    }
    return this['tmp_originValuation'];
  }
  set originValuation(x) {
    this['tmp_originValuation'] = x;
  }
  async getFactPercent() {
    if ((this['tmp_factPercent'] === null || typeof this['tmp_factPercent'] === 'undefined') && (this['tmp_annuallyPercent'] === null || typeof this['tmp_annuallyPercent'] === 'undefined')) {
      this['tmp_factPercent'] = await InvestCalc.getFactPercentByItem(this);
      this['tmp_annuallyPercent'] = await InvestCalc.getAnnuallyPercentByItem(this);
    }
    return this['tmp_factPercent'];
  }
  get factPercent() {
    return this['tmp_factPercent'];
  }
  set factPercent(x) {
    this['tmp_factPercent'] = x;
  }
  async getAnnuallyPercent() {
    if ((this['tmp_factPercent'] === null || typeof this['tmp_factPercent'] === 'undefined') && (this['tmp_annuallyPercent'] === null || typeof this['tmp_annuallyPercent'] === 'undefined')) {
      this['tmp_factPercent'] = await InvestCalc.getFactPercentByItem(this);
      this['tmp_annuallyPercent'] = await InvestCalc.getAnnuallyPercentByItem(this);
    }
    return this['tmp_annuallyPercent'];
  }
  get annuallyPercent() {
    return this['tmp_annuallyPercent'];
  }
  set annuallyPercent(x) {
    this['tmp_annuallyPercent'] = x;
  }
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