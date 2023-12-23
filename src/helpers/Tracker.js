import Url from "./Url";

export default class Tracker
{
  static id = process.env.REACT_APP_YANDEX_TRACKER;

  static ym = null;

  static isBot()
  {
    let code = '';
    let params = Url.getParams();
    if (params && typeof params.bot === 'string')
    {
      localStorage.setItem('bot', JSON.stringify(params.bot));
      return params.bot;
    } else
    {
      code = localStorage.getItem('bot');
      if (code)
      {
        return JSON.parse(code);
      } else
      {
        return false;
      }
    }
  }

  static init()
  {
    if (process.env.REACT_APP_ENV === 'production' && Tracker.isBot() === false)
    {
      Tracker.ym = window.ym;
    }
  }

  static reachGoal(action, params = {})
  {
    try
    {
      if (process.env.REACT_APP_ENV === 'production' && typeof Tracker.ym === 'function' && Tracker.isBot() === false)
      {
        Tracker.ym(Tracker.id, 'reachGoal', action, params);
      }
    } catch (e)
    {
      console.error(e);
    }
  }

  static hit(url)
  {
    try
    {
      if (process.env.REACT_APP_ENV === 'production' && typeof Tracker.ym === 'function' && Tracker.isBot() === false)
      {
        Tracker.ym(Tracker.id, 'hit', url);
      }
    } catch (e)
    {
      console.error(e);
    }
  }


}