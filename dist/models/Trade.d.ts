export default class Trade extends BaseModel {
    static getById(id: any, callback: any): void;
    constructor(attributes: any);
    modelFields: {
        currency: {
            loaded: boolean;
        };
        from_account: {
            loaded: boolean;
        };
    };
    attributes: any;
    set currency(x: any);
    get currency(): any;
    set from_account(x: any);
    get from_account(): any;
}
import BaseModel from "./BaseModel";
