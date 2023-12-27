export default class IndexedDBCache {
  static _db;
  static storeName;

  static ensureDatabaseOpened(databaseName = 'AppStorage', storeName= 'DataStore') {
    if (!this._db) {
      this.openDatabase(databaseName, storeName);
    }
  }

  static openDatabase(databaseName, storeName) {
    const request = indexedDB.open(databaseName, 1);

    request.onerror = (event) => {
      throw new Error('Error opening IndexedDB');
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'key' });
      }
    };

    this.storeName = storeName;  // Set the storeName
    this._db = request.result;
  }

  static set(key, value, expirationTimeInMs = null) {
    this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);
    const expirationTime = expirationTimeInMs ? Date.now() + expirationTimeInMs : null;
    const data = { key, value, expirationTime };
    objectStore.put(data, key);
  }

  static get(key) {
    this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this.storeName], 'readonly');
    const objectStore = transaction.objectStore(this.storeName);
    const request = objectStore.get(key);

    let result;

    request.onsuccess = (event) => {
      const data = event.target.result;
      if (data && (!data.expirationTime || data.expirationTime > Date.now())) {
        result = data.value;
      }
    };

    // Wait for the transaction to complete
    transaction.oncomplete = () => result;

    // Return a promise to maintain compatibility with asynchronous usage
    return new Promise((resolve) => resolve(result));
  }

  static delete(key) {
    this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);
    objectStore.delete(key);
  }

  static clearAll() {
    this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);
    objectStore.clear();
  }

  static clearByPattern(pattern) {
    this.ensureDatabaseOpened();
    const transaction = this._db.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);

    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.key.includes(pattern)) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
  }
}