import BaseModel from "./BaseModel";
export default class Client extends BaseModel {
  /**
   *
   * @type {string}
   */
  controller = 'client';
  constructor(attributes) {
    super();
    this.attributes = attributes;
    this.setGetters(attributes);
  }
}