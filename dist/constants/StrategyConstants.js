export default class StrategyConstants {
  static INCOME = 1;
  static INVEST = 2;
  static PROPERTY = 3;
  static OUTCOME = 4;
  static INVEST_LOSE = 5;
  static PROPERTY_LOSE = 6;
  static items() {
    return [{
      id: StrategyConstants.INCOME,
      name: 'Накопления'
    }, {
      id: StrategyConstants.INVEST,
      name: 'Инвестиционные активы'
    }, {
      id: StrategyConstants.PROPERTY,
      name: 'Имущество'
    }, {
      id: StrategyConstants.OUTCOME,
      name: 'Расходы'
    }, {
      id: StrategyConstants.INVEST_LOSE,
      name: 'Убыток от инвестиций'
    }, {
      id: StrategyConstants.PROPERTY_LOSE,
      name: 'Убыток от имущества'
    }];
  }
}
//# sourceMappingURL=StrategyConstants.js.map