export default class BaseModel {
    /**
     *
     * @param attributes
     * @return {BaseModel}
     */
    static create(attributes: any): BaseModel;
    /**
     *
     * @param array
     * @returns {*}
     */
    static load(array: any): any;
    /**
     *
     * @return {BaseModel}
     */
    static getInstance(): BaseModel;
    /**
     *
     * @param params
     * @return {*}
     */
    static fetch(params?: {}): any;
    /**
     *
     * @param {Array} attributes
     */
    constructor(attributes: any[]);
    /**
     *
     * @type {Array}
     */
    attributes: any[];
    /**
     *
     * @type {{}}
     */
    related: {};
    /**
     *
     * @type {string}
     */
    controller: string;
    /**
     *
     * @param x
     */
    set id(x: any);
    /**
     *
     * @return {*}
     */
    get id(): any;
    /**
     *
     * @param attributes
     * @return {*}
     *
     * в JavaScript, свойства дочернего класса инициализируются
     * после вызова конструктора родительского класса.
     * Это означает, что внутри конструктора родительского
     * класса вы не сможете обратиться к свойствам, определенным в
     * дочернем классе, потому что они еще не были созданы.
     */
    setGetters(attributes: any): any;
    /**
     *
     * @param prop
     * @returns {*}
     */
    get(prop: any): any;
    /**
     *
     * @param prop
     * @param value
     */
    set(prop: any, value: any): void;
}
