export default class Account {
    /**
     * если счет был удалён, то операция будет привязана к временному счету
     * данная функция фильтрует счета, чтобы нельзя было выбрать временный счет,
     * но показывает в качестве выбранного временный счет после удаления
     *
     * @param value
     * @param propsAccounts
     * @param types
     * @returns {Array}
     */
    static getFiltered(value: any, propsAccounts: any, types: any): any[];
    /**
     *
     * @param value
     * @param propCurrencies
     * @returns {Array}
     */
    static getCurrencyFiltered(value: any, propCurrencies: any): any[];
    /**
     *
     * @param accounts
     * @param currency
     * @param textLength
     * @returns {Array}
     */
    static prepareAccounts(accounts: any, currency: any, textLength?: number): any[];
}
