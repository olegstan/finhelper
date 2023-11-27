import moment from "moment/moment";
export default class DateHelper {
  /**
   *
   * @param day
   * @param month
   * @param year
   * @returns {*}
   */
  static getValidDate(year, month, day) {
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    //TODO если 1 число месяца
    let date = moment(year + '-' + month + '-' + day, 'YYYY-MM-DD');
    if (date.isValid()) {
      return day;
    } else {
      return DateHelper.getValidDate(year, month, day - 1);
    }
  }
}