import ActiveConstants from "../constants/ActiveConstants";
import ActiveModel from "../models/Active";
import AccountConstants from "../constants/AccountConstants";
import ActiveValuer from "./Active/ActiveValuer";
import CurrencyConstants from "./../constants/CurrencyConstants";
class GroupHelper {
  /**
   *
   * @param actives
   * @param groupType
   * @return {*[]}
   */
  static prepareArchiveActives(actives, groupType) {
    try {
      let activeSortedItems = [];
      let sortedItems = [];
      let activeSubIndex = [];
      actives.map(item => {
        let subkey = item.item_id ? item.item_type + '.' + item.item_id : item.name_text;
        if (activeSubIndex.indexOf(subkey) === -1) {
          activeSubIndex.push(subkey);
        }
        let keyId = activeSubIndex.indexOf(subkey);
        item.keyId = keyId;
        item.attributes.keyId = keyId;
        if (typeof activeSortedItems[keyId] === 'undefined') {
          activeSortedItems[keyId] = ActiveModel.create({
            ...item.attributes
          });
          activeSortedItems[keyId].attributes.buy_trades = [];
          activeSortedItems[keyId].attributes.sell_trades = [];
        }
        item.attributes?.buy_trades?.map(trade => {
          activeSortedItems[keyId].attributes.buy_trades.push({
            ...trade
          });
        });
        item.attributes?.sell_trades?.map(trade => {
          activeSortedItems[keyId].attributes.sell_trades.push({
            ...trade
          });
        });
      });
      if (groupType === ActiveConstants.BY_TYPE) {
        sortedItems = activeSortedItems;
      } else if (groupType === ActiveConstants.BY_GROUP) {
        sortedItems = activeSortedItems;
      } else if (groupType === ActiveConstants.BY_ACCOUNT) {
        let activeIndex = [];
        activeSortedItems.map(item => {
          if (ActiveConstants.isPackage(item.type_id)) {
            item.attributes?.buy_trades?.map(trade => {
              let account = AccountConstants.getAccountBySubAccountId(trade.from_account_id);
              let key = item.id + (account ? account.id : 'none');
              if (activeIndex.indexOf(key) === -1) {
                activeIndex.push(key);
              }
              let keyId = activeIndex.indexOf(key);
              item.keyId = keyId;
              item.attributes.keyId = keyId;
              if (typeof sortedItems[keyId] === 'undefined') {
                sortedItems[keyId] = ActiveModel.create({
                  ...item.attributes
                });
                sortedItems[keyId].attributes.buy_trades = [];
                sortedItems[keyId].attributes.sell_trades = [];
              }
            });
            item.attributes?.sell_trades?.map(trade => {
              let account;
              if (item.type_id === ActiveConstants.CURRENCY) {
                account = AccountConstants.getAccountBySubAccountId(trade.to_account_id);
              } else {
                account = AccountConstants.getAccountBySubAccountId(trade.from_account_id);
              }
              let key = item.id + (account ? account.id : 'none');
              if (activeIndex.indexOf(key) === -1) {
                activeIndex.push(key);
              }
              let keyId = activeIndex.indexOf(key);
              item.keyId = keyId;
              item.attributes.keyId = keyId;
              if (typeof sortedItems[keyId] === 'undefined') {
                sortedItems[keyId] = ActiveModel.create({
                  ...item.attributes
                });
                sortedItems[keyId].attributes.buy_trades = [];
                sortedItems[keyId].attributes.sell_trades = [];
              }
            });
            item.attributes?.buy_trades?.map(trade => {
              let account = AccountConstants.getAccountBySubAccountId(trade.from_account_id);
              let key = item.id + (account ? account.id : 'none');
              let keyId = activeIndex.indexOf(key);
              sortedItems[keyId].attributes.buy_trades.push({
                ...trade
              });
            });
            item.attributes?.sell_trades?.map(trade => {
              let account;
              if (item.type_id === ActiveConstants.CURRENCY) {
                account = AccountConstants.getAccountBySubAccountId(trade.to_account_id);
              } else {
                account = AccountConstants.getAccountBySubAccountId(trade.from_account_id);
              }
              let key = item.id + (account ? account.id : 'none');
              let keyId = activeIndex.indexOf(key);
              sortedItems[keyId].attributes.sell_trades.push({
                ...trade
              });
            });
          } else {
            let key = item.id + 'none';
            if (item.buy_account_id) {
              let account = AccountConstants.getAccountBySubAccountId(item.buy_account_idd);
              key = item.id + (account ? account.id : 'none');
            }
            if (activeIndex.indexOf(key) === -1) {
              activeIndex.push(key);
            }
            let keyId = activeIndex.indexOf(key);
            item.keyId = keyId;
            item.attributes.keyId = keyId;
            if (typeof sortedItems[keyId] === 'undefined') {
              sortedItems[keyId] = ActiveModel.create({
                ...item.attributes
              });
              sortedItems[keyId].attributes.buy_trades = [];
              sortedItems[keyId].attributes.sell_trades = [];
            }
          }
        });
        GroupHelper.setValuation(sortedItems);
      }
      return GroupHelper.group(sortedItems, groupType);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  /**
   *
   * @param item
   * @param accountId
   * @param sortedItems
   * @param activeIndex
   * @param groupType
   */
  static groupByAccount(item, accountId, sortedItems, activeIndex, groupType) {
    let name = '';
    let subName = '';
    let account = null;
    if (groupType === ActiveConstants.BY_TYPE) {
      name = ActiveConstants.getActiveNameByType(item);
      account = AccountConstants.getAccountBySubAccountId(accountId);
      subName = account ? account.name : 'Без названия';
    } else if (groupType === ActiveConstants.BY_GROUP) {
      name = ActiveConstants.getActiveNameByGroup(item);
      account = AccountConstants.getAccountBySubAccountId(accountId);
      subName = account ? account.name : 'Без названия';
    } else if (groupType === ActiveConstants.BY_ACCOUNT) {
      account = AccountConstants.getAccountBySubAccountId(accountId);
      name = account ? account.name : 'Без названия';
      subName = ActiveConstants.getActiveNameByType(item);
    }
    let key = item.id + name + subName + 'none';
    if (activeIndex.indexOf(key) === -1) {
      activeIndex.push(key);
    }
    if (typeof sortedItems[activeIndex.indexOf(key)] === 'undefined') {
      sortedItems[activeIndex.indexOf(key)] = ActiveModel.create({
        ...item.attributes
      });
      sortedItems[activeIndex.indexOf(key)].attributes.trades = [];
      sortedItems[activeIndex.indexOf(key)].attributes.buy_trades = [];
      sortedItems[activeIndex.indexOf(key)].attributes.sell_trades = [];
    }
    return key;
  }

  /**
   *
   * @param actives
   * @param groupType
   * @return {unknown[]|*[]}
   */
  static prepareActives(actives, groupType) {
    try {
      let sortedItems = [];
      let activeIndex = [];
      let key = '';
      actives.map(item => {
        if (ActiveConstants.isPackage(item.type_id)) {
          item.attributes?.buy_trades?.map(trade => {
            key = GroupHelper.groupByAccount(item, trade.from_account_id, sortedItems, activeIndex, groupType);
            sortedItems[activeIndex.indexOf(key)].attributes.buy_trades.push({
              ...trade
            });
          });
          item.attributes?.sell_trades?.map(trade => {
            key = GroupHelper.groupByAccount(item, trade.from_account_id, sortedItems, activeIndex, groupType);
            sortedItems[activeIndex.indexOf(key)].attributes.sell_trades.push({
              ...trade
            });
          });
        } else {
          key = GroupHelper.groupByAccount(item, item.buy_account_id, sortedItems, activeIndex, groupType);
        }
      });
      GroupHelper.setValuation(sortedItems);
      let groups = GroupHelper.group(sortedItems, groupType);

      //сортируем по оценке
      groups.map(group => {
        group.groups.map(subGroup => {
          subGroup.actives?.sort((c1, c2) => {
            let valuation1 = c1.valuation;
            let valuation2 = c2.valuation;
            return valuation1 < valuation2 ? 1 : valuation1 > valuation2 ? -1 : 0;
          });
        });
      });

      //проверить создание покупки после группировки, не улетал запрос на бек
      // let tradeIndex = [];
      // let tradeGroup = [];
      //
      // //группируем, если дата покупки одна
      // groups.map((group) => {
      //   group.groups.map((subGroup) => {
      //     subGroup.actives.map((active) => {
      //       active.buy_trades.map((trade) => {
      //         let date = moment(trade.trade_at, 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD')
      //
      //         let tradeKey = active.id + '-' + date;
      //
      //         if (tradeIndex.indexOf(tradeKey) === -1) {
      //           tradeIndex.push(tradeKey);
      //         }
      //
      //         if (typeof tradeGroup[tradeIndex.indexOf(tradeKey)] === 'undefined') {
      //           tradeGroup[tradeIndex.indexOf(tradeKey)] = [];
      //         }
      //
      //         tradeGroup[tradeIndex.indexOf(tradeKey)].push(trade);
      //
      //         trade.trades = tradeGroup[tradeIndex.indexOf(tradeKey)];
      //       })
      //     })
      //   })
      // });

      return groups;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  static combineTrades(mainTrade, trade) {}

  /**
   *
   * @param items
   */
  static setValuation(items) {
    items.map(item => {
      let obj = ActiveValuer.getValuation(item.attributes);
      if (obj) {
        item.attributes['valuation'] = obj.sum;
      } else {
        item.attributes['valuation'] = 0;
      }
    });
  }

  /**
   *
   * @param sortedItems
   * @param groupType
   * @return {*[]}
   */
  static group(sortedItems, groupType) {
    let groups = [];
    let index = [];
    let subIndex = [];
    sortedItems.map((item, key) => {
      let name = '';
      let subName = '';
      if (groupType === ActiveConstants.BY_TYPE) {
        name = ActiveConstants.getActiveNameByType(item);
        subName = ActiveConstants.getAccountNameByActive(item);
      } else if (groupType === ActiveConstants.BY_GROUP) {
        name = ActiveConstants.getActiveNameByGroup(item);
        subName = ActiveConstants.getAccountNameByActive(item);
      } else if (groupType === ActiveConstants.BY_ACCOUNT) {
        name = ActiveConstants.getAccountNameByActive(item);
        subName = ActiveConstants.getActiveNameByType(item);
      }
      if (index.indexOf(name) === -1) {
        index.push(name);
      }
      let nameIndex = index.indexOf(name);
      if (typeof subIndex[nameIndex] === 'undefined') {
        subIndex[nameIndex] = [];
      }
      if (subIndex[nameIndex].indexOf(subName) === -1) {
        subIndex[nameIndex].push(subName);
      }
      let nameSubIndex = subIndex[nameIndex].indexOf(subName);
      if (typeof groups[nameIndex] === 'undefined') {
        groups[nameIndex] = {
          name: name,
          sum: 0,
          groups: []
        };
      }
      if (typeof groups[nameIndex].groups[nameSubIndex] === 'undefined') {
        groups[nameIndex].groups[nameSubIndex] = {
          name: subName,
          sum: 0,
          actives: []
        };
      }
      groups[nameIndex].sum += item.valuation;
      groups[nameIndex].groups[nameSubIndex].sum += item.valuation;
      groups[nameIndex].groups[nameSubIndex].actives.push(item);
    });
    return groups;
  }
  static prepareAccounts(accounts) {
    let index = [];
    let groups = [];
    accounts.filter(account => {
      return account.type_id === AccountConstants.BROKER_ACCOUNT && account.type_id !== AccountConstants.TEMP;
    }).map((account, key) => {
      account.accounts.map(subAccount => {
        let currency = CurrencyConstants.getCurrencyById(subAccount.currency_id);
        if (index.indexOf(currency.code) === -1) {
          index.push(currency.code);
        }
        //
        if (typeof groups[index.indexOf(currency.code)] === 'undefined') {
          groups[index.indexOf(currency.code)] = {
            name: currency.code,
            sign: currency.sign,
            sum: 0
          };
        }
        groups[index.indexOf(currency.code)].sum += subAccount.sum;
      });
    });
    return groups;
  }
  static prepareLogs(logs, currency) {
    let index = [];
    let indexCurrency = [];
    let pairs = [];
    let groups = [];
    groups[0] = {
      income: 0,
      outcome: 0,
      sign: currency.sign
    };
    logs.map((item, key) => {
      try {
        let keyItem = item.item_id + item.item_type;
        if (index.indexOf(keyItem) === -1) {
          index.push(keyItem);
        }
        if (typeof pairs[index.indexOf(keyItem)] === 'undefined') {
          pairs[index.indexOf(keyItem)] = {
            income: null,
            outcome: null
          };
        }
        let currency = CurrencyConstants.getCurrencyById(item.account.currency_id);
        if (indexCurrency.indexOf(currency.sign) === -1) {
          indexCurrency.push(currency.sign);
        }
        if (item.sum > 0 && item.item_type === 'transfer') {
          pairs[index.indexOf(keyItem)].income = item;
        }
        //
        if (item.sum < 0 && item.item_type === 'transfer') {
          pairs[index.indexOf(keyItem)].outcome = item;
        }
      } catch (e) {
        console.error(e);
      }
    });
    pairs.map(pair => {
      //деньги пришли на брокерский счёт с другого типа счёта или без счёта
      if (pair?.income?.account?.user_account?.type_id && pair.income.account.user_account.type_id === AccountConstants.BROKER_ACCOUNT && (pair.outcome && pair.outcome.account.user_account.type_id !== AccountConstants.BROKER_ACCOUNT || pair.outcome === null)) {
        groups[0].income += pair.income.sum;
      }

      //деньги сняты с брокерского счёта
      if ((pair?.income?.account?.user_account?.type_id && pair.income.account.user_account.type_id !== AccountConstants.BROKER_ACCOUNT || pair.income === null) && pair.outcome && pair.outcome.account.user_account.type_id === AccountConstants.BROKER_ACCOUNT) {
        groups[0].outcome += pair.outcome.sum;
      }
    });
    return groups;
  }
}
export default GroupHelper;