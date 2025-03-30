export default class Color {
    static colors: {
        color: string;
        subColors: string[];
    }[];
    static getColorByCategory(category: any): any;
    static getColorByGroup(category: any): any;
    static increaseBrightness(col: any, amt: any): string;
}
