export default class ContactTaskRepeatConstants {
    static REPEAT_NONE: number;
    static REPEAT_DAILY: number;
    static REPEAT_WEEKLY: number;
    static REPEAT_MONTHLY: number;
    static statuses: number[];
    static getTextByType(type: any): "Не повторять" | "Ежедневно" | "Еженедельно" | "Ежемесячно" | undefined;
}
