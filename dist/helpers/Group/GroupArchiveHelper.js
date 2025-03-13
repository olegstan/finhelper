import ActiveConstants from "../../constants/ActiveConstants";
import ActiveModel from "../../models/Active";
import AccountConstants from "../../constants/AccountConstants";
import GroupHelper from "./GroupHelper";
class GroupArchiveHelper {
  /**
   *
   * @param actives
   * @param groupType
   * @param modelClass
   * @returns {*[]}
   */
  static prepareActives(actives, groupType, modelClass = ActiveModel) {
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
          activeSortedItems[keyId] = modelClass.create({
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
                sortedItems[keyId] = modelClass.create({
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
                sortedItems[keyId] = modelClass.create({
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
              sortedItems[keyId] = modelClass.create({
                ...item.attributes
              });
              sortedItems[keyId].attributes.buy_trades = [];
              sortedItems[keyId].attributes.sell_trades = [];
            }
          }
        });
        GroupHelper.setValuation(sortedItems);
        GroupHelper.setPaidSum(sortedItems);
      }
      return GroupHelper.group(sortedItems, groupType);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
export default GroupArchiveHelper;
//# sourceMappingURL=GroupArchiveHelper.js.map