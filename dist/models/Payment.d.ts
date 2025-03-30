export default class Payment extends BaseModel {
    constructor(attributes: any);
    modelFields: {
        currency: {
            loaded: boolean;
        };
        account: {
            loaded: boolean;
        };
    };
    attributes: any;
    set currency(x: any);
    get currency(): any;
    set account(x: any);
    get account(): any;
}
import BaseModel from "./BaseModel";
