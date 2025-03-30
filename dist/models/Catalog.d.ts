export default class Catalog extends BaseModel {
    /**
     *
     * @type {[]}
     */
    currencyFields: [];
    /**
     *
     * @param allowedCatalog
     * @return {string}
     */
    getSymbol(allowedCatalog?: string[]): string;
}
import BaseModel from "./BaseModel";
