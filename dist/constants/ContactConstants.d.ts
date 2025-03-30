export default class ContactConstants {
    static CALL: number;
    static MEETINGS: number;
    static CONSULTATION: number;
    static CONTRACT_PENDING: number;
    static CONTRACT_CONFIRMED: number;
    static CONTRACT_REFUSED: number;
    static statuses(): {
        id: number;
        name: string;
    }[];
    static getStatusById(id: any): null;
}
