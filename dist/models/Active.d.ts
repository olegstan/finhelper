export default class Active extends BaseModel {
    /**
     *
     * @type {{payments: BaseModel.load}}
     */
    related: {
        payments: typeof BaseModel.load;
    };
    currencyFields: string[];
    get avg_own_date_by_value(): any;
    set avg_own_date(x: any);
    get avg_own_date(): any;
    tmp_avg_own_date: any;
    set trades(x: any);
    get trades(): any;
    tmp_trades: any;
    set payments(x: any);
    get payments(): any;
    tmp_payments: any;
    set buy_trades(x: any);
    get buy_trades(): any;
    tmp_buy_trades: any;
    set sell_trades(x: any);
    get sell_trades(): any;
    tmp_sell_trades: any;
    set valuation(x: any);
    get valuation(): any;
    tmp_valuation: any;
    get period(): string | undefined;
    get buySum(): string | undefined;
    get buyOriginalSum(): string | undefined;
    get originDiffSum(): number;
    get diffSum(): number;
    set originValuation(x: any);
    get originValuation(): any;
    tmp_originValuation: any;
    get originValuationWithCurrency(): string;
    getFactPercent(): Promise<any>;
    tmp_factPercent: any;
    tmp_annuallyPercent: any;
    set factPercent(x: any);
    get factPercent(): any;
    getAnnuallyPercent(): Promise<any>;
    set annuallyPercent(x: any);
    get annuallyPercent(): any;
    get item(): Catalog;
    tmp_item: Catalog | undefined;
}
import BaseModel from "./BaseModel";
import Catalog from "./Catalog";
