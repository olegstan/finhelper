export default class StrategyConstants {
    static INCOME: number;
    static INVEST: number;
    static PROPERTY: number;
    static OUTCOME: number;
    static INVEST_LOSE: number;
    static PROPERTY_LOSE: number;
    static items(): {
        id: number;
        name: string;
    }[];
}
