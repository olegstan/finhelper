import {Api} from "laravel-request";

export default class BaseModel
{
  /**
   *
   * @type {Array}
   */
  attributes = [];
  /**
   *
   * @type {{}}
   */
  related = {};

  /**
   *
   * @type {string}
   */
  controller = '';

  /**
   *
   * @param {Array} attributes
   */
  constructor(attributes)
  {
    this.attributes = attributes;

    this.setGetters(attributes);
  }

  get id()
  {
    return this.attributes.id;
  }

  set id(x)
  {
    this.attributes.id = x;
  }

  /**
   *
   * @param attributes
   * @return {BaseModel}
   */
  static create(attributes)
  {
    return new this(attributes)
  }

  /**
   *
   * @param array
   * @returns {*}
   */
  static load(array)
  {
    return array.map((item) =>
    {
      return this.create(item);
    })
  }

  static getInstance()
  {
    return new this();
  }

  static fetch(method = 'index', params = {})
  {
    return Api.get(this.getInstance().controller, method, params)
  }

  setGetters(attributes)
  {
    for (const index in attributes)
    {
      if (typeof this.related[index] !== 'undefined' || index === 'attributes' || index === 'related' || index === 'modelFields' || index === 'currencyFields')
      {

      } else
      {
        try
        {
          Object.defineProperty(this, index, {
            get()
            {
              return this.attributes[index]
            },
            set(x)
            {
              this.attributes[index] = x;
            },
          });
        } catch (e)
        {
          console.warn(e.message)
        }
      }
    }
    // debugger
  }

  /**
   *
   * @param prop
   * @returns {*}
   */
  get(prop)
  {
    if (typeof this.attributes[prop] === "undefined")
      return null;
    else
      return this.attributes[prop];
  }

  /**
   *
   * @param prop
   * @param value
   */
  set(prop, value)
  {
    this.attributes[prop] = value;
  }
}
