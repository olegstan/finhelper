import BaseModel from "./BaseModel";
import ActiveConstants from "./../constants/ActiveConstants";
export default class Catalog extends BaseModel {
  /**
   *
   * @type {{}}
   */
  related = {};

  /**
   *
   * @type {[]}
   */
  currencyFields = [];

  /**
   *
   * @param allowedCatalog
   * @return {string}
   */
  getSymbol(allowedCatalog = ActiveConstants.CATALOGS) {
    let isin = '';
    let catalog = this.attributes?.ticker;
    switch (catalog) {
      case ActiveConstants.CB_CATALOG:
        isin = this.attributes?.char_code;
        break;
      case ActiveConstants.YAHOO_CATALOG:
        isin = this.attributes?.symbol;
        break;
      case ActiveConstants.MOEX_CATALOG:
      case ActiveConstants.CBONDS_CATALOG:
        isin = this.attributes.isin;
        break;
      case ActiveConstants.CUSTOM_CATALOG:
        isin = this.attributes.symbol;
        break;
    }
    if (allowedCatalog.indexOf(catalog) === -1) {
      return '';
    }
    return isin;
  }
}
//# sourceMappingURL=Catalog.js.map