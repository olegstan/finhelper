export default InvestCalc;
declare class InvestCalc {
    static getRoundPriceByValue(item: any, value: any): number;
    static getRoundPrice(item: any, field: any): number;
    static getRound(item: any): number;
    static getCount(item: any): string | undefined;
    static getBuyPrice(item: any, sign: any): string | undefined;
    static getBuyOriginalPrice(item: any): string | undefined;
    static getBuySum(item: any, sign: any): string | undefined;
    static getBuyOriginalSum(item: any): string | undefined;
    static getBuyDate(item: any): any;
    static getSellPrice(item: any, now: any): string | undefined;
    static getSellOriginalPrice(item: any): string | undefined;
    static getSellSum(item: any, now: any, sign: any): string | undefined;
    static getSellOriginalSum(item: any): string | undefined;
    static getSign(item: any): string;
    static getSellDate(item: any, now: any): any;
    static getPeriod(item: any, now: any): string | undefined;
    static getAnnuallyPercentByActives(actives: any, now: any, self: any): number;
    static getAnnuallyPercentWithFactPercentByActives(actives: any, profit: any): number;
    /**
     * Инициализирует структуру данных (index, sums, values, sold, grids, gridIndex)
     * и ищет дату первой покупки (firstBuyDate)
     */
    static initActivesData(activesWithoutCurrency: any): {
        index: any[];
        sums: any[];
        values: any[];
        sold: any[];
        grids: any[];
        gridIndex: any[];
        firstBuyDate: any;
    };
    /**
     *
     * @param valuationObj
     * @param newDate
     * @param newPrice
     */
    static updateLastValuation(valuationObj: any, newDate: any, newPrice: any): void;
    /**
     * Рассчитывает массив индексов валют (currencyIndex) и объект последних
     * оценок (lastValuations) для каждого типа валюты из списка активов
     */
    static calculateCurrencyValuations(actives: any): {
        currencyIndex: any[];
        lastValuations: any[];
        lastValuationsHash: any;
    };
    /**
     * Заполняет данные (sums, values, sold и т.д.) для всех активов
     * по датам, начиная с firstBuyDate и заканчивая сегодня
     */
    static fillActivesDataByDates(activesWithoutCurrency: any, firstBuyDate: any, index: any, sums: any, values: any, sold: any, grids: any, gridIndex: any): void;
    /**
     * Считает оценку конкретного актива на определённую дату (firstBuyDate)
     */
    static calculateActiveValuationForDate(active: any, currentDate: any, dateIndex: any, sums: any, values: any, sold: any, gridIndex: any, grids: any): void;
    /**
     * Подсчёт оценки для "пакета" (множественные покупки/продажи, переоценки и т.д.)
     */
    static calculatePackageActiveValuation(active: any, firstBuyDate: any, dateIndex: any, sums: any, values: any, sold: any, gridForActive: any): void;
    /**
     * Подсчёт оценки для "единичного" актива (одна покупка/продажа)
     */
    static calculateSingleActiveValuation(active: any, firstBuyDate: any, dateIndex: any, sums: any, values: any, sold: any): void;
    /**
     *
     * @param ActiveModel[] actives
     * @return {number}
     */
    static getFactPercentByActives(actives: any): number;
    /**
     * Подсчёт итоговой "фактической" доходности (profit)
     * с учётом накопленных сумм, оценок и выплат
     */
    static calculateProfit(index: any, sums: any, activesWithoutCurrency: any, grids: any, gridIndex: any): number;
    /**
     *
     * @param sortedGrid
     * @param date
     * @returns {number}
     */
    static getFactMultiplierByDate(sortedGrid: any, date: any): number;
    /**
     *
     * @param item
     * @return {Promise<*>}
     */
    static getFactPercentByItem(item: any): Promise<any>;
    /**
     *
     * @param item
     * @returns {*|moment.Moment}
     */
    static getDateByType(item: any): any | moment.Moment;
    /**
     *
     * @param item
     * @param type
     * @returns {*}
     */
    static getPriceByType(item: any, type: any): any;
    /**
     *
     * @param item
     * @returns {boolean}
     */
    static getCountByType(item: any): boolean;
    static getGrid(active: any, now: any): ({
        item: {
            price: any;
            original_price: any;
            trade_at_date: any;
        };
        type: string;
    } | {
        item: {
            price: any;
            original_price: any;
            trade_at_date: any;
            count: number;
        };
        type: string;
    })[];
    /**
     *
     * @param actives
     * @return {number}
     */
    static getValuation(actives: any): number;
    /**
     *
     * @param actives
     * @return {number}
     */
    static getInsuranceValuation(actives: any): number;
    /**
     *
     * @param item
     * @returns {number}
     */
    static getAnnuallyPercentByItem(item: any): number;
    static getFirstBuyDays(actives: any): number;
    /**
     *
     * @param actives
     * @returns {*}
     */
    static getFirstBuyDate(actives: any): any;
    /**
     *
     * @param actives
     * @returns {number}
     *
     * тут считается так, у нас есть отрезок времени, например 10 дней для простоты возмём.
     *
     * в первый день я купил 10 акций по 100 и в пятый день купил 10 акций по 100, а на 7 день продал 10 акций
     *
     * изначально 0
     * 1.  +100 = 100
     * 2. +100 = 200
     * 3. +100 = 300
     * 4. +100 = 400
     * 5. +200 = 600
     * 6. +200 = 800
     * 7. +100 = 900
     * 8. +100 = 1000
     * 9. +100 = 1100
     * 10. +100 = 1200
     *
     *
     * сумму делим на количество дней
     * 1200 / 10 = 120 средняя
     */
    static getAverageActivesCost(actives: any): number;
    static getWholeActivesSum(state: any): number;
    static getWholeObligationSum(state: any, birthAtDate: any): number;
    /**
     *
     * @param array
     * @return {*|number}
     */
    static getAccountValuation(array: any): any | number;
    /**
     *
     * @param array
     * @return {number}
     */
    static getObligationCurrent(array: any): number;
    /**
     *
     * @param array
     * @param birthAtDate
     * @return {number}
     */
    static getObligationLongTerm(array: any, birthAtDate: any): number;
}
