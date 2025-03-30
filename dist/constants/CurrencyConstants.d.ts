export default class CurrencyConstants {
    static RUBBLE_ID: number;
    static DOLLAR_ID: number;
    static EURO_ID: number;
    static RUBBLE_SIGN: string;
    static DOLLAR_SIGN: string;
    static DEFAULT_CODES: string[];
    /**
     *
     * @type {[]}
     */
    static currencies: [];
    /**
     *
     * @type {[]}
     */
    static courses: [];
    /**
     *
     * @param id
     * @return {*}
     */
    static getCurrencyNameById(id: any): any;
    static getCurrencyNameByCode(code: any): any;
    /**
     *
     * @param id
     * @return {null}
     */
    static getCurrencyById(id: any): null;
    /**
     *
     * @param id
     * @return {*}
     */
    static getCurrencySignById(id: any): any;
    /**
     *
     * @param id
     * @return {*}
     */
    static getCurrencyCodeById(id: any): any;
    /**
     *
     * @param item
     * @return {string}
     */
    static getCurrencySignByActive(item: any): string;
    /**
     *
     * @param item
     * @return {string}
     */
    static getCurrencyCodeByActive(item: any): string;
}
