export default class GridActive extends BaseModel {
    related: {
        payments: {
            func: typeof BaseModel.create;
            loaded: boolean;
        };
        buy_trades: {
            func: typeof BaseModel.create;
            loaded: boolean;
        };
        sell_trades: {
            func: typeof BaseModel.create;
            loaded: boolean;
        };
        item: {
            func: typeof BaseModel.create;
            loaded: boolean;
        };
        trades: {
            loaded: boolean;
        };
    };
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
    get buySum(): string;
    get buyOriginalSum(): string;
    get period(): any;
    get originDiffSum(): number;
    get diffSum(): number;
    get valuation(): number;
    set originValuation(x: number);
    get originValuation(): number;
    tmp_originValuation: number | undefined;
    get originValuationWithCurrency(): string;
    getFactPercent(): Promise<void>;
    set factPercent(x: void);
    get factPercent(): void;
    tmp_factPercent: void | undefined;
    getAnnuallyPercent(): Promise<void>;
    set annuallyPercent(x: void);
    get annuallyPercent(): void;
    get item(): Catalog;
    tmp_item: Catalog | undefined;
}
import BaseModel from "./BaseModel";
import Catalog from "./Catalog";
