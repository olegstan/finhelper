export default class TradeConstants {
  static BUY = 1;
  static SELL = 2;
  static LIMIT = 1;
  static MARKET = 2;

  /**
   *
   * @returns {*[]}
   */
  static items() {
    return [{
      id: TradeConstants.BUY,
      name: 'Покупка'
    }, {
      id: TradeConstants.SELL,
      name: 'Продажа'
    }];
  }

  /**
   *
   * @returns {*[]}
   */
  static actions() {
    return [{
      id: TradeConstants.LIMIT,
      name: 'Лимитная заявка'
    }, {
      id: TradeConstants.MARKET,
      name: 'Рыночная заявка'
    }];
  }

  /**
   *
   * @param id
   * @returns {{}|null}
   */
  static getActionById(id) {
    let type = null;
    TradeConstants.actions().map(item => {
      if (item.id === id) {
        type = item;
      }
    });
    return type;
  }

  /**
   *
   * @param id
   * @returns {{}|null}
   */
  static getItemById(id) {
    let type = null;
    TradeConstants.items().map(item => {
      if (item.id === id) {
        type = item;
      }
    });
    return type;
  }
}
//# sourceMappingURL=TradeConstants.js.map