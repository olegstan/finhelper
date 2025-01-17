export default class IndexedDBCache {
  static _db;
  static _storeName;

  /**
   *
   * @param databaseName
   * @param storeName
   */
  static async ensureDatabaseOpened(databaseName = 'AppStorage', storeName = 'DataStore') {
    if (!this._db) {
      await this.openDatabase(databaseName, storeName);
    }
  }

  /**
   *
   * @param databaseName
   * @param storeName
   * @return {Promise<unknown>}
   */
  static openDatabase(databaseName, storeName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, 1);
      request.onerror = event => {
        throw new Error('Error opening IndexedDB');
      };
      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath: 'key'
          });
        }
      };
      request.onsuccess = () => {
        // Store the DB reference here instead
        this._db = request.result;
        this._storeName = storeName;
        resolve();
      };
    });
  }
  static async set(key, value, expirationTimeInMs = 1000 * 60 * 60 * 24) {
    await this.ensureDatabaseOpened();
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction([this._storeName], 'readwrite');
      const objectStore = transaction.objectStore(this._storeName);
      const expirationTime = expirationTimeInMs ? Date.now() + expirationTimeInMs : null;
      try {
        // Ensure the value is serializable
        const sanitizedValue = JSON.parse(JSON.stringify(value));
        const data = {
          key,
          value: sanitizedValue,
          expirationTime
        };
        const request = objectStore.put(data);
        request.onsuccess = () => resolve();
        request.onerror = event => reject(new Error(`Error putting JSON data: ${event.target.error}`));
      } catch (error) {
        reject(new Error(`Data serialization failed: ${error.message}`));
      }
    });
  }
  static async get(key) {
    await this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this._storeName], 'readonly');
    const objectStore = transaction.objectStore(this._storeName);
    const request = objectStore.get(key);
    let result = null;
    request.onsuccess = event => {
      const data = event.target.result;
      if (data && (!data.expirationTime || data.expirationTime > Date.now())) {
        result = data.value;
      }
    };

    // Wait for the transaction to complete
    return new Promise(resolve => {
      transaction.oncomplete = () => {
        resolve(result);
      };
    });
  }
  static async delete(key) {
    await this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this._storeName], 'readwrite');
    const objectStore = transaction.objectStore(this._storeName);
    objectStore.delete(key);
  }
  static async clearAll() {
    await this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this._storeName], 'readwrite');
    const objectStore = transaction.objectStore(this._storeName);
    objectStore.clear();
  }
  static async clearByPattern(pattern) {
    await this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this._storeName], 'readwrite');
    const objectStore = transaction.objectStore(this._storeName);
    objectStore.openCursor().onsuccess = event => {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.key.includes(pattern)) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
  }
  static async clearExpiredData() {
    await this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this._storeName], 'readwrite');
    const objectStore = transaction.objectStore(this._storeName);
    const currentTime = Date.now();
    const request = objectStore.openCursor();
    request.onsuccess = event => {
      const cursor = event.target.result;
      if (cursor) {
        const data = cursor.value;

        // Check if the data has an expiry property and if it is expired
        if (data.expiry && data.expiry <= currentTime) {
          // If expired, delete the item
          objectStore.delete(cursor.primaryKey);
        }

        // Move to the next item
        cursor.continue();
      }
    };
    request.onerror = event => {
      console.error('Error clearing expired data:', event.target.error);
    };
  }
}