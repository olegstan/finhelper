export default class ActiveConstants {
    static TINKOFF: number;
    static ZENMONEY: number;
    static GOAL: number;
    static STRATEGY: number;
    static GOAL_RECALC: number;
    static WAZZUP: number;
    static MAIL: number;
    static PLAN: number;
    static BCS_FILE_PARSE: number;
    static ACTIVE_SET_PRICE: number;
    static CATALOG_COURSE: number;
    static IRR: number;
    static ALL_ACTIVES: number;
    static REFRESH_API: number;
    static ZENMONEY_RELATION_BROKER_API: number;
    static STRATEGY_CACHE: number;
    static TINKOFF_ORDER: number;
    static RECALC_BALANCE: number;
    static MOEX_HISTORY: number;
    static YAHOO_HISTORY: number;
    static CBOND_HISTORY: number;
    static CB_HISTORY: number;
    static MOEX_PROFITABILITY: number;
    static TV_TICKERS: number;
    static YAHOO_DATA: number;
    static CBOND_PROFITABILITY: number;
    static CBOND_COURSE: number;
    static CBOND_SAVE: number;
    static FINEX_HISTORY: number;
    static MOEX_COURSE: number;
    static YAHOO_COURSE: number;
    static ATON_CRM_PARSE: number;
    static ATON_FILE_UPLOADER: number;
    static ATON_FILE_PARSE: number;
    static ATON_CLIENT_CREATE: number;
    static ATON_FILE_VALUATION: number;
    static ATON_FILE_SPLIT: number;
    static ATON_CHECK_VALUATION: number;
    static ATON_FILE_HISTORY: number;
    static ATON_CREATE_ACTION: number;
    static ATON_PSM_VALUATION: number;
    static ATON_GET_CRM_CLIENTS: number;
    static ATON_PSM_PORTFOLIO: number;
    static ONCE: number;
    static PERIOD: number;
    static SALARY: number;
    static CUSTOM_SALARY: number;
    static FLAT: number;
    static HOUSE: number;
    static LAND: number;
    static CAR: number;
    static MOTO: number;
    static TECHNIC: number;
    static JEWELRY: number;
    static PERSONAL_TECHNIC: number;
    static CUSTOM_PROPERTY: number;
    static DEPOSIT: number;
    static DEBT: number;
    static FUNDED_LIFE_INSURANCE: number;
    static COMMODITY: number;
    static CURRENCY: number;
    static CRYPTO: number;
    static ETF: number;
    static PIF: number;
    static HEDGE_FUND: number;
    static BPIF: number;
    static PRECIOUS_METAL: number;
    static STOCK: number;
    static OBLIGATION: number;
    static STRUCTURE_PRODUCT: number;
    static INVESTMENT_LIFE_INSURANCE: number;
    static EXCHANGE_NOTE: number;
    static OBLIGATION_NOTE: number;
    static STRATEGY_DU: number;
    static OPTION: number;
    static FUTURES: number;
    static FUND: number;
    static RENT_CAR: number;
    static RENT_FLAT: number;
    static SPEND_LIFE: number;
    static CUSTOM_OBLIGATION: number;
    static CAR_CREDIT: number;
    static FLAT_CREDIT: number;
    static CREDIT: number;
    static ALIMONY: number;
    static LOAN: number;
    static MONEY_ACTIVE: number;
    static PRODUCTS_SPEND: number;
    static CAFE_SPEND: number;
    static CAR_SPEND: number;
    static TRANSPORT_SPEND: number;
    static MEDICINE_SPEND: number;
    static BEAUTY_SPEND: number;
    static CLOTHES_ADULT_SPEND: number;
    static CLOTHES_CHILD_SPEND: number;
    static TOYS_SPEND: number;
    static VACATION_SPEND: number;
    static EDUCATION_SPEND: number;
    static RENT_SPEND: number;
    static FUN_SPEND: number;
    static PRESENTS_SPEND: number;
    static SPORT_SPEND: number;
    static TELECOM_SPEND: number;
    static CUSTOM_SPEND: number;
    static SALARY_INCOME: number;
    static BONUS_INCOME: number;
    static RETIRE_INCOME: number;
    static RENT_INCOME: number;
    static RELATIVES_INCOME: number;
    static PASSIVE_INCOME: number;
    static AGENT_INCOME: number;
    static CUSTOM_INCOME: number;
    static CAR_INSURANCE: number;
    static PROPERTY_INSURANCE: number;
    static HEALTH_INSURANCE: number;
    static VMI_INSURANCE: number;
    static TRAVEL_INSURANCE: number;
    static SPORT_INSURANCE: number;
    static UNIT_LINKED_INSURANCE: number;
    static LOSE_JOB_INSURANCE: number;
    static RESPONSIBILITY_INSURANCE: number;
    static PET_INSURANCE: number;
    static CUSTOM_INSURANCE: number;
    /**
     * groupping consts
     */
    static BY_TYPE: number;
    static BY_GROUP: number;
    static BY_ACCOUNT: number;
    static BY_COMPANY: number;
    static BY_NAME: number;
    static BY_BOND_DATE: number;
    static BY_CURRENCY: number;
    static BY_BROKER_NAME: number;
    static GROUP_QUERY_CATALOG: number[];
    static PROPERTY_GROUP: number[];
    static INSURANCES_GROUP: number[];
    static DIVIDEND_GROUP: number[];
    static COUPON_GROUP: number[];
    static DEBT_GROUP: number[];
    static SPENDING_GROUP: number[];
    static INCOME_GROUP: number[];
    static CREDIT_GROUP: number[];
    static OBLIGATION_GROUP: number[];
    static PACKAGE_GROUP: number[];
    static CB: number;
    static YAHOO_QUOTES: number;
    static MOSCOW_EXCHANGE_QUOTES: number;
    /**
     * catalogs
     */
    static CB_CATALOG: string;
    static YAHOO_CATALOG: string;
    static MOEX_CATALOG: string;
    static CUSTOM_CATALOG: string;
    static CBONDS_CATALOG: string;
    static CATALOGS: string[];
    static DAILY: number;
    static WEEKLY: number;
    static MONTHLY: number;
    static QUARTER: number;
    static HALFYEAR: number;
    static YEARLY: number;
    static CUSTOM_PERIOD_WEEK: number;
    static CUSTOM_PERIOD_MONTH: number;
    static CONDITION: number;
    static SIMPLE: number;
    static DIFFERENTIAL: number;
    static MONEY: number;
    static INVEST: number;
    static INVEST_TRADED: number;
    static OWN: number;
    /**
     * способ получения актива - покупка или добавление (без списания со счёта сумма за покупку)
     *
     */
    static BUY: number;
    static GET: number;
    static STOCK_GROUP_TYPE: number;
    static OBLIGATION_GROUP_TYPE: number;
    static METAL_GROUP_TYPE: number;
    static PROPERTY_GROUP_TYPE: number;
    static ALTERNATIVE_GROUP_TYPE: number;
    static DIRECT_GROUP_TYPE: number;
    static INSTRUMENT_CASH_FLOW_GROUP_TYPE: number;
    static CUSTOM_GROUP_TYPE: number;
    static CUSTOM_CLASS_TYPE: number;
    static INSURANCE_RISK_STEAL: number;
    static INSURANCE_RISK_FIRE: number;
    static INSURANCE_RISK_DISASTER: number;
    static INSURANCE_RISK_TOTAL: number;
    static INSURANCE_RISK_FLOODING: number;
    static INSURANCE_RISK_ILLEGAL_ACTIONS: number;
    static INSURANCE_RISK_DEATH: number;
    static INSURANCE_RISK_SURGICAL_INTERVENTION: number;
    static INSURANCE_RISK_SPORT_INJURY: number;
    static INSURANCE_RISK_CRITICAL_ILLNESS: number;
    static INSURANCE_RISK_HOSPITALIZATION: number;
    static INSURANCE_RISK_IN_PRODUCTION: number;
    static INSURANCE_RISK_TRAUMATIC_INJURY: number;
    static INSURANCE_RISK_CRIMINAL_INJURY: number;
    static INSURANCE_RISK_JOB_LOSS: number;
    static INSURANCE_RISK_DISABILITY: number;
    static INSURANCE_RISK_DOCTOR_ADVICE: number;
    static INSURANCE_RISK_HOSPITAL: number;
    static INSURANCE_RISK_DENTISTRY: number;
    static INSURANCE_RISK_CLINIC_SERVICE: number;
    static INSURANCE_RISK_AMBULANCE: number;
    static INSURANCE_RISK_PHARMACY: number;
    static INSURANCE_RISK_MEDICAL_TRANSPORT: number;
    static INSURANCE_RISK_ACCIDENT: number;
    static INSURANCE_RISK_TRIP_CANCELATION: number;
    static INSURANCE_RISK_ACTIVE_SPORTS: number;
    static INSURANCE_RISK_LOST_LAGGAGE: number;
    static INSURANCE_RISK_CIVIL_RESPONSIBILITY: number;
    static INSURANCE_RISK_DISABILITY_SPORTS: number;
    static INSURANCE_RISK_MARTIAL_ARTS: number;
    static INSURANCE_RISK_FIGURE_SKATING: number;
    static INSURANCE_RISK_INJURY: number;
    static INSURANCE_RISK_GAME_TEAM_SPORTS: number;
    static INSURANCE_RISK_DANCE_SPORTS: number;
    static INSURANCE_RISK_MORTALITY: number;
    static INSURANCE_RISK_ARTISTIC_GYMNASTIC: number;
    static INSURANCE_RISK_EXTREME_SPORTS: number;
    static INSURANCE_RISK_RUN: number;
    static INSURANCE_RISK_SWIMMING: number;
    static INSURANCE_RISK_COMPANY_LIQUIDATION: number;
    static INSURANCE_RISK_AGREEMENT_OF_PARTIES: number;
    static INSURANCE_RISK_CHANGE_OWNERSHIP: number;
    static INSURANCE_RISK_EXTRAORDINARY_CIRCUMSTANCES: number;
    static INSURANCE_RISK_DOWNSIZING_INCONSISTENCY: number;
    static INSURANCE_RISK_EMPLOYERS_INITIATIVE: number;
    static INSURANCE_RISK_DEATH_OF_EMPLOYER: number;
    static INSURANCE_RISK_REINSTATEMENT_TO_WORK: number;
    static INSURANCE_RISK_TERMINATION_OF_ACCESS: number;
    static INSURANCE_RISK_CAUSING_HARM_HEALTH: number;
    static INSURANCE_RISK_CAUSING_PROPERTY_DAMAGE: number;
    static INSURANCE_RISK_CONDUCTIONG_CASES_IN_JUDICAL: number;
    static INSURANCE_RISK_EXPENSES_INCURRED: number;
    /** pet form **/
    static INSURANCE_RISK_DOCTOR_ADVICE_PET: number;
    static INSURANCE_RISK_DIAGNOSTIC: number;
    static INSURANCE_RISK_PARAMEDIC: number;
    static INSURANCE_RISK_SURGICAL: number;
    static INSURANCE_RISK_MEDICATIONS: number;
    static INSURANCE_RISK_KEEPING_ANIMAL: number;
    static getName(item: any): void;
    static types(): {
        id: number;
        name: string;
    }[];
    static groups(): {
        id: number;
        name: string;
    }[];
    static paymentTypes(): {
        id: number;
        name: string;
    }[];
    static getPaymentTypeById(id: any): null;
    static actions(): {
        id: number;
        name: string;
    }[];
    static periods(): {
        id: number;
        name: string;
    }[];
    static fullList(): {
        id: number;
        name: string;
    }[];
    /**
     *
     * @param id
     * @returns {*}
     */
    static getGroupById(id: any): any;
    /**
     *
     * @param id
     * @returns {*}
     */
    static getActionById(id: any): any;
    /**
     *
     * @param id
     * @returns {*}
     */
    static getTypeById(id: any): any;
    /**
     *
     * @param id
     * @returns {*}
     */
    static getPeriodTypeById(id: any): any;
    static getActiveCurrency(item: any): any;
    static getBondDate(item: any): any;
    /**
     *
     * @param text
     * @return {string}
     */
    static getActiveCompanyByText(text: any): string;
    /**
     *
     * @param item
     * @return {string}
     */
    static getActiveCompany(item: any): string;
    /**
     *
     * @param item
     * @return {string|string|*}
     */
    static getActiveNameByType(item: any): string | string | any;
    /**
     *
     * @param item
     * @return {string|*}
     */
    static getNameWithCatalog(item: any): string | any;
    /**
     *
     * @param item
     * @return {*|string}
     */
    static getActiveNameByGroup(item: any): any | string;
    static getAccountName(account: any): any;
    /**
     *
     * @param item
     * @return {string|*|string}
     */
    static getAccountNameByActive(item: any): string | any | string;
    static getAccountIdByActive(item: any): any;
    static isPackage(typeId: any): boolean;
    /**
     *
     * @param id
     * @return {string}
     */
    static getRiskName(id: any): string;
}
