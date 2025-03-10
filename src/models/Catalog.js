import BaseModel from "./BaseModel";
import ActiveConstants from "./../constants/ActiveConstants";

export default class Catalog extends BaseModel
{

  /**
   *
   * @type {{}}
   */
  related = {

  };

  /**
   *
   * @type {[]}
   */
  currencyFields = [

  ];

  /**
   *
   * @param allowedCatalog
   * @return {string}
   */
  getSymbol(allowedCatalog = ActiveConstants.CATALOGS)
  {
    let catalog = this.attributes?.ticker;

    if(allowedCatalog.indexOf(catalog) === -1)
    {
      return '';
    }

    return this.attributes?.symbol ?? '';
  }
}