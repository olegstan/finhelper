export default class ClientConstants {
  static CLIENT = 'client';
  static MANAGER = 'manager';
  static OWNER = 'owner';
  static DIRECTOR = 'director';
  static ASSISTANT = 'assistant';
  static ACCOUNTANT = 'accountant';
  static PARTNER = 'partner';
  static DRIVER = 'driver';
  static DEPARTMENT_BOSS = 'departmentboss';
  static MANAGER_GROUP = [ClientConstants.MANAGER, ClientConstants.OWNER, ClientConstants.DIRECTOR, ClientConstants.ASSISTANT, ClientConstants.ACCOUNTANT, ClientConstants.PARTNER, ClientConstants.DRIVER, ClientConstants.DEPARTMENT_BOSS];
  static getRole = slug => {
    switch (slug) {
      case 'owner':
        return 'Владелец';
      case 'director':
        return 'Руководитель';
      case 'assistant':
        return 'Ассистент';
      case 'manager':
        return 'Менеджер';
      case 'accountant':
        return 'Бухгалтер';
      case 'partner':
        return 'Партнер';
      case 'driver':
        return 'Водитель';
      case 'departmentboss':
        return 'Начальник отдела';
    }
  };
}