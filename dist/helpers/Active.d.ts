export default class Active {
    /**
     *
     * @param item
     * @return {string|*|string}
     */
    static getName(item: any): string | any | string;
    static getGroup(items: any): any[];
    static getRangesByValue(value: any): number[];
    static getAvgDate(trade: any, date?: null): any;
    /**
     *
     * @param active
     * @param {Object[]} items
     * @returns {*}
     */
    static getCountSum(active: any, items: Object[]): any;
    /**
     *
     * @param active
     * @param {Object[]} items
     * @returns {*}
     */
    static getCountSumWithoutLotSize(active: any, items: Object[]): any;
    /**
     *
     * @param payments
     * @returns {number}
     */
    static getConfirmedPaymentsSum(payments: any, original?: boolean): number;
    /**
     *
     * @param payments
     * @returns {number}
     */
    static getConfirmedPaymentsOriginalSum(payments: any): number;
    /**
     *
     * @param payments
     * @returns {number}
     */
    static getPaymentsOriginalSum(payments: any): number;
    static getObligationCurrent(item: any, date: any): {
        sum: number;
        code: string;
    };
    static getObligationLongTerm(item: any, date: any, birthDate: any): {
        sum: number;
        code: string;
    };
    static getCodeAndSign(item: any): {
        code: string;
        sign: string;
    };
    /**
     * метод для того чтобы если были переводы на счёт, то цена внесения 0 будет, получается
     * что это будет учитываться при оценке, нужно это исключить, проверкой > 0
     * @param array
     * @param field
     * @returns {number|*}
     */
    static getNotNullPrice(array: any, field: any): number | any;
    /**
     *
     * @param self
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
    static getAccountsByDate(self: any, bindString: any, data: any, clientId: any, accountBanks: any[] | undefined, date: any, callback: any): void;
    /**
     *
     * @param state
     * @param accounts
     * @param currencyData
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     * @param types
     * @param courses
     */
    static getBalanceByDate(state: any, accounts: any, currencyData: any, clientId: any, accountBanks: any[] | undefined, date: any, callback: any, types: any, courses: any): void;
    /**
     *
     * @param state
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
    static getActivesByDate(state: any, bindString: any, data: any, clientId: any, accountBanks: any[] | undefined, date: any, callback: any): void;
    /**
     *
     * @param state
     * @param accounts
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
    static getInvestsByDate(state: any, accounts: any, bindString: any, data: any, clientId: any, accountBanks: any[] | undefined, date: any, callback: any): void;
    /**
     *
     * @param state
     * @param bindString
     * @param data
     * @param clientId
     * @param accountBanks
     * @param date
     * @param callback
     */
    static getPropertiesByDate(state: any, bindString: any, data: any, clientId: any, accountBanks: any[] | undefined, date: any, callback: any): void;
    /**
     *
     * @param state
     * @param bindString
     * @param data
     * @param clientId
     * @param date
     * @param callback
     */
    static getSpendingsByDate(state: any, bindString: any, data: any, clientId: any, date: any, callback: any): void;
    static getObligationsByDate(state: any, bindString: any, data: any, clientId: any, accountBanks: any[] | undefined, date: any, callback: any): void;
    static isRetire(user: any, year: any): true | undefined;
}
