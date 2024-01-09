import React from 'react';
import Money from "./Money";
import moment from 'moment/moment';
import ActiveConstants from "../constants/ActiveConstants";
import AccountConstants from "../constants/AccountConstants";
import Active from "./Active";
import exactMath from "exact-math";
import CurrencyConstants from "../constants/CurrencyConstants";
import BuyTrade from "../models/BuyTrade";
import SellTrade from "../models/SellTrade";
import ActiveValueCalculator from "./Active/ActiveValueCalculator";

class InvestCalc
{
  static getRoundPrice(item, field)
  {
    let number = 2;

    let smallestNumberPrice = null;
    if (item.buy_trades?.length)
    {
      item.buy_trades.map((trade) =>
      {
        if (smallestNumberPrice > trade[field] || smallestNumberPrice === null)
        {
          smallestNumberPrice = trade[field]
        }
      })
      item.sell_trades.map((trade) =>
      {
        if (smallestNumberPrice > trade[field] || smallestNumberPrice === null)
        {
          smallestNumberPrice = trade[field]
        }
      })

      if (smallestNumberPrice)
      {
        let parts = String(smallestNumberPrice).split('.')

        if (parts.length > 1 && parseInt(parts[0]) === 0)
        {
          return parts[1].length;
        }
      }
    }

    if (item.type_id === ActiveConstants.CRYPTO)
    {
      number = 8;
    }
    if (item.item && item.item.type === 'CRYPTOCURRENCY')
    {
      number = 8;
    }
    return number;
  }

  static getRound(item)
  {
    let number = 2;

    if (item.type_id === ActiveConstants.CRYPTO)
    {
      number = 8;
    }
    if (item.item && item.item.type === 'CRYPTOCURRENCY')
    {
      number = 8;
    }
    return number;
  }

  static getCount(item, now, self)
  {
    if (item.buy_trades?.length)
    {
      return Money.format(Active.getCountSum(item, item.buy_trades), InvestCalc.getRound(item));
    }
  }

  static getBuyPrice(item, now, self)
  {
    if (item.buy_trades?.length)
    {
      return Money.format(ActiveValueCalculator.getAvgPrice(item, item.buy_trades), InvestCalc.getRoundPrice(item, 'price')) + ' ' + self.props.currency.sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      return '';
    }
  }

  static getBuyOriginalPrice(item, now, self)
  {
    if (item.buy_trades?.length)
    {
      return Money.format(ActiveValueCalculator.getAvgOriginalPrice(item, item.buy_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + CurrencyConstants.getCurrencySignByActive(item);
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      return '';
    }
  }

  static getBuySum(item, now, self)
  {
    if (item.buy_trades?.length)
    {
      return Money.format(ActiveValueCalculator.getSum(item.buy_trades), InvestCalc.getRoundPrice(item, 'price')) + ' ' + self.props.currency.sign;
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1)
    {
      let sum = item.buy_sum;
      return Money.format(sum) + ' ' + self.props.currency.sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      return Money.format(item.buy_sum) + ' ' + self.props.currency.sign;
    }
  }

  static getBuyOriginalSum(item, now, self)
  {
    if (item.buy_trades?.length)
    {
      return Money.format(ActiveValueCalculator.getOriginalSum(item.buy_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + CurrencyConstants.getCurrencySignByActive(item);
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1)
    {
      let sign = CurrencyConstants.getCurrencySignById(item.buy_currency_id)

      return Money.format(item.original_buy_sum) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      let {code, sign} = Active.getCodeAndSign(item);

      return Money.format(item.original_buy_sum) + ' ' + sign;
    }
  }

  static getBuyDate(item, now, self)
  {
    if (item.buy_trades?.length)
    {
      return item.avg_own_date;
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1)
    {
      return item.buy_at_date;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      return item.buy_at_date;
    }
  }

  static getSellPrice(item, now, self)
  {
    if (item.sell_trades?.length)
    {
      return Money.format(ActiveValueCalculator.getAvgPrice(item, item.sell_trades));
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length)
    {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now))
      {
        return Money.format(item.buy_sum);
      }
    }
  }

  static getSellOriginalPrice(item, now, self)
  {
    if (item.sell_trades?.length)
    {
      let sign = this.getSign(item);

      return Money.format(ActiveValueCalculator.getAvgOriginalPrice(item, item.sell_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      return '';
    }
  }

  static getSellSum(item, now, self)
  {
    if (item.sell_trades?.length)
    {
      return Money.format(ActiveValueCalculator.getSum(item.sell_trades), InvestCalc.getRoundPrice(item, 'price')) + ' ' + self.props.currency.sign;
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length)
    {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now))
      {
        let count = Active.getCountSum(item, item.buy_trades);
        return Money.format(item.buy_sum * count) + ' ' + self.props.currency.sign;
      }
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1)
    {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');

      if (sellDate.isBefore(now))
      {
        return Money.format(Active.getPaymentsSum(item.payments)) + ' ' + self.props.currency.sign;
      }
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      if (item.sell)
      {
        let sell = item.sell.child_item;

        return Money.format(sell.sum) + ' ' + self.props.currency.sign;
      }

      return Money.format(item.sell_sum) + ' ' + self.props.currency.sign;
    }
  }

  static getSellOriginalSum(item)
  {
    if (item.sell_trades?.length)
    {
      let sign = this.getSign(item);

      return Money.format(ActiveValueCalculator.getOriginalSum(item.sell_trades), InvestCalc.getRoundPrice(item, 'original_price')) + ' ' + sign;
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1)
    {
      let sign = CurrencyConstants.getCurrencySignById(item.sell_currency_id);

      return Money.format(item.original_sell_sum) + ' ' + sign;
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      let sign = CurrencyConstants.getCurrencySignById(item.sell_currency_id);

      return Money.format(item.original_sell_sum) + ' ' + sign;
    }
  }

  static getSign(item)
  {
    let sign = '';

    if (item.type_id === ActiveConstants.CURRENCY)
    {
      let account = AccountConstants.getSubAccountById(item.sell_trades[0].to_account_id);

      if (account)
      {
        sign = CurrencyConstants.getCurrencySignById(account.currency_id);
      }
    } else
    {
      let account = AccountConstants.getSubAccountById(item.sell_trades[0].from_account_id);

      if (account)
      {
        sign = CurrencyConstants.getCurrencySignById(account.currency_id);
      }
    }
    return sign;
  }

  static getSellDate(item, now, self)
  {
    if (item.sell_trades?.length)
    {
      let date = item.sell_trades[item.sell_trades?.length - 1].trade_at_date;

      return date;
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length)
    {

      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now))
      {
        return item.sell_at_date;
      }

    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1)
    {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');
      if (sellDate.isBefore(now))
      {
        return item.sell_at_date;
      }
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      if (item.sell)
      {
        let sell = item.sell.child_item;

        return sell.paid_at_date;
      }

      return item.sell_at_date;
    }
  }

  static getPeriod(item, now, self)
  {
    if (item.sell_trades?.length)
    {
      let date = item.sell_trades[item.sell_trades?.length - 1].trade_at_date;

      let nowDate = moment(date, 'DD.MM.YYYY');
      let buyDate = moment(item.avg_own_date, 'DD.MM.YYYY');

      return (Math.round((nowDate.diff(buyDate, 'months', true)) * 10) / 10) + ' мес.';
    } else if (ActiveConstants.COUPON_GROUP.indexOf(item.type_id) !== -1 && item.buy_trades?.length)
    {

      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');

      let nowDate = sellDate.isBefore(now) ? sellDate : now;
      let buyDate = moment(item.avg_own_date, 'DD.MM.YYYY');

      return (Math.round((nowDate.diff(buyDate, 'months', true)) * 10) / 10) + ' мес.';
    } else if (ActiveConstants.DEBT_GROUP.indexOf(item.type_id) !== -1)
    {
      let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');

      let nowDate = sellDate.isBefore(now) ? sellDate : now;
      let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');

      return (Math.round((nowDate.diff(buyDate, 'months', true)) * 10) / 10) + ' мес.';
    } else if (ActiveConstants.PROPERTY_GROUP.indexOf(item.type_id) !== -1 || [ActiveConstants.CUSTOM_PROPERTY].indexOf(item.type_id) !== -1)
    {
      if (item.sell_at_date)
      {
        let sellDate = moment(item.sell_at_date, 'DD.MM.YYYY');

        let nowDate = sellDate.isBefore(now) ? sellDate : now;
        let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');

        return (Math.round((nowDate.diff(buyDate, 'months', true)) * 10) / 10) + ' мес.';
      } else if (item.sell)
      {
        let sell = item.sell.child_item;

        let sellDate = moment(sell.paid_at_date, 'DD.MM.YYYY');

        let nowDate = sellDate.isBefore(now) ? sellDate : now;
        let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');

        return (Math.round((nowDate.diff(buyDate, 'months', true)) * 10) / 10) + ' мес.';
      } else
      {
        let nowDate = now;
        let buyDate = moment(item.buy_at_date, 'DD.MM.YYYY');

        return (Math.round((nowDate.diff(buyDate, 'months', true)) * 10) / 10) + ' мес.';
      }
    }

    if (item.buy_trades?.length && item.buy_trades?.length)
    {
      let nowDate = moment().startOf('day');
      let buyDate = moment(item.avg_own_date, 'DD.MM.YYYY');

      return (Math.round((nowDate.diff(buyDate, 'months', true)) * 10) / 10) + ' мес.';
    }
  }

  static getAnnuallyPercentByActives(actives, now, self)
  {
    let firstBuyDate = InvestCalc.getFirstBuyDate(actives);

    if (firstBuyDate)
    {
      let hasSell = false;
      let profit = InvestCalc.getAnnuallyPercentByActives(actives, now, self, hasSell);

      let diffInDays = Math.abs(firstBuyDate.diff(moment().startOf('day'), 'days'));
      profit -= 1;

      let annulyProfit = (Math.pow(profit + 1, (360 / (diffInDays ? diffInDays : 1)) - 1));

      return annulyProfit;
    }

    return 0;
  }

  static getAnnuallyPercentWithFactPercentByActives(actives, profit)
  {
    let firstBuyDate = InvestCalc.getFirstBuyDate(actives);

    if (firstBuyDate)
    {
      let diffInDays = Math.abs(firstBuyDate.diff(moment().startOf('day'), 'days'));
      profit -= 1;

      let annulyProfit = (Math.pow(profit + 1, (360 / diffInDays)) - 1);

      return annulyProfit;
    }

    return 0;
  }

  /**
   *
   * @param ActiveModel[] actives
   * @return {number}
   */
  static getFactPercentByActives(actives)
  {
    let activesWithoutCurrency = actives.filter((active) =>
    {
      return active.type_id !== ActiveConstants.CURRENCY;
    });

    let activesOnlyCurrency = actives.filter((active) =>
    {
      return active.type_id === ActiveConstants.CURRENCY;
    });

    let currencyIndex = [];
    let lastValuations = [];

    //рассчет только для валют
    activesOnlyCurrency.map((active) =>
    {
      if (currencyIndex.indexOf(active.item.symbol) === -1)
      {
        currencyIndex.push(active.item.symbol);
      }

      let currencyKey = currencyIndex.indexOf(active.item.symbol);

      if (typeof lastValuations[currencyKey] === 'undefined')
      {
        lastValuations[currencyKey] = {};
      }

      lastValuations[currencyKey].olderDate = null;
      lastValuations[currencyKey].olderPrice = null;

      active.buy_trades.map((trade) =>
      {
        if (trade.price > 0)
        {
          let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');

          if (lastValuations[currencyKey].olderDate === null)
          {
            lastValuations[currencyKey].olderDate = tradeDate;
            lastValuations[currencyKey].olderPrice = trade.price;
          }

          if (tradeDate.isAfter(lastValuations[currencyKey].olderDate))
          {
            lastValuations[currencyKey].olderDate = tradeDate;
            lastValuations[currencyKey].olderPrice = trade.price;
          }
        }
      });

      active.attributes.valuations?.map((value) =>
      {
        let valueDate;
        if (value.morph === 'active.user.valuation')
        {
          valueDate = moment();
        } else
        {
          valueDate = moment(value.value_at_date, 'DD.MM.YYYY');
        }


        if (lastValuations[currencyKey].olderDate === null)
        {
          lastValuations[currencyKey].olderDate = valueDate;
          lastValuations[currencyKey].olderPrice = value.current_sum;
        }

        if (valueDate.isSameOrAfter(lastValuations[currencyKey].olderDate))
        {
          lastValuations[currencyKey].olderDate = valueDate;
          lastValuations[currencyKey].olderPrice = value.current_sum;
        }
      });

      active.attributes.sell_trades.map((trade) =>
      {
        let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');

        if (lastValuations[currencyKey].olderDate === null)
        {
          lastValuations[currencyKey].olderDate = tradeDate;
          lastValuations[currencyKey].olderPrice = trade.price;
        }

        if (tradeDate.isSameOrAfter(lastValuations[currencyKey].olderDate))
        {
          lastValuations[currencyKey].olderDate = tradeDate;
          lastValuations[currencyKey].olderPrice = trade.price;
        }
      });
    });

    let index = [];
    let sums = [];
    let values = [];
    let grids = [];
    let sold = [];
    let gridIndex = [];
    let firstBuyDate = InvestCalc.getFirstBuyDate(activesWithoutCurrency);
    let nowDate = moment().startOf('day');

    if (firstBuyDate)
    {
      let cloneFirstBuyDate = firstBuyDate.clone();
      while (firstBuyDate && firstBuyDate.isSameOrBefore(nowDate))
      {
        let formatedDate = firstBuyDate.format('DD.MM.YYYY')
        if (index.indexOf(formatedDate) === -1)
        {
          index.push(formatedDate);
        }

        let dateIndex = index.indexOf(formatedDate);

        if (typeof sums[dateIndex] === 'undefined')
        {
          sums[dateIndex] = [];
        }

        if (typeof sold[dateIndex] === 'undefined')
        {
          sold[dateIndex] = [];
        }

        if (typeof values[dateIndex] === 'undefined')
        {
          values[dateIndex] = [];
        }


        activesWithoutCurrency.map((active) =>
        {
          let count = 0;
          let course = 0;
          let tradePrice = 0;
          let sell = false;
          let tradeOriginalPrice = 0;
          let lastTradeDate = null;
          let valuePrice = 0;
          let valueOriginalPrice = 0;
          let lastValueDate = null;
          let paymentSum = 0;
          let lastValueValuation = {
            valuation: 0,
            count: 0,
            price: 0,
            original_price: 0,
            course: 0,
          };

          if (typeof values[dateIndex][active.id] === 'undefined')
          {
            values[dateIndex][active.id] = {};
          }

          if (typeof sums[dateIndex][active.id] === 'undefined')
          {
            sums[dateIndex][active.id] = 0;
          }

          if (typeof sold[dateIndex][active.id] === 'undefined')
          {
            sold[dateIndex][active.id] = 0;
          }

          if (gridIndex.indexOf(active.id) === -1)
          {
            gridIndex.push(active.id);
          }

          let gridKey = gridIndex.indexOf(active.id);

          if (typeof grids[gridKey] === 'undefined')
          {
            grids[gridKey] = InvestCalc.getGrid(active, moment().startOf('day'))
          }

          if (ActiveConstants.isPackage(active.type_id))
          {
            active.attributes.buy_trades.map((trade) =>
            {
              //для рассчёта оценки сделаем копию с ценой с учетом комиссии
              let copyTrade = new BuyTrade({...trade});

              copyTrade.price = trade.price + (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);
              copyTrade.original_price = trade.original_price + (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);

              let tradeDate = moment(copyTrade.trade_at_date, 'DD.MM.YYYY');

              if (lastTradeDate === null)
              {
                lastTradeDate = tradeDate;
              }

              if (tradeDate.isSameOrBefore(firstBuyDate))
              {
                count += copyTrade.count;
                tradePrice = copyTrade.price;
                tradeOriginalPrice = copyTrade.original_price;
                course = copyTrade.price_course;
              }
            });

            active.attributes.valuations?.map((valuation) =>
            {
              let valueDate;
              if (valuation.morph === 'active.user.valuation')
              {
                valueDate = moment();
              } else
              {
                valueDate = moment(valuation.value_at_date, 'DD.MM.YYYY');
              }

              lastValueDate = valueDate;

              if (valueDate.isSameOrBefore(firstBuyDate))
              {
                valuePrice = valuation.current_sum;
                valueOriginalPrice = valuation.original_current_sum;
                course = valuation.current_sum_course;
              }
            });

            //TODO
            // active.dividends.map((dividend) => {
            //   let paidDate = moment(dividend.paid_at_date, 'DD.MM.YYYY');
            //
            //   if(paidDate.isSame(firstBuyDate))
            //   {
            //     sums[dateIndex][active.id] += dividend.sum * count;
            //   }
            // });

            active.attributes.sell_trades.map((trade) =>
            {
              let copyTrade = new SellTrade({...trade});
              copyTrade.price = trade.price - (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);
              copyTrade.original_price = trade.original_price - (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);

              let tradeDate = moment(copyTrade.trade_at_date, 'DD.MM.YYYY');

              lastTradeDate = tradeDate;

              if (tradeDate.isSameOrBefore(firstBuyDate))
              {
                tradePrice = copyTrade.price;
                tradeOriginalPrice = copyTrade.original_price;
                course = copyTrade.price_course;
                sell = true;
              }
            });

            //если нет продаж и оценок, то сравниваем цену покупки с ценой покупки увеличенной на комиссию
            if (active.attributes.valuations?.length === 0 && active.attributes.sell_trades.length === 0 && active.attributes.buy_trades.length > 0)
            {
              let lastTrade = active.attributes.buy_trades[active.attributes.buy_trades.length - 1];

              if (nowDate.isSameOrBefore(firstBuyDate))
              {
                lastTradeDate = nowDate;

                tradePrice = lastTrade.price;
                tradeOriginalPrice = lastTrade.original_price;
                course = lastTrade.price_course;
              }
            }

            //если оценка была позже чем последняя сделка, то берем цену из оценки
            if (sell)
            {

              //проверяем чтобы актив не участвовал в оценке всего портфеля после продажи
              if (typeof sold[dateIndex][active.id] === 'undefined')
              {
                sold[dateIndex][active.id] = true;
                sums[dateIndex][active.id] = tradePrice * count;
              } else
              {
                sums[dateIndex][active.id] = 0;
              }
            } else if (lastValueDate !== null && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0)
            {
              //оценка
              let valuation = count * valuePrice;

              sums[dateIndex][active.id] = valuation;
            } else if (lastTradeDate !== null && tradePrice > 0)
            {
              //покупка
              let valuation = count * tradePrice;

              sums[dateIndex][active.id] = valuation;
            } else
            {

            }
          } else
          {
            //рассчет для единичных активов
            let buyTrade = {};
            buyTrade.price = active.buy_sum;
            buyTrade.original_price = active.original_buy_sum;
            buyTrade.price_course = active.buy_sum_course;

            let buyTradeDate = moment(active.buy_at_date, 'DD.MM.YYYY');

            if (lastTradeDate === null)
            {
              lastTradeDate = buyTradeDate;
            }

            if (buyTradeDate.isSameOrBefore(firstBuyDate))
            {
              count += 1;
              tradePrice = buyTrade.price;
              tradeOriginalPrice = buyTrade.original_price;
              course = buyTradeDate.price_course;
            }

            active.attributes.valuations?.map((valuation) =>
            {

              let valueDate;
              if (valuation.morph === 'active.user.valuation')
              {
                valueDate = moment();
              } else
              {
                valueDate = moment(valuation.value_at_date, 'DD.MM.YYYY');
              }

              lastValueDate = valueDate;

              if (valueDate.isSameOrBefore(firstBuyDate))
              {
                valuePrice = valuation.current_sum;
                valueOriginalPrice = valuation.original_current_sum;
                course = valuation.current_sum_course;
              }
            });

            active.attributes?.payments?.map((payment) =>
            {
              let paidDate = moment(payment.paid_at_date, 'DD.MM.YYYY');

              if (paidDate.isSameOrBefore(firstBuyDate))
              {
                paymentSum += payment.sum;
              }
            });

            if (active.sell_at)
            {
              let sellTrade = {};
              sellTrade.price = active.sell_sum;
              sellTrade.original_price = active.original_sell_sum;

              let tradeSellDate = moment(active.sell_at_date, 'DD.MM.YYYY');

              lastTradeDate = tradeSellDate;

              if (tradeSellDate.isSameOrBefore(firstBuyDate))
              {
                tradePrice = sellTrade.price;
                tradeOriginalPrice = sellTrade.original_price;
                course = sellTrade.price_course;
                sell = true;
              }
            } else if (active.attributes.sell)
            {
              let sell = active.attributes.sell.child_item;

              let sellTrade = {};
              sellTrade.price = sell.sum;
              sellTrade.original_price = sell.original_sum;

              let tradeSellDate = moment(sell.paid_at_date, 'DD.MM.YYYY');

              lastTradeDate = tradeSellDate;

              if (tradeSellDate.isSameOrBefore(firstBuyDate))
              {
                tradePrice = sellTrade.price;
                tradeOriginalPrice = sellTrade.original_price;
                course = sellTrade.price_course;
                sell = true;
              }
            }

            //если оценка была позже чем последняя сделка, то берем цену из оценки
            if (sell)
            {

              //проверяем чтобы актив не участвовал в оценке всего портфеля после продажи
              if (typeof sold[active.id] === 'undefined')
              {
                sold[dateIndex][active.id] = true;

                if (active.sell_at)
                {
                  sums[dateIndex][active.id] = active.sell_sum;
                } else if (active.sell)
                {
                  let sell = active.sell.child_item;

                  sums[dateIndex][active.id] = sell.sum;
                }


              } else
              {
                sums[dateIndex][active.id] = 0;
              }
            } else if (lastValueDate !== null && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0)
            {
              //оценка
              let valuation = (count * valuePrice) + paymentSum;

              sums[dateIndex][active.id] = valuation;

            } else if (lastTradeDate !== null && tradePrice > 0)
            {
              //покупка
              let valuation = (count * tradePrice) + paymentSum;

              sums[dateIndex][active.id] = valuation;
            } else
            {

            }
          }
        });

        firstBuyDate.add(1, 'days')

        // if(firstBuyDate.isSame(nowDate))
        // {
        //   activesWithoutCurrency.map((active) => {
        //     if(active.buy_trades.length && active.sell_trades.length === 0)
        //     {
        //       //если не рубль, то ищем последнюю переоценку
        //       if(active.buy_trades[0].currency_id !== 1)
        //       {
        //         let currencyKey = currencyIndex.indexOf(active.buy_trades[0].currency.code);
        //
        //         if(typeof lastValuations[currencyKey] !== 'undefined')
        //         {
        //           //отнимем оценку без валюты
        //           sums[dateIndex] -= values[dateIndex][active.id]['valuation'];
        //
        //           values[dateIndex][active.id]['valuation'] = values[dateIndex][active.id]['original_price'] * values[dateIndex][active.id]['count'] * lastValuations[currencyKey].olderPrice;
        //
        //           sums[dateIndex] += values[dateIndex][active.id]['valuation']
        //
        //           let gridKey = gridIndex.indexOf(active.id);
        //
        //           if(typeof grids[gridKey] !== 'undefined')
        //           {
        //             //добавляем переоценку в сетку оценок
        //             grids[gridKey].push({
        //               item: {
        //                 current_sum: values[dateIndex][active.id]['original_price'] * lastValuations[currencyKey].olderPrice,
        //                 count: values[dateIndex][active.id]['count'],
        //                 value_at_date: firstBuyDate.format('DD.MM.YYYY')
        //               },
        //               type: 'valuation'
        //             })
        //           }
        //         }
        //       }
        //     }
        //   });
        // }
      }

      let profit = 1;

      while (cloneFirstBuyDate && cloneFirstBuyDate.isSameOrBefore(nowDate))
      {
        let formatedDate = cloneFirstBuyDate.format('DD.MM.YYYY');
        let dateIndex = index.indexOf(formatedDate);
        let dateProfit = 0;

        activesWithoutCurrency.map((active) =>
        {
          let gridKey = gridIndex.indexOf(active.id);

          let sum = 0;

          for (const index in sums[dateIndex])
          {
            sum += sums[dateIndex][index];//сумма на дату с учетом выплат и оценки
          }

          let activeProfitByDate = InvestCalc.getFactMultiplierByDate(grids[gridKey], cloneFirstBuyDate);

          if (activeProfitByDate !== 1)
          {
            try
            {
              //когда продали актив
              dateProfit = exactMath.add(dateProfit, (activeProfitByDate * (sums[dateIndex][active.id] / sum)));
            } catch (e)
            {
              console.warn(e.message)
            }
          } else
          {
            try
            {
              dateProfit = exactMath.add(dateProfit, (sums[dateIndex][active.id] / sum));
            } catch (e)
            {
              console.warn(e.message)
            }
          }
        });

        if (dateProfit !== 0)
        {
          profit = exactMath.mul(profit, dateProfit);
        }

        cloneFirstBuyDate.add(1, 'days')
      }

      return profit;
    }

    return 0;
  }


  /**
   *
   * @param sortedGrid
   * @param date
   * @returns {number}
   */
  static getFactMultiplierByDate(sortedGrid, date)
  {
    let prevValuation = null;
    let prevPrice = null;
    let prevCount = null;
    let paymentSum = 0;
    let prevPaymentSum = 0;
    let hasSell = false;

    let multiplier = 1;

    sortedGrid.map((valuation, key) =>
    {
      if (key === 0)
      {
        //пропускаем первый шаг, там доходности не будет
        prevValuation = valuation;
        prevPrice = valuation.type === 'buy_trade' ? valuation.item.price : 0;
        prevCount = valuation.type === 'buy_trade' ? valuation.item.count : 0;

        return;
      }

      let count = InvestCalc.getCountByType(valuation);
      let price = InvestCalc.getPriceByType(valuation);
      let currentDate = InvestCalc.getDateByType(valuation);

      //получаем доходность на конкретную дату
      if (currentDate && currentDate.isSame(date))
      {
        let profitStartDay = (prevPrice * prevCount) + (prevPrice * (count ? count : prevCount)) + prevPaymentSum;
        let profitEndDay = (price * prevCount) + (price * (count ? count : prevCount));
        multiplier *= (1 + ((profitEndDay / profitStartDay) - 1));
      }

      if (valuation.type === 'buy_trade')
      {
        prevPrice = valuation.item.price;
        prevCount = valuation.item.count;
      } else if (valuation.type === 'valuation')
      {
        prevPrice = valuation.item.current_sum;
      } else if (valuation.type === 'sell_trade')
      {
        prevPrice = valuation.item.price;
        hasSell = true;
      }

      prevValuation = valuation;
    });

    return multiplier;
  }

  static getFactPercentByItem(item)
  {
    return InvestCalc.getFactPercentByActives([item])
  }


  /**
   *
   * @param item
   * @returns {*|moment.Moment}
   */
  static getDateByType(item)
  {
    switch (item.type)
    {
      case 'buy_trade':
      case 'sell_trade':
        return moment(item.item.trade_at_date, 'DD.MM.YYYY');
      case 'valuation':
        if (item.morph === 'active.user.valuation')
        {
          return moment();
        }

        return moment(item.item.value_at_date, 'DD.MM.YYYY');
      case 'payment':
        return moment(item.item.paid_at_date, 'DD.MM.YYYY');
    }
  }

  /**
   *
   * @param item
   * @param type
   * @returns {*}
   */
  static getPriceByType(item, type)
  {
    switch (item.type)
    {
      case 'buy_trade':
      case 'sell_trade':
        return item.item.price;
      case 'valuation':
        return item.item.current_sum;
    }
  }

  /**
   *
   * @param item
   * @returns {boolean}
   */
  static getCountByType(item)
  {
    switch (item.type)
    {
      case 'buy_trade':
      case 'sell_trade':
        return item.item.count;
      case 'valuation':
        return false;
    }
  }

  static getGrid(active, now)
  {
    let grid = [];

    if (ActiveConstants.isPackage(active.type_id))
    {
      if (active.attributes?.valuations?.length)
      {
        active.attributes.valuations?.map((valuation) =>
        {
          grid.push({
            item: valuation,
            type: 'valuation'
          })
        })
      }

      if (active.attributes.buy_trades.length)
      {
        active.attributes.buy_trades.map((trade) =>
        {
          //для рассчёта оценки сделаем копию с ценой с учетом комиссии
          let copyTrade = new BuyTrade({...trade});

          copyTrade.price = trade.price + (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);
          copyTrade.original_price = trade.original_price + (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);

          grid.push({
            item: copyTrade,
            type: 'buy_trade'
          })
        })
      }

      if (active.attributes.sell_trades.length)
      {
        active.attributes.sell_trades.map((trade) =>
        {
          //для рассчёта оценки сделаем копию с ценой с учетом комиссии
          let copyTrade = new SellTrade({...trade});
          copyTrade.price = trade.price - (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);
          copyTrade.original_price = trade.original_price - (ActiveValueCalculator.getCommissionSum([trade]) / trade.count);

          grid.push({
            item: copyTrade,
            type: 'sell_trade'
          })
        })
      }

      if (active.attributes?.valuations?.length === 0 && active.attributes.sell_trades?.length === 0 && active.attributes.buy_trades.length > 0)
      {
        let lastTrade = active.attributes.buy_trades[active.attributes.buy_trades.length - 1];
        grid.push({
          item: {
            price: lastTrade.price,
            original_price: lastTrade.original_price,
            trade_at_date: lastTrade.value_at_date
          },
          type: 'sell_trade'
        })
      }
    } else
    {
      if (active.attributes.valuations.length)
      {
        active.attributes.valuations?.map((valuation) =>
        {
          grid.push({
            item: valuation,
            type: 'valuation'
          })
        })
      }

      // if(active.payments.length)
      // {
      //   active.payments.map((payment) => {
      //     grid.push({
      //       item: payment,
      //       type: 'payment'
      //     })
      //   })
      // }

      //для рассчёта оценки сделаем копию с ценой с учетом комиссии
      let buyTrade = {};
      buyTrade.price = active.buy_sum;
      buyTrade.original_price = active.original_buy_sum;
      buyTrade.trade_at_date = active.buy_at_date;
      buyTrade.count = 1;

      grid.push({
        item: buyTrade,
        type: 'buy_trade',
      })


      if (active.sell_at)
      {
        //для рассчёта оценки сделаем копию с ценой с учетом комиссии
        let sellTrade = {};
        sellTrade.price = active.sell_sum;
        sellTrade.original_price = active.original_sell_sum;
        sellTrade.trade_at_date = active.sell_at_date;
        sellTrade.count = 1;

        grid.push({
          item: sellTrade,
          type: 'sell_trade',
        })
      } else if (active.sell)
      {
        let sell = active.sell.child_item;

        let sellTrade = {};
        sellTrade.price = sell.sum;
        sellTrade.original_price = sell.original_sum;
        sellTrade.trade_at_date = sell.paid_at_date;
        sellTrade.count = 1;

        grid.push({
          item: sellTrade,
          type: 'sell_trade',
        })
      }
    }

    let sortedGrid = grid?.sort(function (a, b)
    {
      let firstDate = InvestCalc.getDateByType(a);
      let secondDate = InvestCalc.getDateByType(b);

      if (firstDate.isSame(secondDate))
      {
        //продажу отодвигаем в конец
        if (a.type === 'sell_trade')
        {
          return 1;
        }
        if (b.type === 'sell_trade')
        {
          return -1;
        }
        if (a.type === 'valuation' || a.type === 'payment')
        {
          return 1;
        }
        if (b.type === 'valuation' || b.type === 'payment')
        {
          return -1;
        }

        return 0;
      }

      return firstDate - secondDate;
    });

    return sortedGrid;
  }

  /**
   *
   * @param actives
   * @return {number}
   */
  static getValuation(actives)
  {
    let sum = 0;

    actives.map((active) =>
    {
      let value = active.valuation;

      if (value > 0)
      {
        sum += value;
      }
    });

    return sum;
  }

  /**
   *
   * @param actives
   * @return {number}
   */
  static getInsuranceValuation(actives)
  {
    let sum = 0;

    actives.map((active) =>
    {
      let value = Money.toDigits(active.buy_sum);

      if (value > 0)
      {
        sum += value;
      }
    });

    return sum;
  }

  /**
   *
   * @param item
   * @returns {number}
   */
  static getAnnuallyPercentByItem(item)
  {
    let profit = item.factPercent;

    let firstBuyDate = InvestCalc.getFirstBuyDate([item]);

    if (firstBuyDate)
    {
      let diffInDays = Math.abs(firstBuyDate.diff(moment().startOf('day'), 'days'));
      profit -= 1;

      let annulyProfit = (Math.pow(profit + 1, (360 / diffInDays)) - 1);

      return annulyProfit;
    }

    return 0;
  }

  static getFirstBuyDays(actives)
  {
    let nowDate = moment().startOf('day');
    let firstBuyDate = null;

    actives.map((active) =>
    {
      active.buy_trades.map((trade) =>
      {
        if (firstBuyDate === null)
        {
          firstBuyDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
        }

        let nextDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
        if (firstBuyDate.isAfter(nextDate))
        {
          firstBuyDate = nextDate;
        }
      })
    });

    let diff = Math.abs(nowDate.diff(firstBuyDate, 'days'))

    return diff > 0 ? diff : 0;
  }

  /**
   *
   * @param actives
   * @returns {*}
   */
  static getFirstBuyDate(actives)
  {
    let firstBuyDate = null;

    actives.map((active) =>
    {
      if (ActiveConstants.isPackage(active.type_id))
      {
        active.buy_trades.map((trade) =>
        {
          if (firstBuyDate === null)
          {
            firstBuyDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
          }

          let nextDate = moment(trade.trade_at_date, 'DD.MM.YYYY');
          if (firstBuyDate.isAfter(nextDate))
          {
            firstBuyDate = nextDate;
          }
        })
      } else
      {
        if (firstBuyDate === null)
        {
          firstBuyDate = moment(active.buy_at_date, 'DD.MM.YYYY');
        }

        let nextDate = moment(active.buy_at_date, 'DD.MM.YYYY');
        if (firstBuyDate.isAfter(nextDate))
        {
          firstBuyDate = nextDate;
        }
      }
    });

    return firstBuyDate;
  }

  /**
   *
   * @param actives
   * @returns {number}
   *
   * тут считается так, у нас есть отрезок времени, например 10 дней для простоты возмём.
   *
   * в первый день я купил 10 акций по 100 и в пятый день купил 10 акций по 100, а на 7 день продал 10 акций
   *
   * изначально 0
   * 1.  +100 = 100
   * 2. +100 = 200
   * 3. +100 = 300
   * 4. +100 = 400
   * 5. +200 = 600
   * 6. +200 = 800
   * 7. +100 = 900
   * 8. +100 = 1000
   * 9. +100 = 1100
   * 10. +100 = 1200
   *
   *
   * сумму делим на количество дней
   * 1200 / 10 = 120 средняя
   */
  static getAverageActivesCost(actives)
  {
    let activesWithoutCurrency = actives.filter((active) =>
    {
      return active.type_id !== ActiveConstants.CURRENCY;
    });

    let sum = 0;
    let firstBuyDate = InvestCalc.getFirstBuyDate(activesWithoutCurrency);
    let nowDate = moment().startOf('day');

    let diffDays = nowDate.diff(firstBuyDate, 'days');

    while (firstBuyDate && firstBuyDate.isBefore(nowDate))
    {
      activesWithoutCurrency.map((active) =>
      {
        let count = 0;
        let tradePrice = 0;
        let lastTradeDate = null;
        let valuePrice = 0;
        let lastValueDate = null;

        if (ActiveConstants.isPackage(active.type_id))
        {
          active.buy_trades.map((trade) =>
          {
            let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');

            if (lastTradeDate === null)
            {
              lastTradeDate = tradeDate;
            }

            if (tradeDate.isSameOrBefore(firstBuyDate))
            {
              count += trade.count;
              tradePrice = trade.price;
            }
          });

          active.buy_trades.map((trade) =>
          {

            /**
             * @var ActiveTradeCoupon $coupon
             */
            if (trade.coupons)
            {
              trade.coupons.map((coupon) =>
              {
                if (coupon.is_confirmed)
                {
                  let couponDate = moment(coupon.paid_at_date, 'DD.MM.YYYY');

                  if (couponDate.isSame(nowDate))
                  {
                    sum += coupon.sum * count;
                  }
                }
              })
            }
          });


          active.attributes.valuations?.map((valuation) =>
          {
            let valueDate;
            if (valuation.morph === 'active.user.valuation')
            {
              valueDate = moment();
            } else
            {
              valueDate = moment(valuation.value_at_date, 'DD.MM.YYYY');
            }

            lastValueDate = valueDate;

            if (valueDate.isSameOrBefore(firstBuyDate))
            {
              valuePrice = valuation.current_sum;
            }
          });

          active.attributes.dividends.map((dividend) =>
          {
            let paidDate = moment(dividend.paid_at_date, 'DD.MM.YYYY');
            //
            // if(lastTradeDate === null)
            // {
            // lastValueDate = valueDate;
            // }

            if (paidDate.isSame(firstBuyDate))
            {
              sum += dividend.sum * count;
            }
          });

          active.attributes.sell_trades.map((trade) =>
          {
            let tradeDate = moment(trade.trade_at_date, 'DD.MM.YYYY');

            lastTradeDate = tradeDate;

            if (tradeDate.isSameOrBefore(firstBuyDate))
            {
              count -= trade.count;
            }
          });
        } else
        {
          let tradeDate = moment(active.buy_at_date, 'DD.MM.YYYY');

          if (lastTradeDate === null)
          {
            lastTradeDate = tradeDate;
          }

          if (tradeDate.isSameOrBefore(firstBuyDate))
          {
            count += 1;
            tradePrice = active.buy_sum;
          }

          active.attributes.valuations?.map((valuation) =>
          {
            let valueDate;
            if (valuation.morph === 'active.user.valuation')
            {
              valueDate = moment();
            } else
            {
              valueDate = moment(valuation.value_at_date, 'DD.MM.YYYY');
            }

            lastValueDate = valueDate;

            if (valueDate.isSameOrBefore(firstBuyDate))
            {
              valuePrice = valuation.current_sum;
            }
          });

          if (active.sell_at)
          {
            let tradeDate = moment(active.sell_at_date, 'DD.MM.YYYY');

            lastTradeDate = tradeDate;

            if (tradeDate.isSameOrBefore(firstBuyDate))
            {
              count -= 1;
            }
          }
        }

        //если оценка была позже чем последняя сделка, то берем цену из оценки
        if (lastValueDate !== null && lastValueDate.isAfter(lastTradeDate) && valuePrice > 0)
        {
          sum += count * valuePrice;
        } else if (lastTradeDate !== null && tradePrice > 0)
        {
          sum += count * tradePrice;
        }
      });

      firstBuyDate.add(1, 'days')
    }

    return sum / diffDays;
  }
}


export default InvestCalc;

