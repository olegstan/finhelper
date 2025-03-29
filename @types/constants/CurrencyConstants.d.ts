
export default class CurrencyConstants {
    // Статические числовые константы
    static RUBBLE_ID: number;
    static DOLLAR_ID: number;
    static EURO_ID: number;

    // Статические строковые константы
    static RUBBLE_SIGN: string;
    static DOLLAR_SIGN: string;

    // Статический массив кодов валют
    static DEFAULT_CODES: string[];

    // Статические массивы для хранения данных о валютах и курсах
    static currencies: Array<{
        id: number;
        name?: string;
        sign?: string;
        code?: string;
    }>;
    static courses: any[];

    /**
     * Возвращает название валюты по её ID.
     * @param id - ID валюты.
     * @returns Название валюты или undefined, если валюта не найдена.
     */
    static getCurrencyNameById(id: number): string | undefined;

    /**
     * Возвращает название валюты по её коду.
     * @param code - Код валюты.
     * @returns Название валюты или переданный код, если валюта не найдена.
     */
    static getCurrencyNameByCode(code: string): string;

    /**
     * Возвращает объект валюты по её ID.
     * @param id - ID валюты.
     * @returns Объект валюты или null, если валюта не найдена.
     */
    static getCurrencyById(id: number): { id: number; name?: string; sign?: string; code?: string } | null;

    /**
     * Возвращает знак валюты по её ID.
     * @param id - ID валюты.
     * @returns Знак валюты или код, если знак отсутствует.
     */
    static getCurrencySignById(id: number): string | undefined;

    /**
     * Возвращает код валюты по её ID.
     * @param id - ID валюты.
     * @returns Код валюты или знак, если код отсутствует.
     */
    static getCurrencyCodeById(id: number): string | undefined;

    /**
     * Возвращает знак валюты на основе активного элемента.
     * @param item - Активный элемент с информацией о валюте.
     * @returns Знак валюты в виде строки.
     */
    static getCurrencySignByActive(item: {
        type_id: number;
        buy_trades?: Array<{ currency_id: number }>;
        sell_trades?: Array<{ currency_id: number }>;
        buy_currency_id?: number;
        sell?: { currency_id: number };
        invests?: Array<{ child_item: { currency_id: number } }>;
    }): string;

    /**
     * Возвращает код валюты на основе активного элемента.
     * @param item - Активный элемент с информацией о валюте.
     * @returns Код валюты в виде строки.
     */
    static getCurrencyCodeByActive(item: {
        type_id: number;
        buy_trades?: Array<{ currency_id: number }>;
        sell_trades?: Array<{ currency_id: number }>;
        buy_currency_id?: number;
        sell?: { currency_id: number };
        invests?: Array<{ child_item: { currency_id: number } }>;
    }): string;
}