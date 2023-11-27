import moment from "moment/moment";
import DateHelper from "../helpers/DateHelper";
import Money from "../helpers/Money";
export default class ActiveGoalConstants {
  static WITH_PLAN = 1;
  static WITHOUT_PLAN = 2;
  static SHORT = 1;
  static MIDDLE = 2;
  static LONG = 3;
  static RETIRE = 4;
  static PORTFOLIO = 5;
  static GOAL_TYPES = [ActiveGoalConstants.SHORT, ActiveGoalConstants.MIDDLE, ActiveGoalConstants.LONG, ActiveGoalConstants.RETIRE];
  static planFields = [{
    "item": {
      "id": "1",
      "name": "Группа",
      "slug": "group"
    },
    "item_id": "1",
    "item_search": "Группа",
    "item_slug": "group"
  }, {
    "item": {
      "id": "2",
      "name": "Тип",
      "slug": "type"
    },
    "item_id": "2",
    "item_search": "Тип",
    "item_slug": "type"
  }, {
    "item": {
      "id": "3",
      "name": "Страна",
      "slug": "country"
    },
    "item_id": "3",
    "item_search": "Страна",
    "item_slug": "country"
  }, {
    "item": {
      "id": "4",
      "name": "Теги",
      "slug": "users_type"
    },
    "item_id": "4",
    "item_search": "Теги",
    "item_slug": "users_type"
  }, {
    "item": {
      "id": "5",
      "name": "Капитализация",
      "slug": "size"
    },
    "item_id": "5",
    "item_search": "Капитализация",
    "item_slug": "size"
  }, {
    "item": {
      "id": "6",
      "name": "Риск",
      "slug": "risk_state"
    },
    "item_id": "6",
    "item_search": "Риск",
    "item_slug": "risk_state"
  }, {
    "item": {
      "id": "7",
      "name": "Индустрия",
      "slug": "industry"
    },
    "item_id": "7",
    "item_search": "Индустрия",
    "item_slug": "industry"
  }, {
    "item": {
      "id": "8",
      "name": "Сектор",
      "slug": "sector"
    },
    "item_id": "8",
    "item_search": "Сектор",
    "item_slug": "sector"
  }];
  static getTypes(i18n = {}) {
    return [{
      id: ActiveGoalConstants.SHORT,
      name: i18n.shortGoal
    }, {
      id: ActiveGoalConstants.MIDDLE,
      name: i18n.middleGoal
    }, {
      id: ActiveGoalConstants.LONG,
      name: i18n.longGoal
    }, {
      id: ActiveGoalConstants.RETIRE,
      name: i18n.retire
    }
    // {id: ActiveGoalConstants.PORTFOLIO, name: 'Портфель'}
    ];
  }

  static getScenarios(i18n = {}) {
    return [{
      id: 1,
      name: i18n.positive
    }, {
      id: 2,
      name: i18n.neutral
    }, {
      id: 3,
      name: i18n.negative
    }, {
      id: 4,
      name: i18n.middle
    }];
  }
  static getRetireTypes(i18n = {}) {
    return [{
      id: 1,
      name: i18n.rentier
    }, {
      id: 2,
      name: i18n.rentierWithInflation
    }, {
      id: 3,
      name: i18n.retireFund
    }];
  }
  static getConsiderTypes(i18n = {}) {
    return [{
      id: 1,
      name: i18n.control
    }, {
      id: 2,
      name: i18n.notControl
    }];
  }
  static getPlanTypes() {
    return [{
      id: ActiveGoalConstants.WITH_PLAN,
      name: ''
    }, {
      id: ActiveGoalConstants.WITHOUT_PLAN,
      name: ''
    }];
  }
  static getCalcTypes() {
    return [{
      id: 1,
      name: 'Знаю итоговую сумму'
    }, {
      id: 2,
      name: 'Знаю сумму платежа'
    }];
  }
  static NOW = 1;
  static AFTER = 0;
  static getPeriods() {
    return [{
      id: ActiveGoalConstants.NOW,
      name: 'Сейчас'
    }, {
      id: ActiveGoalConstants.AFTER,
      name: 'Через месяц'
    }];
  }
  static getBindTypes(i18n = {}) {
    return [{
      id: 1,
      name: i18n.withBind
    }, {
      id: 2,
      name: i18n.withoutBind
    }];
  }
  static getTypeById(id) {
    let type = null;
    ActiveGoalConstants.getTypes().map(item => {
      if (item.id === id) {
        type = item;
      }
      return;
    });
    return type;
  }
  static getPlanTypeById(id) {
    let type = null;
    ActiveGoalConstants.getPlanTypes().map(item => {
      if (item.id === id) {
        type = item;
      }
      return;
    });
    return type;
  }
  static getCalcTypeById(id) {
    let type = null;
    ActiveGoalConstants.getCalcTypes().map(item => {
      if (item.id === id) {
        type = item;
      }
      return;
    });
    return type;
  }
  static defaultMask(income) {
    let data = [];
    let newIncome = 0;
    let currentYear = moment().format('YYYY');
    for (let i = 0; i < 12; i++) {
      let validDay = DateHelper.getValidDate(currentYear, i + 1, 31);
      let sum = 0;

      //если последнии, то вычтем из суммы, чтобы получилось целое число
      if (i === 11) {
        sum = income - newIncome;
      } else {
        sum = Math.floor(income / 12);
        newIncome += sum;
      }
      data[i] = {
        month: 1,
        sum: sum,
        rows: [{
          day: validDay,
          sum: sum
        }]
      };
    }
    return data;
  }
  static defaultPlan() {
    return [];
  }
  static recalcByPrevIncome(item, prevPlanIncome, newPlanIncome) {
    //лучше чтобы сумма была больше 12, тогда распределение по месяцам будет корректно,
    //иначе на последний месяц будет переноситься остаток, а 11 месяцев будут по 0
    //следующее пропорциональное распределение в этом случае сделает
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ,1, 8] если сумма 21, не пропорционально

    if (newPlanIncome >= 12) {
      let proportion = Math.floor(newPlanIncome / prevPlanIncome * 100000000) / 100000000;
      let allSum = 0;
      let i = 0;
      let n = 0;
      item.months.map((month, monthKey) => {
        if (parseInt(month.month) && month.rows && month.rows.length) {
          month.rows.map(() => {
            i++;
          });
        }
      });
      item.months = item.months.map(month => {
        let sum = 0;
        if (parseInt(month.month) && month.rows && month.rows.length) {
          month.rows = month.rows.map(row => {
            n++;
            //если последняя и сумма предыдущих не равна 0
            if (i === n) {
              if (allSum !== 0) {
                row.sum = newPlanIncome - allSum;
                sum += row.sum;
                allSum += row.sum;
                row.sum = Money.format(row.sum);
              }
            } else {
              row.sum = Math.floor(Money.toDigits(row.sum) * proportion);
              sum += row.sum;
              allSum += Money.toDigits(row.sum);
              row.sum = Money.format(row.sum);
            }
            return row;
          });
          month.sum = sum;
        }
        return month;
      });
      if (allSum === 0) {
        n = 0;
        let part = Math.floor(newPlanIncome / 12);
        item.months = item.months.map(month => {
          let sum = 0;
          if (parseInt(month.month) && month.rows && month.rows.length) {
            month.rows = month.rows.map(row => {
              n++;
              if (i === n) {
                row.sum = newPlanIncome - allSum;
                sum += row.sum;
                allSum += row.sum;
                row.sum = Money.format(row.sum);
              } else {
                row.sum = part;
                sum += row.sum;
                allSum += Money.toDigits(row.sum);
                row.sum = Money.format(row.sum);
              }
              return row;
            });
            month.sum = sum;
          }
          return month;
        });
      }
    }
  }
}