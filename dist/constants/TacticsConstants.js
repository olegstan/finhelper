export default class TacticsConstants {
  static SALARY = 1;
  static BROKER = 2;
  static RENT = 3;
  static SELL_PROPERTY = 4;
  static items() {
    return [{
      id: TacticsConstants.SALARY,
      name: 'Зароботная плата'
    }, {
      id: TacticsConstants.BROKER,
      name: 'Выводы с брокерских счетов'
    }, {
      id: TacticsConstants.RENT,
      name: 'Доход от сдачи в аренду неджижимости'
    }, {
      id: TacticsConstants.SELL_PROPERTY,
      name: 'Доход от продажи имущества'
    }];
  }
}