export default class IndexedDBCache {
  static _db;
  static _storeName;

  /**
   * Гарантирует, что база данных открыта.
   * @param {string} databaseName
   * @param {string} storeName
   */
  static async ensureDatabaseOpened(databaseName = 'AppStorage', storeName = 'DataStore') {
    if (!this._db) {
      await this.openDatabase(databaseName, storeName).catch(error => {
        console.error("Ошибка при открытии БД:", error);
      });
    }
  }

  /**
   * Открывает IndexedDB и создаёт хранилище при необходимости.
   * @param {string} databaseName
   * @param {string} storeName
   * @returns {Promise<void>}
   */
  static openDatabase(databaseName, storeName) {
    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(databaseName, 1);
        request.onerror = event => {
          const errorMessage = 'Ошибка при открытии IndexedDB';
          console.error(errorMessage, event.target.error);
          reject(new Error(errorMessage));
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
          this._db = request.result;
          this._storeName = storeName;
          resolve();
        };
      } catch (error) {
        console.error("Ошибка в openDatabase:", error);
        reject(error);
      }
    });
  }

  /**
   * Вспомогательный метод для выполнения операций с хранилищем.
   * Обеспечивает создание транзакции, обработку ошибок и вызов переданной операции.
   *
   * @param {IDBTransactionMode} mode - режим транзакции ('readonly' или 'readwrite')
   * @param {function} operation - функция, получающая (store, transaction, resolve, reject)
   * @returns {Promise<any>}
   */
  static async _executeOperation(mode, operation) {
    await this.ensureDatabaseOpened();
    return new Promise((resolve, reject) => {
      try {
        const transaction = this._db.transaction([this._storeName], mode);
        const store = transaction.objectStore(this._storeName);

        // Назначаем обработку ошибок транзакции
        transaction.onerror = event => {
          console.error('Ошибка транзакции:', event.target.error);
          reject(event.target.error);
        };
        operation(store, transaction, resolve, reject);
      } catch (error) {
        console.error("Ошибка в _executeOperation:", error);
        reject(error);
      }
    });
  }

  /**
   * Сохраняет данные с указанием времени истечения.
   * @param {string} key
   * @param {*} value
   * @param {number} expirationTimeInMs - время жизни в миллисекундах (по умолчанию 1 день)
   * @returns {Promise<void>}
   */
  static async set(key, value, expirationTimeInMs = 1000 * 60 * 60 * 24) {
    return this._executeOperation('readwrite', (store, transaction, resolve, reject) => {
      let sanitizedValue;
      try {
        // Проверяем, что значение можно сериализовать
        sanitizedValue = JSON.parse(JSON.stringify(value));
      } catch (error) {
        console.error(`Ошибка сериализации данных: ${error.message}`);
        return reject(error);
      }
      const expirationTime = expirationTimeInMs ? Date.now() + expirationTimeInMs : null;
      const data = {
        key,
        value: sanitizedValue,
        expirationTime
      };
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = event => reject(new Error(`Ошибка записи данных: ${event.target.error}`));
    }).catch(error => {
      console.error("Ошибка в методе set:", error);
    });
  }

  /**
   * Получает данные по ключу, если они не устарели.
   * @param {string} key
   * @returns {Promise<*>} значение или null
   */
  static async get(key) {
    return this._executeOperation('readonly', (store, transaction, resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = event => {
        const data = event.target.result;
        if (data && (!data.expirationTime || data.expirationTime > Date.now())) {
          resolve(data.value);
        } else {
          resolve(null);
        }
      };
      request.onerror = event => {
        console.error(`Ошибка чтения данных: ${event.target.error}`);
        resolve(null);
      };
    }).catch(error => {
      console.error("Ошибка в методе get:", error);
      return null;
    });
  }

  /**
   * Удаляет запись по ключу.
   * @param {string} key
   * @returns {Promise<void>}
   */
  static async delete(key) {
    return this._executeOperation('readwrite', (store, transaction, resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = event => {
        console.error(`Ошибка удаления ключа "${key}":`, event.target.error);
        resolve();
      };
    }).catch(error => {
      console.error("Ошибка в методе delete:", error);
    });
  }

  /**
   * Очищает всё хранилище.
   * @returns {Promise<void>}
   */
  static async clearAll() {
    return this._executeOperation('readwrite', (store, transaction, resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = event => reject(new Error(`Ошибка очистки хранилища: ${event.target.error}`));
    }).catch(error => {
      console.error("Ошибка в методе clearAll:", error);
    });
  }

  /**
   * Удаляет записи, ключи которых содержат указанный паттерн.
   * @param {string} pattern
   * @returns {Promise<void>}
   */
  static async clearByPattern(pattern) {
    return this._executeOperation('readwrite', (store, transaction, resolve, reject) => {
      const request = store.openCursor();
      request.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.key.includes(pattern)) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = event => reject(new Error(`Ошибка при очистке по паттерну "${pattern}": ${event.target.error}`));
    }).catch(error => {
      console.error("Ошибка в методе clearByPattern:", error);
    });
  }

  /**
   * Удаляет устаревшие данные.
   * @returns {Promise<void>}
   */
  static async clearExpiredData() {
    return this._executeOperation('readwrite', (store, transaction, resolve, reject) => {
      const currentTime = Date.now();
      const request = store.openCursor();
      request.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          const data = cursor.value;
          if (data.expirationTime && data.expirationTime <= currentTime) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = event => reject(new Error(`Ошибка при очистке устаревших данных: ${event.target.error}`));
    }).catch(error => {
      console.error("Ошибка в методе clearExpiredData:", error);
    });
  }
}
//# sourceMappingURL=IndexedDBCache.js.map