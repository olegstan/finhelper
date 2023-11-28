import React from 'react';
import AccountConstants from "./AccountConstants";
import Active from "../helpers/Active";
import CurrencyConstants from "./CurrencyConstants";
import moment from "moment/moment";
export default class ActiveConstants {
  static TINKOFF = 1;
  static ZENMONEY = 2;
  static GOAL = 3;
  static STRATEGY = 4;
  static GOAL_RECALC = 5;
  static WAZZUP = 6;
  static ATON_FILE_UPLOADER = 7;
  static ATON_FILE_PARSE = 8;
  static MAIL = 9;
  static PLAN = 10;
  static ATON_CRM_PARSE = 11;
  static BCS_FILE_PARSE = 12;
  static ONCE = 1;
  static PERIOD = 2;
  static SALARY = 1001;
  static CUSTOM_SALARY = 1004;
  static FLAT = 2001;
  static HOUSE = 2002;
  static LAND = 2003;
  static CAR = 2101;
  static MOTO = 2102;
  static TECHNIC = 2103;
  static JEWELRY = 2201;
  static PERSONAL_TECHNIC = 2202;
  static CUSTOM_PROPERTY = 2203;
  static DEPOSIT = 3001;
  static DEBT = 3002;
  static FUNDED_LIFE_INSURANCE = 3003;
  static COMMODITY = 3101;
  static CURRENCY = 3102;
  static CRYPTO = 3103;
  static ETF = 3104;
  static PIF = 3105;
  static HEDGE_FUND = 3106;
  static BPIF = 3107;
  static PRECIOUS_METAL = 3108;
  static STOCK = 3201;
  static OBLIGATION = 3202;
  static STRUCTURE_PRODUCT = 3203;
  static INVESTMENT_LIFE_INSURANCE = 3204;
  static EXCHANGE_NOTE = 3205;
  static OBLIGATION_NOTE = 3206;
  static STRATEGY_DU = 3207;
  static OPTION = 3208;
  static FUTURES = 3209;
  static RENT_CAR = 9001;
  static RENT_FLAT = 9002;
  static SPEND_LIFE = 9003;
  static CUSTOM_OBLIGATION = 9005;
  static CAR_CREDIT = 9006;
  static FLAT_CREDIT = 9007;
  static CREDIT = 9008;
  static ALIMONY = 9009;
  static LOAN = 9010;
  static MONEY_ACTIVE = 10001;
  static PRODUCTS_SPEND = 11001;
  static CAFE_SPEND = 11002;
  static CAR_SPEND = 11003;
  static TRANSPORT_SPEND = 11004;
  static MEDICINE_SPEND = 11005;
  static BEAUTY_SPEND = 11006;
  static CLOTHES_ADULT_SPEND = 11007;
  static CLOTHES_CHILD_SPEND = 11008;
  static TOYS_SPEND = 11009;
  static VACATION_SPEND = 11010;
  static EDUCATION_SPEND = 11011;
  static RENT_SPEND = 11012;
  static FUN_SPEND = 11013;
  static PRESENTS_SPEND = 11014;
  static SPORT_SPEND = 11015;
  static TELECOM_SPEND = 11016;
  static CUSTOM_SPEND = 9004;
  static SALARY_INCOME = 12001;
  static BONUS_INCOME = 12002;
  static RETIRE_INCOME = 12003;
  static RENT_INCOME = 12004;
  static RELATIVES_INCOME = 12005;
  static PASSIVE_INCOME = 12006;
  static AGENT_INCOME = 12007;
  static CUSTOM_INCOME = 1003;

  //страховки
  static CAR_INSURANCE = 13001;
  static PROPERTY_INSURANCE = 13002;
  static HEALTH_INSURANCE = 13003;
  static VMI_INSURANCE = 13004;
  static TRAVEL_INSURANCE = 13005;
  static SPORT_INSURANCE = 13006;
  static UNIT_LINKED_INSURANCE = 13007;
  static LOSE_JOB_INSURANCE = 13008;
  static RESPONSIBILITY_INSURANCE = 13009;
  static PET_INSURANCE = 13010;
  static CUSTOM_INSURANCE = 13011;

  /**
   * groupping consts
   */

  static BY_TYPE = 1;
  static BY_GROUP = 2;
  static BY_ACCOUNT = 3;
  static BY_COMPANY = 4;
  static BY_NAME = 5;
  static BY_BOND_DATE = 6;
  static BY_CURRENCY = 7;
  static GROUP_QUERY_CATALOG = [ActiveConstants.STOCK, ActiveConstants.ETF, ActiveConstants.OBLIGATION, ActiveConstants.FUTURES, ActiveConstants.PIF];
  static PROPERTY_GROUP = [ActiveConstants.FLAT, ActiveConstants.HOUSE, ActiveConstants.LAND, ActiveConstants.CAR, ActiveConstants.MOTO, ActiveConstants.TECHNIC, ActiveConstants.JEWELRY, ActiveConstants.PERSONAL_TECHNIC];
  static INSURANCES_GROUP = [ActiveConstants.CAR_INSURANCE, ActiveConstants.PROPERTY_INSURANCE, ActiveConstants.HEALTH_INSURANCE, ActiveConstants.VMI_INSURANCE, ActiveConstants.TRAVEL_INSURANCE, ActiveConstants.SPORT_INSURANCE, ActiveConstants.UNIT_LINKED_INSURANCE, ActiveConstants.LOSE_JOB_INSURANCE, ActiveConstants.RESPONSIBILITY_INSURANCE, ActiveConstants.INVESTMENT_LIFE_INSURANCE, ActiveConstants.FUNDED_LIFE_INSURANCE];
  static DIVIDEND_GROUP = [ActiveConstants.STOCK];
  static COUPON_GROUP = [ActiveConstants.OBLIGATION, ActiveConstants.STRUCTURE_PRODUCT, ActiveConstants.EXCHANGE_NOTE, ActiveConstants.OBLIGATION_NOTE];
  static DEBT_GROUP = [ActiveConstants.DEBT, ActiveConstants.DEPOSIT];
  static SPENDING_GROUP = [ActiveConstants.PRODUCTS_SPEND, ActiveConstants.CAFE_SPEND, ActiveConstants.CAR_SPEND, ActiveConstants.TRANSPORT_SPEND, ActiveConstants.MEDICINE_SPEND, ActiveConstants.BEAUTY_SPEND, ActiveConstants.CLOTHES_ADULT_SPEND, ActiveConstants.CLOTHES_CHILD_SPEND, ActiveConstants.TOYS_SPEND, ActiveConstants.VACATION_SPEND, ActiveConstants.EDUCATION_SPEND, ActiveConstants.RENT_SPEND, ActiveConstants.FUN_SPEND, ActiveConstants.PRESENTS_SPEND, ActiveConstants.SPORT_SPEND, ActiveConstants.TELECOM_SPEND];
  static INCOME_GROUP = [ActiveConstants.SALARY_INCOME, ActiveConstants.BONUS_INCOME, ActiveConstants.RETIRE_INCOME, ActiveConstants.RENT_INCOME, ActiveConstants.RELATIVES_INCOME, ActiveConstants.PASSIVE_INCOME, ActiveConstants.AGENT_INCOME];
  static CREDIT_GROUP = [ActiveConstants.CAR_CREDIT, ActiveConstants.FLAT_CREDIT, ActiveConstants.CREDIT
  // ActiveConstants.CUSTOM_OBLIGATION не должно быть тут, так как форма создания обязательств отличается
  ];

  static OBLIGATION_GROUP = [ActiveConstants.RENT_CAR, ActiveConstants.RENT_FLAT, ActiveConstants.SPEND_LIFE];
  static PACKAGE_GROUP = [ActiveConstants.COMMODITY, ActiveConstants.PRECIOUS_METAL, ActiveConstants.CURRENCY, ActiveConstants.CRYPTO, ActiveConstants.ETF, ActiveConstants.PIF, ActiveConstants.BPIF, ActiveConstants.HEDGE_FUND, ActiveConstants.STOCK, ActiveConstants.STRATEGY_DU, ActiveConstants.FUTURES, ActiveConstants.OPTION, ActiveConstants.OBLIGATION, ActiveConstants.STRUCTURE_PRODUCT, ActiveConstants.EXCHANGE_NOTE, ActiveConstants.OBLIGATION_NOTE];
  static CB = 1;
  static YAHOO_QUOTES = 2;
  static MOSCOW_EXCHANGE_QUOTES = 3;
  static DAILY = 1;
  static WEEKLY = 2;
  static MONTHLY = 3;
  static QUARTER = 4;
  static HALFYEAR = 5;
  static YEARLY = 6;
  static CUSTOM_PERIOD_WEEK = 7;
  static CUSTOM_PERIOD_MONTH = 8;
  static CONDITION = 9;
  static SIMPLE = 1;
  static DIFFERENTIAL = 2;
  static getName(item) {}
  static MONEY = 1;
  static INVEST = 2;
  static INVEST_TRADED = 4;
  static OWN = 3;

  /**
   * способ получения актива - покупка или добавление (без списания со счёта сумма за покупку)
   *
   */
  static BUY = 1;
  static GET = 2;
  static STOCK_GROUP_TYPE = 1001;
  static OBLIGATION_GROUP_TYPE = 1002;
  static METAL_GROUP_TYPE = 1003;
  static PROPERTY_GROUP_TYPE = 1004;
  static ALTERNATIVE_GROUP_TYPE = 1005;
  static DIRECT_GROUP_TYPE = 1006;
  static INSTRUMENT_CASH_FLOW_GROUP_TYPE = 1007;
  static CUSTOM_GROUP_TYPE = 2001;
  static CUSTOM_CLASS_TYPE = 2001;
  static types() {
    return [{
      id: ActiveConstants.SALARY,
      name: ''
    }, {
      id: ActiveConstants.SALARY_INCOME,
      name: ''
    }, {
      id: ActiveConstants.BONUS_INCOME,
      name: ''
    }, {
      id: ActiveConstants.RETIRE_INCOME,
      name: ''
    }, {
      id: ActiveConstants.RETIRE_INCOME,
      name: ''
    }, {
      id: ActiveConstants.RENT_INCOME,
      name: ''
    }, {
      id: ActiveConstants.RELATIVES_INCOME,
      name: ''
    }, {
      id: ActiveConstants.PASSIVE_INCOME,
      name: ''
    }, {
      id: ActiveConstants.AGENT_INCOME,
      name: ''
    }, {
      id: ActiveConstants.CUSTOM_INCOME,
      name: ''
    }, {
      id: ActiveConstants.CUSTOM_SALARY,
      name: ''
    }, {
      id: ActiveConstants.FLAT,
      name: 'Недвижимость'
    }, {
      id: ActiveConstants.HOUSE,
      name: 'Недвижимость'
    }, {
      id: ActiveConstants.LAND,
      name: 'Недвижимость'
    }, {
      id: ActiveConstants.CAR,
      name: 'Техника'
    }, {
      id: ActiveConstants.MOTO,
      name: 'Техника'
    }, {
      id: ActiveConstants.TECHNIC,
      name: 'Техника'
    }, {
      id: ActiveConstants.JEWELRY,
      name: 'Ювелирные украшения'
    }, {
      id: ActiveConstants.PERSONAL_TECHNIC,
      name: 'Техника'
    }, {
      id: ActiveConstants.CUSTOM_PROPERTY,
      name: 'Имущество'
    }, {
      id: ActiveConstants.DEPOSIT,
      name: 'Депозит'
    }, {
      id: ActiveConstants.DEBT,
      name: ''
    }, {
      id: ActiveConstants.FUNDED_LIFE_INSURANCE,
      name: ''
    }, {
      id: ActiveConstants.COMMODITY,
      name: 'Товары'
    }, {
      id: ActiveConstants.PRECIOUS_METAL,
      name: 'Драгоценные металлы'
    }, {
      id: ActiveConstants.CURRENCY,
      name: 'Валюта'
    }, {
      id: ActiveConstants.CRYPTO,
      name: 'Криптовалюта'
    }, {
      id: ActiveConstants.ETF,
      name: 'ETF'
    }, {
      id: ActiveConstants.PIF,
      name: 'ПИФ'
    }, {
      id: ActiveConstants.BONUS_INCOME,
      name: 'БПИФ (биржевой ПИФ)'
    }, {
      id: ActiveConstants.HEDGE_FUND,
      name: 'Хэдж-фонды'
    }, {
      id: ActiveConstants.STOCK,
      name: 'Акции'
    }, {
      id: ActiveConstants.STRATEGY_DU,
      name: 'Стратегия ДУ (доверительное управление)'
    }, {
      id: ActiveConstants.FUTURES,
      name: 'Фьючерс'
    }, {
      id: ActiveConstants.OPTION,
      name: 'Опцион'
    }, {
      id: ActiveConstants.OBLIGATION,
      name: 'Облигации'
    }, {
      id: ActiveConstants.STRUCTURE_PRODUCT,
      name: 'Структурные продукты'
    }, {
      id: ActiveConstants.INVESTMENT_LIFE_INSURANCE,
      name: 'ИЖС'
    }, {
      id: ActiveConstants.EXCHANGE_NOTE,
      name: 'Биржевая нота'
    }, {
      id: ActiveConstants.OBLIGATION_NOTE,
      name: 'Облигационная нота'
    }, {
      id: ActiveConstants.RENT_CAR,
      name: ''
    }, {
      id: ActiveConstants.RENT_FLAT,
      name: ''
    }, {
      id: ActiveConstants.SPEND_LIFE,
      name: ''
    }, {
      id: ActiveConstants.CAR_CREDIT,
      name: 'Кредит'
    }, {
      id: ActiveConstants.FLAT_CREDIT,
      name: 'Кредит'
    }, {
      id: ActiveConstants.CREDIT,
      name: 'Кредит'
    }, {
      id: ActiveConstants.LOAN,
      name: 'Займ'
    }, {
      id: ActiveConstants.ALIMONY,
      name: 'Алименты'
    }, {
      id: ActiveConstants.CUSTOM_SPEND,
      name: ''
    }, {
      id: ActiveConstants.CUSTOM_OBLIGATION,
      name: ''
    }, {
      id: ActiveConstants.MONEY_ACTIVE,
      name: 'Деньги'
    }];
  }
  static groups() {
    return [
    // {id: ActiveConstants.MONEY, name: ''},
    {
      id: ActiveConstants.OWN,
      name: 'Личный актив'
    }, {
      id: ActiveConstants.INVEST_TRADED,
      name: 'Инвестиционный финансвовый актив (торгуемый на бирже)'
    }, {
      id: ActiveConstants.INVEST,
      name: 'Инвестиционный финансвовый актив (неторгуемый на бирже)'
    }];
  }
  static paymentTypes() {
    return [{
      id: ActiveConstants.ONCE,
      name: 'Разовый'
    }, {
      id: ActiveConstants.PERIOD,
      name: 'Периодичный'
    }];
  }
  static getPaymentTypeById(id) {
    let type = null;
    ActiveConstants.paymentTypes().map(item => {
      if (item.id === id) {
        type = item;
      }
      return;
    });
    return type;
  }
  static actions() {
    return [
    // {id: ActiveConstants.MONEY, name: ''},
    {
      id: ActiveConstants.BUY,
      name: 'Покупка'
    }, {
      id: ActiveConstants.GET,
      name: 'Получение или наследование'
    }];
  }
  static periods() {
    return [{
      id: ActiveConstants.MONTHLY,
      name: 'Месяц'
    }, {
      id: ActiveConstants.QUARTER,
      name: 'Квартал'
    }, {
      id: ActiveConstants.HALFYEAR,
      name: 'Полгода'
    }, {
      id: ActiveConstants.YEARLY,
      name: 'Год'
    }];
  }
  static fullList() {
    return [{
      id: ActiveConstants.DAILY,
      name: 'День'
    }, {
      id: ActiveConstants.WEEKLY,
      name: 'Неделя'
    }, {
      id: ActiveConstants.MONTHLY,
      name: 'Месяц'
    }, {
      id: ActiveConstants.QUARTER,
      name: 'Квартал'
    }, {
      id: ActiveConstants.HALFYEAR,
      name: 'Полгода'
    }, {
      id: ActiveConstants.YEARLY,
      name: 'Год'
    }, {
      id: ActiveConstants.CUSTOM_PERIOD_WEEK,
      name: 'Еженедельно по определенным дням недели'
    }, {
      id: ActiveConstants.CUSTOM_PERIOD_MONTH,
      name: 'Ежемесячно по определенным дням месяца'
    }];
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  static getGroupById(id) {
    let group = null;
    ActiveConstants.groups().map(item => {
      if (item.id === id) {
        group = item;
      }
      return;
    });
    return group;
  }
  /**
   *
   * @param id
   * @returns {*}
   */
  static getActionById(id) {
    let group = null;
    ActiveConstants.actions().map(item => {
      if (item.id === id) {
        group = item;
      }
      return;
    });
    return group;
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  static getTypeById(id) {
    let type = null;
    ActiveConstants.types().map(item => {
      if (item.id === id) {
        type = item;
      }
      return;
    });
    return type;
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  static getPeriodTypeById(id) {
    let type = null;
    ActiveConstants.fullList().map(item => {
      if (item.id === id) {
        type = item;
      }
      return;
    });
    return type;
  }
  static getActiveCurrency(item) {
    if (ActiveConstants.isPackage(item.type_id)) {
      if (item.buy_currency_id) {
        let currency = CurrencyConstants.getCurrencyById(item.buy_currency_id);
        return currency ? CurrencyConstants.getCurrencyNameByCode(currency.code) : '';
      }
    }
    return '';
  }
  static getBondDate(item) {
    if (ActiveConstants.isPackage(item.type_id)) {
      if (item.sell_at_date) {
        let date = moment(item.sell_at_date, 'DD.MM.YYYY');
        if (date.isValid()) {
          return date.format('YYYY');
        }
      }
    }
    return 'Дата погашения не определена';
  }

  /**
   *
   * @param text
   * @return {string}
   */
  static getActiveCompanyByText(text) {
    if (text) {
      text = text.toLowerCase();
      if (text.includes('газпром') || text.includes('gaz finance') || text.includes('gaz capital')) {
        return 'Газпром';
      } else if (text.includes('ржд') || text.includes('rzd capital')) {
        return 'RGD';
      } else if (text.includes('belarus') || text.includes('RZD Capital')) {
        return 'Belarus';
      } else if (text.includes('polyus') || text.includes('полюс')) {
        return 'Polyus';
      } else if (text.includes('россия')) {
        return 'Russia';
      } else if (text.includes('фосагро')) {
        return 'Fosagro';
      } else if (text.includes('dme airport')) {
        return 'Domodedovo';
      } else if (text.includes('steel funding dac') || text.includes('нлмк')) {
        return 'NLMK';
      } else if (text.includes('гмк норильский никель')) {
        return 'GMKN';
      } else {
        console.log(text);
      }
    }

    // var re = /active\.([0-9]+)/i;
    // if (typeof item.item_type === 'string' && item.item_type?.match(re)) {
    //   ids.push(item.item_id)
    // }

    return 'Не определено';
  }

  /**
   *
   * @param item
   * @return {string}
   */
  static getActiveCompany(item) {
    return ActiveConstants.getActiveCompanyByText(Active.getName(item));
  }
  static getActiveNameByType(item) {
    if (item) {
      switch (item.type_id) {
        case ActiveConstants.FLAT:
        case ActiveConstants.HOUSE:
        case ActiveConstants.LAND:
        case ActiveConstants.CAR:
        case ActiveConstants.MOTO:
        case ActiveConstants.TECHNIC:
        case ActiveConstants.JEWELRY:
        case ActiveConstants.PERSONAL_TECHNIC:
        case ActiveConstants.CUSTOM_PROPERTY:
          return 'Имущество';
        case ActiveConstants.CURRENCY:
          return 'Валюта';
        case ActiveConstants.CRYPTO:
          return 'Криптовалюта';
        case ActiveConstants.STOCK:
          return 'Акции';
        case ActiveConstants.FUTURES:
          return 'Фьючерс';
        case ActiveConstants.ETF:
          return 'ETF (биржевой инвестиционный фонд)';
        case ActiveConstants.PIF:
          return 'Паевой инвестиционный фонд (ПИФ)';
        case ActiveConstants.BPIF:
          return 'БПИФ (биржевой ПИФ)';
        case ActiveConstants.HEDGE_FUND:
          return 'Хедж-фонд';
        case ActiveConstants.OBLIGATION:
          return 'Облигации';
        case ActiveConstants.STRUCTURE_PRODUCT:
          return 'Структурный продукт';
        case ActiveConstants.INVESTMENT_LIFE_INSURANCE:
          return 'ИЖС';
        case ActiveConstants.EXCHANGE_NOTE:
          return 'Биржевая нота';
        case ActiveConstants.OBLIGATION_NOTE:
          return 'Облигационная нота';
        case ActiveConstants.MONEY_ACTIVE:
          return 'Валюта';
      }
      return item.type_text;
    }
    return '';
  }
  static getActiveNameByGroup(item) {
    return item.group_type_text ? item.group_type_text : 'Без категории';
  }
  static getAccountNameByActive(item) {
    if (ActiveConstants.isPackage(item.type_id)) {
      if (item.buy_trades?.length) {
        if (item.buy_trades[0] && item.buy_trades[0].from_account_id) {
          let account = AccountConstants.getAccountBySubAccountId(item.buy_trades[0].from_account_id);
          return account ? account.name ? account.name : account.bank_text : '';
        }
      }
      if (item.sell_trades?.length) {
        if (item.sell_trades[0] && item.sell_trades[0].from_account_id) {
          //если это продажа валюты, то нужно менять использовать другой счёт
          if (item.type_id === ActiveConstants.CURRENCY) {
            let account = AccountConstants.getAccountBySubAccountId(item.sell_trades[0].to_account_id);
            return account ? account.name ? account.name : account.bank_text : '';
          } else {
            let account = AccountConstants.getAccountBySubAccountId(item.sell_trades[0].from_account_id);
            return account ? account.name ? account.name : account.bank_text : '';
          }
        }
      }
    } else {
      if (item.buy_account_id) {
        let account = AccountConstants.getAccountBySubAccountId(item.buy_account_id);
        return account ? account.name ? account.name : account.bank_text : '';
      }
    }
    return '';
  }
  static getAccountIdByActive(item) {
    //TODO correct grouping
    if (item.buy_trades?.length) {
      if (item.buy_trades[0] && item.buy_trades[0].from_account_id) {
        return item.buy_trades[0].from_account_id;
      }
    }
    return '';
  }
  static isPackage(typeId) {
    switch (typeId) {
      case ActiveConstants.FLAT:
      case ActiveConstants.HOUSE:
      case ActiveConstants.LAND:
      case ActiveConstants.CAR:
      case ActiveConstants.MOTO:
      case ActiveConstants.TECHNIC:
      case ActiveConstants.JEWELRY:
      case ActiveConstants.PERSONAL_TECHNIC:
      case ActiveConstants.DEBT:
      case ActiveConstants.DEPOSIT:
      case ActiveConstants.CUSTOM_PROPERTY:
      case ActiveConstants.MONEY_ACTIVE:
        return false;
      case ActiveConstants.COMMODITY:
      case ActiveConstants.PRECIOUS_METAL:
      case ActiveConstants.CURRENCY:
      case ActiveConstants.CRYPTO:
      case ActiveConstants.ETF:
      case ActiveConstants.PIF:
      case ActiveConstants.BPIF:
      case ActiveConstants.HEDGE_FUND:
      case ActiveConstants.STOCK:
      case ActiveConstants.FUTURES:
      case ActiveConstants.OPTION:
      case ActiveConstants.STRATEGY_DU:
      case ActiveConstants.OBLIGATION:
      case ActiveConstants.STRUCTURE_PRODUCT:
      case ActiveConstants.EXCHANGE_NOTE:
      case ActiveConstants.OBLIGATION_NOTE:
        return true;
    }
    return false;
  }
  static INSURANCE_RISK_STEAL = 1001;
  static INSURANCE_RISK_FIRE = 1002;
  static INSURANCE_RISK_DISASTER = 1003;
  static INSURANCE_RISK_TOTAL = 1004;
  static INSURANCE_RISK_FLOODING = 1005;
  static INSURANCE_RISK_ILLEGAL_ACTIONS = 1006;
  static INSURANCE_RISK_DEATH = 2001;
  static INSURANCE_RISK_SURGICAL_INTERVENTION = 2002;
  static INSURANCE_RISK_SPORT_INJURY = 2003;
  static INSURANCE_RISK_CRITICAL_ILLNESS = 2004;
  static INSURANCE_RISK_HOSPITALIZATION = 2005;
  static INSURANCE_RISK_IN_PRODUCTION = 2006;
  static INSURANCE_RISK_TRAUMATIC_INJURY = 2007;
  static INSURANCE_RISK_CRIMINAL_INJURY = 2008;
  static INSURANCE_RISK_JOB_LOSS = 2009;
  static INSURANCE_RISK_DISABILITY = 2010;
  static INSURANCE_RISK_DOCTOR_ADVICE = 3001;
  static INSURANCE_RISK_HOSPITAL = 3002;
  static INSURANCE_RISK_DENTISTRY = 3003;
  static INSURANCE_RISK_CLINIC_SERVICE = 3004;
  static INSURANCE_RISK_AMBULANCE = 3005;
  static INSURANCE_RISK_PHARMACY = 3006;
  static INSURANCE_RISK_MEDICAL_TRANSPORT = 4001;
  static INSURANCE_RISK_ACCIDENT = 4002;
  static INSURANCE_RISK_TRIP_CANCELATION = 4003;
  static INSURANCE_RISK_ACTIVE_SPORTS = 4004;
  static INSURANCE_RISK_LOST_LAGGAGE = 4005;
  static INSURANCE_RISK_CIVIL_RESPONSIBILITY = 4006;
  static INSURANCE_RISK_DISABILITY_SPORTS = 5001;
  static INSURANCE_RISK_MARTIAL_ARTS = 5002;
  static INSURANCE_RISK_FIGURE_SKATING = 5003;
  static INSURANCE_RISK_INJURY = 5004;
  static INSURANCE_RISK_GAME_TEAM_SPORTS = 5005;
  static INSURANCE_RISK_DANCE_SPORTS = 5006;
  static INSURANCE_RISK_MORTALITY = 5007;
  static INSURANCE_RISK_ARTISTIC_GYMNASTIC = 5008;
  static INSURANCE_RISK_EXTREME_SPORTS = 5009;
  static INSURANCE_RISK_RUN = 5010;
  static INSURANCE_RISK_SWIMMING = 5011;
  static INSURANCE_RISK_COMPANY_LIQUIDATION = 6001;
  static INSURANCE_RISK_AGREEMENT_OF_PARTIES = 6002;
  static INSURANCE_RISK_CHANGE_OWNERSHIP = 6003;
  static INSURANCE_RISK_EXTRAORDINARY_CIRCUMSTANCES = 6004;
  static INSURANCE_RISK_DOWNSIZING_INCONSISTENCY = 6005;
  static INSURANCE_RISK_EMPLOYERS_INITIATIVE = 6006;
  static INSURANCE_RISK_DEATH_OF_EMPLOYER = 6007;
  static INSURANCE_RISK_REINSTATEMENT_TO_WORK = 6008;
  static INSURANCE_RISK_TERMINATION_OF_ACCESS = 6009;
  static INSURANCE_RISK_CAUSING_HARM_HEALTH = 7001;
  static INSURANCE_RISK_CAUSING_PROPERTY_DAMAGE = 7002;
  static INSURANCE_RISK_CONDUCTIONG_CASES_IN_JUDICAL = 7003;
  static INSURANCE_RISK_EXPENSES_INCURRED = 7004;

  /** pet form **/
  static INSURANCE_RISK_DOCTOR_ADVICE_PET = 8001;
  static INSURANCE_RISK_DIAGNOSTIC = 8002;
  static INSURANCE_RISK_PARAMEDIC = 8003;
  static INSURANCE_RISK_SURGICAL = 8004;
  static INSURANCE_RISK_MEDICATIONS = 8005;
  static INSURANCE_RISK_KEEPING_ANIMAL = 8006;

  /**
   *
   * @param id
   * @return {string}
   */
  static getRiskName(id) {
    switch (parseInt(id)) {
      case ActiveConstants.INSURANCE_RISK_STEAL:
        return 'Угон';
      case ActiveConstants.INSURANCE_RISK_FIRE:
        return 'Пожар';
      case ActiveConstants.INSURANCE_RISK_DISASTER:
        return 'Стихийный бедствия';
      case ActiveConstants.INSURANCE_RISK_TOTAL:
        return 'Тотал';
      case ActiveConstants.INSURANCE_RISK_FLOODING:
        return 'Затопление';
      case ActiveConstants.INSURANCE_RISK_ILLEGAL_ACTIONS:
        return 'Противоправные действия';
      case ActiveConstants.INSURANCE_RISK_DEATH:
        return 'Смерть';
      case ActiveConstants.INSURANCE_RISK_SURGICAL_INTERVENTION:
        return 'Хирургическое вмешательство';
      case ActiveConstants.INSURANCE_RISK_SPORT_INJURY:
        return 'Спортивная травма';
      case ActiveConstants.INSURANCE_RISK_CRITICAL_ILLNESS:
        return 'Критическое заболевание';
      case ActiveConstants.INSURANCE_RISK_HOSPITALIZATION:
        return 'Госпитализация';
      case ActiveConstants.INSURANCE_RISK_IN_PRODUCTION:
        return 'На производстве';
      case ActiveConstants.INSURANCE_RISK_TRAUMATIC_INJURY:
        return 'Травматическое повреждение';
      case ActiveConstants.INSURANCE_RISK_CRIMINAL_INJURY:
        return 'Криминальная травма';
      case ActiveConstants.INSURANCE_RISK_JOB_LOSS:
        return 'Потеря работы';
      case ActiveConstants.INSURANCE_RISK_DISABILITY:
        return 'Инвалидность';
      case ActiveConstants.INSURANCE_RISK_DOCTOR_ADVICE:
        return 'Консультации врача';
      case ActiveConstants.INSURANCE_RISK_HOSPITAL:
        return 'Стационар';
      case ActiveConstants.INSURANCE_RISK_DENTISTRY:
        return 'Стоматология';
      case ActiveConstants.INSURANCE_RISK_CLINIC_SERVICE:
        return 'Амбулаторно-поликлинические услуги';
      case ActiveConstants.INSURANCE_RISK_AMBULANCE:
        return 'Скорая помощь';
      case ActiveConstants.INSURANCE_RISK_PHARMACY:
        return 'Аптека';
      case ActiveConstants.INSURANCE_RISK_MEDICAL_TRANSPORT:
        return 'Медико-транспортные расходы';
      case ActiveConstants.INSURANCE_RISK_ACCIDENT:
        return 'Несчастный случай';
      case ActiveConstants.INSURANCE_RISK_TRIP_CANCELATION:
        return 'Отмена поездки и задержка рейса';
      case ActiveConstants.INSURANCE_RISK_ACTIVE_SPORTS:
        return 'Активные виды спорта';
      case ActiveConstants.INSURANCE_RISK_LOST_LAGGAGE:
        return 'Утрата багажа';
      case ActiveConstants.INSURANCE_RISK_CIVIL_RESPONSIBILITY:
        return 'Гражданская ответственность';
      case ActiveConstants.INSURANCE_RISK_DISABILITY_SPORTS:
        return 'Инвалидность';
      case ActiveConstants.INSURANCE_RISK_MARTIAL_ARTS:
        return 'Боевые единоборства';
      case ActiveConstants.INSURANCE_RISK_FIGURE_SKATING:
        return 'Фигурное катание';
      case ActiveConstants.INSURANCE_RISK_INJURY:
        return 'Травма';
      case ActiveConstants.INSURANCE_RISK_GAME_TEAM_SPORTS:
        return 'Игровые командные виды спорта (футбол; хоккей и т.д)';
      case ActiveConstants.INSURANCE_RISK_DANCE_SPORTS:
        return 'Спортивные танцы';
      case ActiveConstants.INSURANCE_RISK_MORTALITY:
        return 'Смертность';
      case ActiveConstants.INSURANCE_RISK_ARTISTIC_GYMNASTIC:
        return 'Художественная и спортивная гимнастика';
      case ActiveConstants.INSURANCE_RISK_EXTREME_SPORTS:
        return 'Экстремальные виды спорта  (сноуборд; горнолыжный спорт; скейтборд) и т.д.';
      case ActiveConstants.INSURANCE_RISK_RUN:
        return 'Бег';
      case ActiveConstants.INSURANCE_RISK_SWIMMING:
        return 'Плавание';
      case ActiveConstants.INSURANCE_RISK_COMPANY_LIQUIDATION:
        return 'Ликвидация предприятия';
      case ActiveConstants.INSURANCE_RISK_AGREEMENT_OF_PARTIES:
        return 'Соглашение сторон';
      case ActiveConstants.INSURANCE_RISK_CHANGE_OWNERSHIP:
        return 'Смена собственника имущества организации';
      case ActiveConstants.INSURANCE_RISK_EXTRAORDINARY_CIRCUMSTANCES:
        return 'Чрезвычайные обстоятельства; препятствующие продолжению трудовых отношений';
      case ActiveConstants.INSURANCE_RISK_DOWNSIZING_INCONSISTENCY:
        return 'Сокращение штата несоответствием занимаемой должности или выполняемой работы';
      case ActiveConstants.INSURANCE_RISK_EMPLOYERS_INITIATIVE:
        return 'Инициатива работодателя при неудовлетворительном результате прохождения испытания; установленного трудовым договором';
      case ActiveConstants.INSURANCE_RISK_DEATH_OF_EMPLOYER:
        return 'Смерть работодателя — физического лица';
      case ActiveConstants.INSURANCE_RISK_REINSTATEMENT_TO_WORK:
        return 'Восстановление на работе лица; ранее выполнявшего эту работу';
      case ActiveConstants.INSURANCE_RISK_TERMINATION_OF_ACCESS:
        return 'Прекращение допуска к государственной тайне';
      case ActiveConstants.INSURANCE_RISK_DOCTOR_ADVICE_PET:
        return 'Консультации врача';
      case ActiveConstants.INSURANCE_RISK_DIAGNOSTIC:
        return 'Диагностические исследования';
      case ActiveConstants.INSURANCE_RISK_PARAMEDIC:
        return 'Фельдшерские процедуры';
      case ActiveConstants.INSURANCE_RISK_SURGICAL:
        return 'Хирургические операции';
      case ActiveConstants.INSURANCE_RISK_MEDICATIONS:
        return 'Лекарственные препараты и другие необходимые для лечения средства';
      case ActiveConstants.INSURANCE_RISK_KEEPING_ANIMAL:
        return 'Одни сутки содержания животного в стационаре по каждому обращению в клинику';
      case ActiveConstants.INSURANCE_RISK_CAUSING_HARM_HEALTH:
        return 'Причинение вреда жизни или здоровью';
      case ActiveConstants.INSURANCE_RISK_CAUSING_PROPERTY_DAMAGE:
        return 'Причинение имущественного вреда';
      case ActiveConstants.INSURANCE_RISK_CONDUCTIONG_CASES_IN_JUDICAL:
        return 'Ведение дел по страховому случаю в судебных органах';
      case ActiveConstants.INSURANCE_RISK_EXPENSES_INCURRED:
        return 'Расходы; произведенные страхователем в целях уменьшения убытков';
    }
  }
  static getImage(item) {
    if (item) {
      switch (item.type_id) {
        case ActiveConstants.FLAT:
          return /*#__PURE__*/React.createElement("img", {
            className: "flat",
            src: require('../assets/icons/house.svg').default
          });
        case ActiveConstants.HOUSE:
          return /*#__PURE__*/React.createElement("img", {
            className: "house",
            src: require('../assets/icons/renta.svg').default
          });
        case ActiveConstants.CAR:
          return /*#__PURE__*/React.createElement("img", {
            className: "car",
            src: require('../assets/icons/car.svg').default
          });
        case ActiveConstants.MOTO:
        case ActiveConstants.LAND:
        case ActiveConstants.TECHNIC:
        case ActiveConstants.JEWELRY:
        case ActiveConstants.PERSONAL_TECHNIC:
        case ActiveConstants.CUSTOM_PROPERTY:
          return /*#__PURE__*/React.createElement("img", {
            className: "cash",
            src: require('../assets/icons/cash.svg').default
          });
        case ActiveConstants.CAR_CREDIT:
          return /*#__PURE__*/React.createElement("img", {
            className: "car",
            src: require('../assets/icons/car.svg').default
          });
        case ActiveConstants.FLAT_CREDIT:
          return /*#__PURE__*/React.createElement("img", {
            className: "flat",
            src: require('../assets/icons/house.svg').default
          });
        case ActiveConstants.CREDIT:
        case ActiveConstants.LOAN:
        case ActiveConstants.ALIMONY:
          return /*#__PURE__*/React.createElement("img", {
            className: "cash",
            src: require('../assets/icons/cash.svg').default
          });
        case ActiveConstants.CUSTOM_OBLIGATION:
          return /*#__PURE__*/React.createElement("img", {
            className: "cash",
            src: require('../assets/icons/cash.svg').default
          });
        case ActiveConstants.CAR_INSURANCE:
        case ActiveConstants.PROPERTY_INSURANCE:
        case ActiveConstants.HEALTH_INSURANCE:
        case ActiveConstants.VMI_INSURANCE:
        case ActiveConstants.TRAVEL_INSURANCE:
        case ActiveConstants.SPORT_INSURANCE:
        case ActiveConstants.UNIT_LINKED_INSURANCE:
        case ActiveConstants.LOSE_JOB_INSURANCE:
        case ActiveConstants.RESPONSIBILITY_INSURANCE:
        case ActiveConstants.PET_INSURANCE:
        case ActiveConstants.CUSTOM_INSURANCE:
          return /*#__PURE__*/React.createElement("img", {
            className: "cash",
            src: require('../assets/icons/shield.svg').default
          });
        default:
          return /*#__PURE__*/React.createElement("img", {
            className: "cash",
            src: require('../assets/icons/cash.svg').default
          });
      }
    }
  }
}