export default class Cache {
  static setItem(key, data, time = 24 * 60 * 60 * 1000) {
    const dataToStore = {
      data: data,
      expiry: Date.now() + time // Set expiry time in milliseconds
    };
    try {
      localStorage.setItem(key, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error storing data in cache:', error);
    }
  }
  static getItem(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (!data || Date.now() > data.expiry) {
        // Data is missing or expired
        localStorage.removeItem(key);
        return null;
      }
      return data.data;
    } catch (error) {
      console.error('Error retrieving data from cache:', error);
      return null;
    }
  }
}
//# sourceMappingURL=Cache.js.map