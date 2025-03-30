export default class UserTaskTypeConstants {
    static CALLS: number;
    static MEETINGS: number;
    static CONSULTATION: number;
    static LETTERS: number;
    static BUSINESS: number;
    static OTHER: number;
    static DONE: number;
    static BIRTH_DAY: number;
    static PERSONAL: number;
    static MESSAGE: number;
    static getStatuses(): {
        id: number;
        name: string;
    }[];
    static statuses: number[];
    static getTextByType(type: any): "Звонок" | "Встреча" | "Консультация" | "Письмо" | "Прочее" | "Личное" | "Выполнено" | "День рождения" | "Сообщение в чате" | undefined;
}
