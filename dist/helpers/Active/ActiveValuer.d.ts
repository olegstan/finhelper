export default class ActiveValuer {
    /**
     *
     * @param item
     * @param now
     * @param sign
     * @param code
     * @param original
     * @return {{code, sign, sum: number}}
     * TODO сделать review для кеширования данных оценки
     */
    static getDiff(item: any, now: any, sign: any, code: any, original?: boolean): {
        code: any;
        sign: any;
        sum: number;
    };
    static getDiffCurrency(item: any, now: any): {
        code: any;
        sign: any;
        sum: number;
    };
    /**
     *
     * @param item
     * @param original
     * @return {number|*}
     */
    static getBuyValuation(item: any, original?: boolean): number | any;
    /**
     *
     * @param item
     * @param date
     * @param sign
     * @param code
     * @param original
     * @return {{code: string, sum: number}|{code: string, sign, sum: number}|{code: string, sign, sum: *}}
     */
    static getValuation(item: any, date: any, sign: any, code: any, original?: boolean): {
        code: string;
        sum: number;
    } | {
        code: string;
        sign: any;
        sum: number;
    } | {
        code: string;
        sign: any;
        sum: any;
    };
    /**
     *
     * @param item
     * @param date
     * @return {{code: string, sum: number}|{code: string, sign, sum: number}|{code: string, sign, sum: *}}
     */
    static getOriginalValuation(item: any, date: any): {
        code: string;
        sum: number;
    } | {
        code: string;
        sign: any;
        sum: number;
    } | {
        code: string;
        sign: any;
        sum: any;
    };
}
