export default class AccountConstants {
    static CASH: number;
    static BANK_ACCOUNT: number;
    static DIGIT_MONEY: number;
    static BROKER_ACCOUNT: number;
    static TEMP: number;
    static TYPES: number[];
    static CURRENT: number;
    static DEPOSIT: number;
    static ALPHA_BANK: number;
    static SBER_BANK: number;
    static VTB_BANK: number;
    static MOSCOW_CREDIT_BANK: number;
    static OTKRITIE_BANK: number;
    static ROS_SEL_HOZ_BANK: number;
    static SOVCOM_BANK: number;
    static RAIFFAIZEN_BANK: number;
    static TINKOFF_BANK: number;
    static HOME_CREDIT_BANK: number;
    static ROS_BANK: number;
    static CUSTOM_BANK: number;
    static SBER_BROKER: number;
    static VTB_BROKER: number;
    static TINKOFF_BROKER: number;
    static BCS_BROKER: number;
    static ALPHA_BROKER: number;
    static FINAM_BROKER: number;
    static ATON_BROKER: number;
    static ALOR_BROKER: number;
    static OTKRITIE_BROKER: number;
    static FREEDOM_BROKER: number;
    static CUSTOM_BROKER: number;
    /**
     *
     * @param subAccount
     * @return {number}
     */
    static getBlockedSum(subAccount: any): number;
    /**
     *
     * @param accounts
     * @param currency
     * @param courses
     * @returns {*[]}
     */
    static appendCurrencyActives(accounts: any, currency: any): any[];
    /**
     *
     * @param accounts
     * @param currency
     * @returns {*[]}
     */
    static appendCurrencyGridActives(accounts: any, currency: any): any[];
    /**
     *
     * @param subAccountId
     * @param accounts
     * @return {null}
     */
    static getSubAccountById(subAccountId: any, accounts?: any[]): null;
    /**
     *
     * @param subAccountId
     * @param accounts
     * @return {null}
     */
    static getAccountBySubAccountId(subAccountId: any, accounts?: any[]): null;
    static items(items: any): any;
    static textByTypeWithSum(item: any): string | undefined;
    static getText(subAccount: any): string;
    static textByType(account: any): string;
    static getName(subAccount: any): any;
    static getType(account: any): "Банковский счёт " | "Брокерский счёт " | "Временный счёт " | "Наличные " | "Пользовательский счёт " | undefined;
    static types(): {
        id: number;
        name: string;
    }[];
    static getTypeById(id: any): null;
    static variants(): {
        id: number;
        name: string;
    }[];
    static getVariantById(id: any): null;
    static getSrc(item: any): any;
    static getImage(item: any): any;
}
