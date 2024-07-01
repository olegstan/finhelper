export default class UserTaskTypeConstants {
  static CALLS = 1001;
  static MEETINGS = 1002;
  static CONSULTATION = 1003;
  static LETTERS = 1004;
  static BUSINESS = 1005;
  static OTHER = 1005;
  static DONE = 1006;
  static BIRTH_DAY = 1007;
  static PERSONAL = 1008;
  static MESSAGE = 1009;
  static statuses = [UserTaskTypeConstants.CALLS, UserTaskTypeConstants.MEETINGS, UserTaskTypeConstants.CONSULTATION, UserTaskTypeConstants.LETTERS, UserTaskTypeConstants.BUSINESS, UserTaskTypeConstants.DONE, UserTaskTypeConstants.BIRTH_DAY, UserTaskTypeConstants.PERSONAL, UserTaskTypeConstants.MESSAGE];
  static getTextByType(type) {
    switch (type) {
      case UserTaskTypeConstants.CALLS:
        return 'Звонок';
      case UserTaskTypeConstants.MEETINGS:
        return 'Встреча';
      case UserTaskTypeConstants.CONSULTATION:
        return 'Консультация';
      case UserTaskTypeConstants.LETTERS:
        return 'Письмо';
      case UserTaskTypeConstants.BUSINESS:
      case UserTaskTypeConstants.OTHER:
        return 'Прочее';
      case UserTaskTypeConstants.DONE:
        return 'Выполнено';
      case UserTaskTypeConstants.BIRTH_DAY:
        return 'День рождения';
      case UserTaskTypeConstants.PERSONAL:
        return 'Личное';
      case UserTaskTypeConstants.MESSAGE:
        return 'Сообщение в чате';
    }
  }
}