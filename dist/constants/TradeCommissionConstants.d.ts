export default class TradeCommissionConstants {
    static FIX: number;
    static PERCENT: number;
    static TRANSACTION: number;
    static BROKER: number;
    static OPERATION: number;
    static CUSTOM: number;
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
}
