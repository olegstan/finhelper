export default GroupHelper;
declare class GroupHelper {
    /**
     *
     * @param item
     * @param accountId
     * @param sortedItems
     * @param activeIndex
     * @param groupType
     * @param modelClass
     * @returns {string}
     */
    static groupByAccount(item: any, accountId: any, sortedItems: any, activeIndex: any, groupType: any, modelClass?: typeof ActiveModel): string;
    /**
     *
     * @param actives
     * @param groupType
     * @param modelClass
     * @returns {*[]}
     */
    static prepareActives(actives: any, groupType: any, modelClass?: typeof ActiveModel): any[];
    static combineTrades(mainTrade: any, trade: any): void;
    /**
     *
     * @param items
     */
    static setValuation(items: any): void;
    /**
     *
     * @param items
     */
    static setPaidSum(items: any): void;
    /**
     *
     * @param sortedItems
     * @param groupType
     * @return {*[]}
     */
    static group(sortedItems: any, groupType: any): any[];
    static prepareAccounts(accounts: any): any[];
    static prepareLogs(logs: any, currency: any): {
        income: number;
        outcome: number;
        sign: any;
    }[];
}
import ActiveModel from "../../models/Active";
