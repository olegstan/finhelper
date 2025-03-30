export default GroupArchiveHelper;
declare class GroupArchiveHelper {
    /**
     *
     * @param actives
     * @param groupType
     * @param modelClass
     * @returns {*[]}
     */
    static prepareActives(actives: any, groupType: any, modelClass?: typeof ActiveModel): any[];
}
import ActiveModel from "../../models/Active";
