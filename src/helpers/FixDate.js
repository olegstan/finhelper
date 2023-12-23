import moment from "moment";

export default class FixDate
{
  static DEBUG = false;

  static getNowDate(client, tutorial)
  {
    if (FixDate.DEBUG)
    {
      return moment('2022-11-01', 'YYYY-MM-DD');
    }

    if (tutorial)
    {
      return moment('2022-11-01', 'YYYY-MM-DD');
    }

    if (client && client.email === 'bt3ritbmbtest@bt3ritbmb.com')
    {
      return moment('2022-11-01', 'YYYY-MM-DD')
    } else
    {
      return moment();
    }
  }
}