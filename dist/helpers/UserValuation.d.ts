export default class UserValuation {
    static getAccountValuation(array: any): any;
    /**
     *
     * @param state
     * @return {number}
     */
    static getWholeActivesSum(state: any): number;
    /**
     *
     * @param state
     * @return {number}
     */
    static getInvestActivesSum(state: any): number;
    /**
     *
     * @param managerId
     * @param clientId
     * @param currencyId
     * @param accountBanks
     * @param courses
     * @param atonValuation
     * @return {Promise<unknown>}
     */
    static getInvestActivesValuation(managerId: any, clientId: any, currencyId: any, accountBanks: any[] | undefined, courses: any, atonValuation?: boolean): Promise<unknown>;
}
