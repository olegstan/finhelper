export default class Money {
    static formatForInput(amount: any, decimalCount?: number, decimalSign?: string, thousands?: string): string;
    static getDecimal(decimalCount: any, amount: any): {
        decimalCount: any;
        negativeSign: string;
    };
    static format: (amount: any, decimalCount?: number, decimalSign?: string, thousands?: string) => string;
    /**
     *
     * @param num
     * @param fix
     * @return {string|*}
     */
    static toFixed(num: any, fix: any): string | any;
    /**
     *
     * @param amount
     * @param fix
     * @param space
     * @return {*|string}
     */
    static toThousands(amount: any, fix?: number, space?: string): any | string;
    static getAccumulatedCouponIncome(startDate: any, endDate: any, nominal: any, rate: any, ratePeriodTypeId: any): number;
    /**
     *
     * @param sum
     * @returns {number}
     */
    static toDigits(sum: any): number;
    /**
     *
     * @param courses
     * @param id
     * @return {null}
     */
    static getCourseByCurrencyId(courses: any, id: any): null;
    /**
     *
     * @param sum
     * @param fromCurrencyId
     * @param toCurrencyId
     * @param courses
     * @returns {*}
     */
    static convert(sum: any, fromCurrencyId: any, toCurrencyId: any, courses?: []): any;
}
