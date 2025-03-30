export default class TransferConstants {
    static BETWEEN_ACCOUNTS: number;
    static TAX: number;
    static SPENDING: number;
    static INCOME: number;
    static CHANGE: number;
    static BETWEEN_ACCOUNTS_TEMP: number;
    static BUY_OWN_ACTIVE: number;
    static BUY_INVEST_ACTIVE: number;
    static SELL_OWN_ACTIVE: number;
    static SELL_INVEST_ACTIVE: number;
    static ADD_OWN_ACTIVE: number;
    static ADD_INVEST_ACTIVE: number;
    static ADD_PAYMENT: number;
    static ADD_OBLIGATION_PAYMENT: number;
    static CONNECT_PAYMENT: number;
    static COMMISSION: number;
    static FIX: number;
    static PERCENT: number;
    static TRANSACTION: number;
    static BROKER: number;
    static OPERATION: number;
    static CUSTOM: number;
    static items(actionTypeId: any): {
        id: number;
        name: string;
    }[];
    static types(): {
        id: number;
        name: string;
    }[];
    /**
     *
     * @param id
     * @returns {*}
     */
    static getTypeById(id: any): any;
    /**
     *
     * @param id
     * @returns {*}
     */
    static getItemById(id: any, oldActionTypeId?: null): any;
}
