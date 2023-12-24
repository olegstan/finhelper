import moment from "moment/moment";
import ActiveValueCalculator from "./ActiveValueCalculator";
import ActiveConstants from "./../../constants/ActiveConstants";
import Active from "./../Active";
import CurrencyConstants from "./../../constants/CurrencyConstants";
export default class ActiveDiffer {
  static getDiffRubble(item, now) {
    if (item.sell_trades?.length) {
      let diff = ActiveValueCalculator.getOriginalSum(item.sell_trades) - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - ActiveValueCalculator.getCommissionOriginalSum(item.sell_trades) - ActiveValueCalculator.getCommissionOriginalSum(item.buy_trades) + ActiveValueCalculator.getDividendOriginalSum(item);
      let course = item.sell_trades[item.sell_trades?.length - 1].sum_rub_course;
      let calcDiff = course * diff;
      return calcDiff;
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length) {
      let sellDate = moment(item.sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
      if (!sellDate.isValid()) {
        console.warn('not valid date', sellDate);
      }
      if (!now.isValid()) {
        console.warn('not valid date', now);
      }
      if (sellDate.isBefore(now)) {
        //высчитываем сумму продажи по номиналу облигации
        let count = Active.getCountSum(item, item.buy_trades);
        let sellSum = item.original_buy_sum * count;
        let course = item.buy_sum_rub_course;
        let diff = sellSum - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - ActiveValueCalculator.getCommissionOriginalSum(item.buy_trades);
        let calcDiff = course * diff;
        return calcDiff;
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1) {
      let sellSum = 0;
      let diff = 0;
      let course = 0;
      switch (item.rate_type_id) {
        case ActiveConstants.SIMPLE:
          sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments) + item.original_buy_sum;
          course = item.payments.length ? item.payments[item.payments.length - 1].sum_rub_course : 0;
          diff = 0;
          break;
        case ActiveConstants.DIFFERENTIAL:
          sellSum = Active.getConfirmedPaymentsOriginalSum(item.payments);
          diff = 0;
          break;
      }
      let calcDiff = course * diff;
      return calcDiff;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1) {
      if (item.sell_at_date) {
        let sellSum = item.original_sell_sum;
        let buySum = item.original_buy_sum;
        let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        let course = item.buy_sum_rub_course;
        let diff = sellSum - buySum;
        let calcDiff = course * diff;
        return calcDiff;
      }
      if (item.sell) {
        let sell = item.sell.child_item;
        let sellSum = sell.original_sum;
        let buySum = item.original_buy_sum;
        let code = item.buy_currency_id ? CurrencyConstants.getCurrencyCodeById(item.buy_currency_id) : null;
        let sign = item.buy_currency_id ? CurrencyConstants.getCurrencySignById(item.buy_currency_id) : null;
        let course = item.buy_sum_rub_course;
        let diff = sellSum - buySum;
        let calcDiff = course * diff;
        return calcDiff;
      }
    }
    if (item.last_valuation && item.buy_trades?.length) {
      let count = Active.getCountSum(item, item.buy_trades);
      let lastTrade = item.buy_trades[item.buy_trades?.length - 1];
      let last_valuation = item.last_valuation;
      let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
      let last_valuationDate = moment(last_valuation.value_at_date, 'DD.MM.YYYY');
      let diff = 0;
      let course = 0;
      if (!lastTradeDate.isValid()) {
        console.warn('not valid date', lastTradeDate);
      }
      if (!last_valuationDate.isValid()) {
        console.warn('not valid date', last_valuationDate);
      }
      if (lastTradeDate.isBefore(last_valuationDate)) {
        let lotsize = item?.item ? item.item.lotsize : 1;
        diff = last_valuation.original_current_sum * count / lotsize - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - ActiveValueCalculator.getCommissionOriginalSum(item.buy_trades) + ActiveValueCalculator.getDividendOriginalSum(item);
        course = last_valuation.current_sum_rub_course;
      } else {
        diff = lastTrade.original_price * count - ActiveValueCalculator.getOriginalSum(item.buy_trades) + ActiveValueCalculator.getCouponSellSum(item) - ActiveValueCalculator.getCommissionOriginalSum(item.buy_trades) + ActiveValueCalculator.getDividendOriginalSum(item);
        course = lastTrade.price_rub_course;
      }
      let calcDiff = course * diff;
      return calcDiff;
    } else if (item.buy_trades?.length) {
      // if(item.buy_trades?.length === 1)
      // {
      //   return 0;
      // }

      let buySum = ActiveValueCalculator.getOriginalSum(item.buy_trades);
      let count = Active.getCountSum(item, item.buy_trades);
      let lastPrice = Active.getNotNullPrice(item.buy_trades, 'original_price');
      let sellSum = lastPrice * count;
      let diff = sellSum - buySum + ActiveValueCalculator.getCouponSellSum(item) - ActiveValueCalculator.getCommissionOriginalSum(item.buy_trades) + ActiveValueCalculator.getDividendOriginalSum(item);
      let course = item.buy_trades[item.buy_trades?.length - 1].sum_rub_course;
      let calcDiff = course * diff;
      return calcDiff;
    }
  }
  static getDiff(item, now, sign, code, original = false) {
    const {
      sell_trades,
      type_id,
      buy_trades,
      sell_at_datetime,
      rate_type_id,
      last_valuation,
      payments,
      sell
    } = item;
    let buy_sum = original ? item.original_buy_sum : item.buy_sum;
    let sell_sum = original ? item.original_sell_sum : item.sell_sum;
    let income = original ? item.original_income : item.income;
    const lotsize = item?.item ? item?.item.lotsize : 1;
    if (sell_trades?.length) {
      let diff = ActiveValueCalculator.getSum(sell_trades, original) - ActiveValueCalculator.getSum(buy_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(sell_trades, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    } else if (ActiveConstants.COUPON_GROUP.indexOf(type_id) !== -1 && buy_trades?.length) {
      let sellDate = moment(sell_at_datetime, 'DD.MM.YYYY HH:mm:ss');
      if (!sellDate.isValid()) {
        console.warn('not valid date', sellDate);
      }
      if (!now.isValid()) {
        console.warn('not valid date', now);
      }
      if (sellDate.isBefore(now)) {
        //высчитываем сумму продажи по номиналу облигации
        let count = Active.getCountSum(item, buy_trades);
        let sellSum = buy_sum * count;
        let diff = sellSum - ActiveValueCalculator.getSum(buy_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original);
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(type_id) !== -1) {
      let sellSum = 0;
      let diff = 0;
      switch (rate_type_id) {
        case ActiveConstants.SIMPLE:
          sellSum = Active.getConfirmedPaymentsSum(payments, original) + buy_sum;
          diff = 0;
          break;
        case ActiveConstants.DIFFERENTIAL:
          sellSum = Active.getConfirmedPaymentsSum(payments, original);
          diff = 0;
          break;
      }
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(type_id) !== -1) {
      if (sell_at_date) {
        let diff = sell_sum - buy_sum;
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
      if (sell) {
        let sell = sell.child_item;
        let sellSum = original ? sell.original_sum : sell.sum;
        let diff = sellSum - buy_sum;
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
      if (last_valuation) {
        let valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
        let diff = valuation - buy_sum;
        return {
          sum: diff,
          code: code,
          sign: sign
        };
      }
      return {
        sum: 0,
        code: code,
        sign: sign
      };
    }
    if (last_valuation && last_valuation.morph === 'active.user.valuation') {
      let count = Active.getCountSum(item, buy_trades);
      let valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
      let diff = valuation * count / lotsize - ActiveValueCalculator.getSum(buy_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    }
    if (last_valuation && buy_trades?.length) {
      let count = Active.getCountSum(item, buy_trades);
      let lastTrade = buy_trades[buy_trades?.length - 1];
      let lastTradeDate = moment(lastTrade.trade_at_date, 'DD.MM.YYYY');
      let last_valuationDate = moment(last_valuation.value_at_date, 'DD.MM.YYYY');
      if (!lastTradeDate.isValid()) {
        console.warn('not valid date', lastTradeDate);
      }
      if (!last_valuationDate.isValid()) {
        console.warn('not valid date', last_valuationDate);
      }
      let diff = 0;
      if (lastTradeDate.isBefore(last_valuationDate)) {
        let valuation = original ? last_valuation.original_current_sum : last_valuation.current_sum;
        diff = valuation * count / lotsize - ActiveValueCalculator.getSum(buy_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);
      } else {
        let valuation = original ? lastTrade.original_price : lastTrade.price;
        diff = valuation * count - ActiveValueCalculator.getSum(buy_trades, original) + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);
      }
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    } else if (buy_trades?.length) {
      // if(buy_trades?.length === 1)
      // {
      //   return 0;
      // }

      let buySum = ActiveValueCalculator.getSum(buy_trades, original);
      let count = Active.getCountSum(item, buy_trades);
      let lastPrice = Active.getNotNullPrice(buy_trades, original ? 'original_price' : 'price');
      let sellSum = lastPrice * count / lotsize;
      let diff = sellSum - buySum + ActiveValueCalculator.getCouponSellSum(item, original) - ActiveValueCalculator.getCommissionSum(buy_trades, original) + ActiveValueCalculator.getDividendSum(item, original);
      return {
        sum: diff,
        code: code,
        sign: sign
      };
    }
  }
  static getDiffCurrency(item, now) {
    let {
      code,
      sign
    } = Active.getCodeAndSign(item);
    return this.getDiff(item, now, sign, code, true);
  }
}