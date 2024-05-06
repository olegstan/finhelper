import Trade from "./Trade";

export default class SellTrade extends Trade
{
  constructor(attributes)
  {
    super();
    this.attributes = attributes;

    this.setGetters(attributes);
  }
}