export default class ClientConstants {
    static CLIENT: string;
    static MANAGER: string;
    static OWNER: string;
    static DIRECTOR: string;
    static ASSISTANT: string;
    static ACCOUNTANT: string;
    static PARTNER: string;
    static DRIVER: string;
    static DEPARTMENT_BOSS: string;
    static MANAGER_GROUP: string[];
    static getRole: (slug: any) => "Владелец" | "Руководитель" | "Ассистент" | "Менеджер" | "Бухгалтер" | "Партнер" | "Водитель" | "Начальник отдела" | undefined;
}
