export default class IndexedDBCache {
    static _db: any;
    static _storeName: any;
    /**
     * Гарантирует, что база данных открыта.
     * @param {string} databaseName
     * @param {string} storeName
     */
    static ensureDatabaseOpened(databaseName?: string, storeName?: string): Promise<void>;
    /**
     * Открывает IndexedDB и создаёт хранилище при необходимости.
     * @param {string} databaseName
     * @param {string} storeName
     * @returns {Promise<void>}
     */
    static openDatabase(databaseName: string, storeName: string): Promise<void>;
    /**
     * Вспомогательный метод для выполнения операций с хранилищем.
     * Обеспечивает создание транзакции, обработку ошибок и вызов переданной операции.
     *
     * @param {IDBTransactionMode} mode - режим транзакции ('readonly' или 'readwrite')
     * @param {function} operation - функция, получающая (store, transaction, resolve, reject)
     * @returns {Promise<any>}
     */
    static _executeOperation(mode: IDBTransactionMode, operation: Function): Promise<any>;
    /**
     * Сохраняет данные с указанием времени истечения.
     * @param {string} key
     * @param {*} value
     * @param {number} expirationTimeInMs - время жизни в миллисекундах (по умолчанию 1 день)
     * @returns {Promise<void>}
     */
    static set(key: string, value: any, expirationTimeInMs?: number): Promise<void>;
    /**
     * Получает данные по ключу, если они не устарели.
     * @param {string} key
     * @returns {Promise<*>} значение или null
     */
    static get(key: string): Promise<any>;
    /**
     * Удаляет запись по ключу.
     * @param {string} key
     * @returns {Promise<void>}
     */
    static delete(key: string): Promise<void>;
    /**
     * Очищает всё хранилище.
     * @returns {Promise<void>}
     */
    static clearAll(): Promise<void>;
    /**
     * Удаляет записи, ключи которых содержат указанный паттерн.
     * @param {string} pattern
     * @returns {Promise<void>}
     */
    static clearByPattern(pattern: string): Promise<void>;
    /**
     * Удаляет устаревшие данные.
     * @returns {Promise<void>}
     */
    static clearExpiredData(): Promise<void>;
}
