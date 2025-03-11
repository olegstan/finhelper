export default class ContactTaskRepeatConstants {
  static REPEAT_NONE = 1001;
  static REPEAT_DAILY = 1002;
  static REPEAT_WEEKLY = 1003;
  static REPEAT_MONTHLY = 1004;
  static statuses = [ContactTaskRepeatConstants.REPEAT_NONE, ContactTaskRepeatConstants.REPEAT_DAILY, ContactTaskRepeatConstants.REPEAT_WEEKLY, ContactTaskRepeatConstants.REPEAT_MONTHLY];
  static getTextByType(type) {
    switch (type) {
      case ContactTaskRepeatConstants.REPEAT_NONE:
        return 'Не повторять';
      case ContactTaskRepeatConstants.REPEAT_DAILY:
        return 'Ежедневно';
      case ContactTaskRepeatConstants.REPEAT_WEEKLY:
        return 'Еженедельно';
      case ContactTaskRepeatConstants.REPEAT_MONTHLY:
        return 'Ежемесячно';
    }
  }
}
//# sourceMappingURL=ContactTaskRepeatConstants.js.map