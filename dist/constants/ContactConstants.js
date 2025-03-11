export default class ContactConstants {
  static CALL = 1001;
  static MEETINGS = 1002;
  static CONSULTATION = 1003;
  static CONTRACT_PENDING = 1004;
  static CONTRACT_CONFIRMED = 1005;
  static CONTRACT_REFUSED = 1006;
  static statuses() {
    return [{
      id: ContactConstants.CALL,
      name: 'Звонок'
    }, {
      id: ContactConstants.MEETINGS,
      name: 'Встреча'
    }, {
      id: ContactConstants.CONSULTATION,
      name: 'Консультация'
    }, {
      id: ContactConstants.CONTRACT_PENDING,
      name: 'Договор на рассмотрении'
    }, {
      id: ContactConstants.CONTRACT_CONFIRMED,
      name: 'Договор подписан'
    }, {
      id: ContactConstants.CONTRACT_REFUSED,
      name: 'Договор отклонён'
    }];
  }
  static getStatusById(id) {
    let status = null;
    ContactConstants.statuses().map(item => {
      if (item.id === id) {
        status = item;
      }
    });
    return status;
  }
}
//# sourceMappingURL=ContactConstants.js.map