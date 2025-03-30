export default class ActiveValueCalculator {
    static calculate(active: any, items: any): void;
    /**
     *
     * @param active
     * @param trades
     * @param original
     * @return {number}
     */
    static getAvgPrice(active: any, trades: any, original?: boolean): number;
    static getAvgOriginalPrice(active: any, trades: any): number;
    static getAvgDate(active: any, items: any): void;
    /**
     *
     * @param items
     * @param original
     * @return {number}
     */
    static getSum(items: any, original?: boolean): number;
    /**
     *
     * @param items
     * @return {number}
     */
    static getOriginalSum(items: any): number;
    /**
     *
     * @param item
     * @param original
     * @return {number}
     */
    static getCouponBuySum(item: any, original?: boolean): number;
    /**
     *
     * @param item
     * @return {number}
     */
    static getCouponSellOriginalSum(item: any): number;
    /**
     *
     * @param item
     * @returns {number}
     */
    static getCouponBuyOriginalSum(item: any): number;
    /**
     *
     * @param item
     * @param original
     * @return {number}
     */
    static getCouponSellSum(item: any, original?: boolean): number;
    /**
     *
     * @param payments
     * @returns {number}
     */
    static getPaymentsSum(payments: any): number;
    /**
     *
     * @param item
     * @param original
     * @return {number}
     */
    static getDividendSum(item: any, original?: boolean): number;
    /**
     *
     * @param item
     * @returns {number}
     */
    static getDividendOriginalSum(item: any): number;
    /**
     *
     * @param items
     * @param original
     * @return {number}
     */
    static getCommissionSum(items: any, original?: boolean): number;
    /**
     *
     * @param items
     * @return {number}
     */
    static getCommissionOriginalSum(items: any): number;
}
