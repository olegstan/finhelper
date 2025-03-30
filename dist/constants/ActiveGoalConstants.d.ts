export default class ActiveGoalConstants {
    static WITH_PLAN: number;
    static WITHOUT_PLAN: number;
    static SHORT: number;
    static MIDDLE: number;
    static LONG: number;
    static RETIRE: number;
    static PORTFOLIO: number;
    static GOAL_TYPES: number[];
    static planFields: {
        item: {
            id: string;
            name: string;
            slug: string;
        };
        item_id: string;
        item_search: string;
        item_slug: string;
    }[];
    static NOW: number;
    static AFTER: number;
    static getTypes(i18n?: {}): {
        id: number;
        name: any;
    }[];
    static getScenarios(i18n?: {}): {
        id: number;
        name: any;
    }[];
    static getRetireTypes(i18n?: {}): {
        id: number;
        name: any;
    }[];
    static getConsiderTypes(i18n?: {}): {
        id: number;
        name: any;
    }[];
    static getPlanTypes(): {
        id: number;
        name: string;
    }[];
    static getCalcTypes(): {
        id: number;
        name: string;
    }[];
    static getPeriods(): {
        id: number;
        name: string;
    }[];
    static getBindTypes(i18n?: {}): {
        id: number;
        name: any;
    }[];
    static getTypeById(id: any): null;
    static getPlanTypeById(id: any): null;
    static getCalcTypeById(id: any): null;
    static isLeapYear(year: any): boolean;
    static getNextNonLeapYear(startYear: any): any;
    /**
     *
     * @param income
     * @return {*[]}
     */
    static defaultMask(income: any): any[];
    static defaultPlan(): never[];
    static recalcByPrevIncome(item: any, prevPlanIncome: any, newPlanIncome: any): void;
}
