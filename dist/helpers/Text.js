export default class Text {
  static getYears(n) {
    n = parseInt(n);
    if (n === 1) {
      return 'год';
    }
    if (n > 1 && n < 5) {
      return 'года';
    }
    if (n >= 5) {
      return 'лет';
    }
  }
  static fio(client) {
    if (client.last_name && client.first_name && client.middle_name) {
      return (client.last_name ? client.last_name : '') + ' ' + (client.first_name ? client.first_name : '') + ' ' + (client.middle_name ? client.middle_name : '');
    }
    if (client.last_name && client.first_name) {
      return (client.last_name ? client.last_name : '') + ' ' + (client.first_name ? client.first_name : '');
    }
    if (client.name) {
      return client.name;
    }
    if (client.last_name) {
      return client.last_name;
    }
    if (client.email) {
      return client.email;
    }
  }
}