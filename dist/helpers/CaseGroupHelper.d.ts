export default CaseGroupHelper;
declare class CaseGroupHelper {
    static getNameByGroup(item: any, groupType: any): string;
    static prepareSortedItems(actives: any, firstGroupType: any): any[][];
    static groupThreeLevels(actives: any, firstGroupType: any, secondGroupType: any, getNameFunc: any): any[];
    static groupFourLevels(actives: any, firstGroupType: any, secondGroupType: any, thirdGroupType: any): any[];
    static group(actives: any, groupType: any, colors: {
        color: string;
        subColors: string[];
    }[] | undefined, sortCallback: any): any[];
}
