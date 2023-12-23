export default class Cache
{

  static setItem(key, data, time = 24 * 60 * 60 * 1000)
  {
    const dataToStore = {
      data: data,
      expiry: new Date().getTime() + time, // Сохраняем данные на 24 часа
    };
    window.localStorage.setItem(key, JSON.stringify(dataToStore));
  }

  static getItem(key)
  {
    let data = null;

    try
    {
      data = JSON.parse(window.localStorage.getItem(key));
    } catch (e)
    {
      return null;
    }

    if (typeof data === 'undefined' || data === null)
    {
      return null;
    }

    if (new Date().getTime() > data.expiry)
    {
      // Данные устарели
      window.localStorage.removeItem(key);
      return null;
    }
    return data.data;
  }
}