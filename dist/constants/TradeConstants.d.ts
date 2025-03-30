export default class TradeConstants {
    static BUY: number;
    static SELL: number;
    static LIMIT: number;
    static MARKET: number;
    /**
     *
     * @returns {*[]}
     */
    static items(): any[];
    /**
     *
     * @returns {*[]}
     */
    static actions(): any[];
    /**
     *
     * @param id
     * @returns {{}|null}
     */
    static getActionById(id: any): {} | null;
    /**
     *
     * @param id
     * @returns {{}|null}
     */
    static getItemById(id: any): {} | null;
}
