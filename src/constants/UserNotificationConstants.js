export default class UserNotificationConstants
{
  static CREATED = 1001;
  static READED = 2001;
  static CONFIRMED = 3001;
  static REFUSED = 4001;

  /**
   * action type
   */
  static TRANSFERED_STOCK = 1001;//при списании ЦБ
  static NEGATIVE_TRADES = 1004;
  static NOT_FOUND_STOCK = 1005;
  static NOT_FOUND_MONEY_ON_DATE = 1006;
  static ERROR_COUNT_STOCK = 1007;
}