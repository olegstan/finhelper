import React from 'react';
import Money from '../helpers/Money';
import ModelHelper from "../helpers/ModelHelper";
import moment from "moment/moment";
import ActiveConstants from "./ActiveConstants";
import CurrencyConstants from "./CurrencyConstants";
let types = [1, 2, 3, 4];
if (process.env.REACT_APP_ENV === 'test') {
  // types.push(5)
}
export default class AccountConstants {
  static CASH = 1;
  static BANK_ACCOUNT = 2;
  static DIGIT_MONEY = 3;
  static BROKER_ACCOUNT = 4;
  static TEMP = 5;
  static TYPES = types;
  static CURRENT = 1;
  static DEPOSIT = 2;
  static ALPHA_BANK = 1001;
  static SBER_BANK = 1002;
  static VTB_BANK = 1003;
  static MOSCOW_CREDIT_BANK = 1004;
  static OTKRITIE_BANK = 1005;
  static ROS_SEL_HOZ_BANK = 1006;
  static SOVCOM_BANK = 1007;
  static RAIFFAIZEN_BANK = 1008;
  static TINKOFF_BANK = 1009;
  static HOME_CREDIT_BANK = 1010;
  static ROS_BANK = 1011;
  static CUSTOM_BANK = 2001;
  static SBER_BROKER = 3001;
  static VTB_BROKER = 3002;
  static TINKOFF_BROKER = 3003;
  static BCS_BROKER = 3004;
  static ALPHA_BROKER = 3005;
  static FINAM_BROKER = 3006;
  static ATON_BROKER = 3007;
  static ALOR_BROKER = 3008;
  static OTKRITIE_BROKER = 3009;
  static FREEDOM_BROKER = 3010;
  static CUSTOM_BROKER = 4001;
  static appendCurrencyActives(accounts, currency) {
    let preparedAccounts = [];
    let index = [];
    accounts.filter(account => {
      return AccountConstants.BROKER_ACCOUNT === account.type_id;
    }).map(account => {
      account.accounts.filter(subAccount => {
        return parseInt(subAccount.sum) !== 0;
      }).map(subAccount => {
        let date = moment();

        //объединяем все остатки по одному счету, если одна валюта, то субсчета просуммируются
        let accountId = account.id;
        let sum = subAccount.sum;
        if (currency && currency.id !== 'none') {
          sum = Money.convert(sum, currency.id, subAccount.currency_id);
        }
        let cbCurrency = subAccount?.currency?.cb_currency;
        let name = CurrencyConstants.getCurrencyNameById(subAccount.currency_id);
        let keyName = accountId + name + '-' + cbCurrency?.id;
        if (index.indexOf(keyName) === -1) {
          index.push(keyName);
          let key = index.indexOf(keyName);
          let newItem = {};
          switch (name) {
            case 'GLD':
            case 'SLV':
              newItem = {
                id: subAccount.id,
                type_id: ActiveConstants.PRECIOUS_METAL,
                type_text: 'Драгоценные металлы',
                name_text: name,
                user_id: account.user_id,
                valuations: [],
                sell_trades: [],
                buy_trades: [{
                  "id": null,
                  "active_id": subAccount.id,
                  "from_account_id": subAccount.id,
                  "currency_id": subAccount.currency_id,
                  "type_id": 1,
                  "original_price": 0,
                  "price": 0,
                  "original_sum": sum,
                  "sum": sum,
                  "trade_at": date.format('DD.MM.YYYY HH:mm:ss'),
                  "trade_at_date": date.format('DD.MM.YYYY'),
                  "trade_at_datetime": date.format('DD.MM.YYYY HH:mm:ss'),
                  "count": subAccount.sum,
                  "morph": "active.trade",
                  "sum_course": 1,
                  "sum_rub_course": 1,
                  "price_course": 1,
                  "price_rub_course": 1,
                  "currency": {
                    "id": 1,
                    "name": "Российский рубль",
                    "code": "RUB",
                    "sign": "₽",
                    "order": 1
                  }
                }],
                item: cbCurrency,
                item_id: cbCurrency?.id,
                item_type: cbCurrency?.ticker
              };
              preparedAccounts[key] = newItem;
              break;
            default:
              newItem = {
                id: subAccount.id,
                type_id: ActiveConstants.CURRENCY,
                type_text: 'Валюта',
                name_text: name,
                user_id: account.user_id,
                valuations: [],
                sell_trades: [],
                buy_trades: [{
                  "id": null,
                  "active_id": subAccount.id,
                  "from_account_id": subAccount.id,
                  "currency_id": subAccount.currency_id,
                  "type_id": 1,
                  "original_price": 0,
                  "price": 0,
                  "original_sum": sum,
                  "sum": sum,
                  "trade_at": date.format('DD.MM.YYYY HH:mm:ss'),
                  "trade_at_date": date.format('DD.MM.YYYY'),
                  "trade_at_datetime": date.format('DD.MM.YYYY HH:mm:ss'),
                  "count": subAccount.sum,
                  "morph": "active.trade",
                  "sum_course": 1,
                  "sum_rub_course": 1,
                  "price_course": 1,
                  "price_rub_course": 1,
                  "currency": {
                    "id": 1,
                    "name": "Российский рубль",
                    "code": "RUB",
                    "sign": "₽",
                    "order": 1
                  }
                }],
                item: cbCurrency,
                item_id: cbCurrency?.id,
                item_type: cbCurrency?.ticker
              };
              preparedAccounts[key] = newItem;
              break;
          }
        } else {
          let key = index.indexOf(keyName);
          preparedAccounts[key]['buy_trades'][0]['original_sum'] += sum;
          preparedAccounts[key]['buy_trades'][0]['sum'] += sum;
          preparedAccounts[key]['buy_trades'][0]['count'] += subAccount.sum;
        }
      });
    });
    return preparedAccounts;
  }
  static getSubAccountById(subAccountId) {
    let account = null;
    for (let i = 0; i < ModelHelper.accounts.length; i++) {
      for (let n = 0; n < ModelHelper.accounts[i].accounts.length; n++) {
        if (subAccountId === ModelHelper.accounts[i].accounts[n].id) {
          account = ModelHelper.accounts[i].accounts[n];
        }
      }
    }
    return account;
  }
  static getAccountBySubAccountId(subAccountId) {
    if (!subAccountId || !ModelHelper.accounts) {
      return null;
    }
    let account = null;
    for (let i = 0; i < ModelHelper.accounts.length; i++) {
      for (let n = 0; n < ModelHelper.accounts[i].accounts.length; n++) {
        if (subAccountId === ModelHelper.accounts[i].accounts[n].id) {
          account = ModelHelper.accounts[i];
        }
      }
    }
    return account;
  }
  static items(items) {
    return items.map(item => {
      return {
        id: item.id,
        name: AccountConstants.textByTypeWithSum(item)
      };
    });
  }
  static textByTypeWithSum(item) {
    let code = item.currency ? item.currency.code : '';
    switch (item.type_id) {
      case AccountConstants.CASH:
        return item.name + ' ' + Money.format(item.sum) + ' ' + code;
      case AccountConstants.BANK_ACCOUNT:
        return item.name + ' ' + item.number + ' - ' + Money.format(item.sum) + ' ' + code;
      case AccountConstants.DIGIT_MONEY:
        return item.name + ' ' + item.number + ' - ' + Money.format(item.sum) + ' ' + code;
      case AccountConstants.BROKER_ACCOUNT:
        return item.name + ' ' + item.number + ' - ' + Money.format(item.sum) + ' ' + code;
      case AccountConstants.TEMP:
        return item.name + ' ' + Money.format(item.sum) + ' ' + code;
    }
  }
  static getText(subAccount) {
    return (subAccount.name ? subAccount.name : 'Счёт без названия') + ': ' + Money.format(subAccount.sum) + ' ' + subAccount.currency.sign;
  }
  static textByType(account) {
    switch (account.type_id) {
      case AccountConstants.CASH:
        return 'Наличные';
      case AccountConstants.BANK_ACCOUNT:
        return 'Банковский счёт ' + (account.name ? account.name.toLowerCase() : '');
      case AccountConstants.DIGIT_MONEY:
        return (account.system_name ? account.system_name : 'Пользовательский счёт') + ' ' + (account.number ? account.number : '');
      case AccountConstants.BROKER_ACCOUNT:
        return 'Брокерский счёт ' + (account.name ? account.name.toLowerCase() : '');
      case AccountConstants.TEMP:
        return 'Временный счёт ' + (account.number ? account.number : '');
    }
    return '---';
  }
  static getName(subAccount) {
    return subAccount && subAccount.name ? subAccount.name : 'Счёт без названия';
  }
  static getType(account) {
    switch (account.type_id) {
      case AccountConstants.CASH:
        return 'Наличные ';
      case AccountConstants.BANK_ACCOUNT:
        return 'Банковский счёт ';
      case AccountConstants.DIGIT_MONEY:
        return 'Пользовательский счёт ';
      case AccountConstants.BROKER_ACCOUNT:
        return 'Брокерский счёт ';
      case AccountConstants.TEMP:
        return 'Временный счёт ';
    }
  }
  static types() {
    return [{
      id: AccountConstants.CASH,
      name: 'Наличный'
    }, {
      id: AccountConstants.BANK_ACCOUNT,
      name: 'Банковский'
    }, {
      id: AccountConstants.BROKER_ACCOUNT,
      name: 'Брокерский'
    }, {
      id: AccountConstants.DIGIT_MONEY,
      name: 'Пользовательский'
    }];
  }
  static getTypeById(id) {
    let type = null;
    AccountConstants.types().map(item => {
      if (item.id === id) {
        type = item;
      }
    });
    return type;
  }
  static variants() {
    return [{
      id: AccountConstants.CURRENT,
      name: 'Текущий'
    }, {
      id: AccountConstants.DEPOSIT,
      name: 'Депозит'
    }];
  }
  static getVariantById(id) {
    let type = null;
    AccountConstants.TYPES.map(item => {
      if (item.id === id) {
        type = item;
      }
    });
    return type;
  }
  static getSrc(item) {
    if (item) {
      switch (item.type_id) {
        case AccountConstants.CASH:
          return require('../assets/icons/cash.svg').default;
        case AccountConstants.BANK_ACCOUNT:
          switch (item.bank_id) {
            case AccountConstants.ALPHA_BANK:
              return require('../assets/banks/alfa.png');
            case AccountConstants.SBER_BANK:
              return require('../assets/banks/sber.png');
            case AccountConstants.VTB_BANK:
              return require('../assets/banks/vtb.png');
            case AccountConstants.MOSCOW_CREDIT_BANK:
              return require('../assets/banks/mkb.png');
            case AccountConstants.OTKRITIE_BANK:
              return require('../assets/banks/otkrytie.png');
            case AccountConstants.ROS_SEL_HOZ_BANK:
              return require('../assets/banks/rshb.png');
            case AccountConstants.SOVCOM_BANK:
              return require('../assets/banks/sovcom.png');
            case AccountConstants.RAIFFAIZEN_BANK:
              return require('../assets/banks/reiff.png');
            case AccountConstants.TINKOFF_BANK:
              return require('../assets/banks/tinkoff.png');
            case AccountConstants.HOME_CREDIT_BANK:
              return require('../assets/banks/home.png');
            case AccountConstants.ROS_BANK:
              return require('../assets/banks/rosbank.png');
            default:
              return require('../assets/icons/wallet.svg').default;
          }
        case AccountConstants.BROKER_ACCOUNT:
          switch (item.bank_id) {
            case AccountConstants.ALPHA_BROKER:
              return require('../assets/banks/alfa.png');
            case AccountConstants.SBER_BROKER:
              return require('../assets/banks/sber.png');
            case AccountConstants.VTB_BROKER:
              return require('../assets/banks/vtb.png');
            case AccountConstants.OTKRITIE_BROKER:
              return require('../assets/banks/otkrytie.png');
            case AccountConstants.TINKOFF_BROKER:
              return require('../assets/banks/tinkoff.png');
            case AccountConstants.BCS_BROKER:
              return require('../assets/banks/bks.png');
            case AccountConstants.FINAM_BROKER:
              return require('../assets/banks/finam.png');
            case AccountConstants.ATON_BROKER:
              return require('../assets/banks/aton.png');
            case AccountConstants.ALOR_BROKER:
              return require('../assets/banks/alor.png');
            case AccountConstants.FREEDOM_BROKER:
              return require('../assets/banks/fridom.png');
            default:
              return require('../assets/icons/wallet.svg').default;
          }
        case AccountConstants.DIGIT_MONEY:
          return require('../assets/icons/wallet.svg').default;
        case AccountConstants.TEMP:
          return require('../assets/icons/wallet.svg').default;
      }
    }
    return require('../assets/icons/cash.svg').default;
  }
  static getImage(item) {
    if (item) {
      switch (item.type_id) {
        case AccountConstants.CASH:
          return /*#__PURE__*/React.createElement("img", {
            className: "cash",
            src: require('../assets/icons/cash.svg').default,
            alt: ""
          });
        case AccountConstants.BANK_ACCOUNT:
          switch (item.bank_id) {
            case AccountConstants.ALPHA_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/alfa.png'),
                alt: ""
              });
            case AccountConstants.SBER_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/sber.png'),
                alt: ""
              });
            case AccountConstants.VTB_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/vtb.png'),
                alt: ""
              });
            case AccountConstants.MOSCOW_CREDIT_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/mkb.png'),
                alt: ""
              });
            case AccountConstants.OTKRITIE_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/otkrytie.png'),
                alt: ""
              });
            case AccountConstants.ROS_SEL_HOZ_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/rshb.png'),
                alt: ""
              });
            case AccountConstants.SOVCOM_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/sovcom.png'),
                alt: ""
              });
            case AccountConstants.RAIFFAIZEN_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/reiff.png'),
                alt: ""
              });
            case AccountConstants.TINKOFF_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/tinkoff.png'),
                alt: ""
              });
            case AccountConstants.HOME_CREDIT_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/home.png'),
                alt: ""
              });
            case AccountConstants.ROS_BANK:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/rosbank.png'),
                alt: ""
              });
            default:
              return /*#__PURE__*/React.createElement("img", {
                className: "user",
                src: require('../assets/icons/wallet.svg').default,
                alt: ""
              });
          }
        case AccountConstants.BROKER_ACCOUNT:
          switch (item.bank_id) {
            case AccountConstants.ALPHA_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/alfa.png'),
                alt: ""
              });
            case AccountConstants.SBER_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/sber.png'),
                alt: ""
              });
            case AccountConstants.VTB_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/vtb.png'),
                alt: ""
              });
            case AccountConstants.OTKRITIE_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/otkrytie.png'),
                alt: ""
              });
            case AccountConstants.TINKOFF_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/tinkoff.png'),
                alt: ""
              });
            case AccountConstants.BCS_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/bks.png'),
                alt: ""
              });
            case AccountConstants.FINAM_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/finam.png'),
                alt: ""
              });
            case AccountConstants.ATON_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/aton.png'),
                alt: ""
              });
            case AccountConstants.ALOR_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/alor.png'),
                alt: ""
              });
            case AccountConstants.FREEDOM_BROKER:
              return /*#__PURE__*/React.createElement("img", {
                className: "bank",
                src: require('../assets/banks/fridom.png'),
                alt: ""
              });
            default:
              return /*#__PURE__*/React.createElement("img", {
                className: "user",
                src: require('../assets/icons/wallet.svg').default,
                alt: ""
              });
          }
        case AccountConstants.DIGIT_MONEY:
          return /*#__PURE__*/React.createElement("img", {
            className: "user",
            src: require('../assets/icons/wallet.svg').default,
            alt: ""
          });
        case AccountConstants.TEMP:
          return /*#__PURE__*/React.createElement("img", {
            className: "user",
            src: require('../assets/icons/wallet.svg').default,
            alt: ""
          });
      }
    }
  }
}