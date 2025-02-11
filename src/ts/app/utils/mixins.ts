interface ParsedObject {
    [key: string]: any;
}

type CaseOption = 'lower' | 'upper' | 'none';

const _ = {

    has(obj: any, key: any): boolean {
        return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
    },

    isFunction(value: any): boolean {
        return typeof value === 'function';
    },

    isString(value: any): boolean {
        return typeof value === 'string';
    },

    isArray(value: any): boolean {
        return Array.isArray(value);
    },

    isNumber(value: any): boolean {

        return typeof value === 'number';

    },

    isNumberOrString(value: any): boolean {

        return typeof value === 'string' || typeof value === 'number';

    },

    joinObjectPropertiesAsString(first: Record<string, any>, second: Record<string, any>, properties: string[], separator: string = ' ', trim: boolean = true): object {

        if (!properties.length) {
            return first;
        }

        properties.forEach((propName: string) => {

            first[propName] = _.objValueAsString(first, propName, '') + separator + _.objValueAsString(second, propName, '');

            if (trim) {
                first[propName] = first[propName].trim();
            }
        });

        return first;

    },

    /**
     * Is the value passed a true javascript object?
     * @param o
     * @returns {boolean}
     */

    isPlainObject: function (o: any): boolean {

        return this.isObject(o)
            && !this.isFunction(o)
            && !this.isArray(o)
            && (Object.getPrototypeOf(o) === Object.prototype);

    },

    /**
     * Makes sure the value is an object, if not returns default value
     * @param v
     * @param d
     *
     * @return {Object}
     */

    asObject: function (v: any, d: object = {}): object {

        if (!this.isPlainObject(d)) {
            d = {};
        }

        return this.isPlainObject(v) ? v : d;
    },

    /**
     * Get string value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asString: function (v: any, d: string = ''): string {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = '';
        }

        if (!v || this.isUndefined(v) || this.isNull(v)) {
            v = d;
        }

        if (!this.isString(v)) {
            return d;
        }

        return v;
    },

    /**
     * get int value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asInt: function (v: any, d: number = 0): number {

        d = Number.isInteger(d) ? d : 0;

        if (_.isArray(v)) {
            return d;
        }

        if (typeof v === 'string') {

            v = v.trim();

            if (!/^[+-]?\d+$/.test(v)) {
                return d;
            }

        }

        v = parseInt(v);

        if (isNaN(v)) {
            return d;
        }

        return v;
    },

    /**
     * get int value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asFloat: function (v: any, d: number = 0.0): number {

        if (_.isArray(v)) {
            return d;
        }

        if (typeof v === 'string') {

            v = v.trim();

            if (!/^[+-]?(?:\d+|\.\d+)(?:\.\d*)?$/.test(v)) {
                return d;
            }
        }

        v = parseFloat(v);

        if (isNaN(v)) {
            return d;
        }

        return v;
    },

    /**
     * get array value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asArray: function (v: any, d: unknown[]): unknown[] {

        if (!this.isArray(d)) {
            d = [];
        }

        return this.isArray(v) ? v : d;
    },

    /**
     * Gets a value from an object using a key.
     * @returns {*}
     * @param o
     * @param k
     * @param d
     */

    objOwnValue: function (o: any, k: string, d: any = undefined): any {
        return this.isPlainObject(o) && this.has(o, k) ? o[k] : d;
    },

    /**
     * Gets a value from an object using a key.
     * @returns {*}
     * @param o
     * @param k
     * @param d
     */

    objValue: function (o: any, k: string, d: any = undefined): any {
        return this.isPlainObject(o) && this.hasProperty(o, k) ? o[k] : d;
    },

    /**
     * Gets a value from an object as string
     * @param o
     * @param k
     * @param d
     * @returns {*}
     */

    objValueAsString: function (o: unknown, k: string, d: string = ''): string {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = '';
        }

        let val = this.objValue(o, k, d);

        return this.isNumberOrString(val) ? val : d;

    },

    /**
     * Gets a value from an object as object
     * @param o
     * @param k
     * @param d
     * @returns {*}
     */

    objValueAsObject: function (o: any, k: string, d: object = {}): object {


        if (!this.isPlainObject(o)) {
            return d;
        }

        if (!this.isPlainObject(d)) {
            d = {};
        }

        let val = this.objValue(o, k, d);

        return this.isPlainObject(val) ? val : d;

    },

    /**
     * Gets object's key value as float
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {Number}
     */

    objValueAsInt: function (o: object, k: string, d: number = 0): number {

        let val = this.objValue(o, k, d);

        val = parseInt(val);

        if (isNaN(val)) {
            val = 0;
        }

        return val;
    },

    objValueAsIntFlag: function (o: object, k: string, d: number = 0): number {

        let val = this.objValue(o, k, d);

        val = parseInt(val);

        if (isNaN(val)) {
            val = d;
        }

        return val > 0 ? 1 : 0;
    },

    /**
     * Gets object's key value as float
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {Number}
     */

    objValueAsFloat: function (o: object, k: string, d: number = 0.0): number {

        let val = this.objValue(o, k, d);

        val = parseFloat(val);

        if (isNaN(val)) {
            val = 0.0;
        }

        return val;
    },

    /**
     * Gets object's key value as boolean
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {boolean}
     */

    objValueAsBool: function (o: object, k: string, d: boolean = false): boolean {

        return !!(this.objValue(o, k, d));

    },

    /**
     * Gets object's key value as array
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {Object}
     */

    objValueAsArray: function (o: object, k: string, d: unknown[] = []): unknown[] {

        d = this.isArray(d) ? d : [];

        let val = this.objValue(o, k, d);

        return this.isArray(val) ? val : d;
    },

    /**
     * Checks if object has the given method on its own or in prototype chain
     *
     * @param o The source object
     * @param m The method name
     *
     * @returns {boolean}
     */

    hasMethod: function (o: object, m: string): boolean {

        return this.isPlainObject(o) && (this.functions(o).indexOf(m) >= 0);

    },

    isNull(value: any): boolean {
        return value === null;
    },

    isUndefined(value: any): boolean {
        return value === void 0;
    },


    functions(obj: any): string[] {
        let names = [];

        for (let key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    },

    /**
     * Checks if a property (either value of function) exists in object itself or in its prototype chain
     *
     * @param o The object
     * @param k The key
     *
     * @returns {boolean}
     */

    hasProperty: function (o: object, k: string): boolean {

        return this.isPlainObject(o) && this.allKeys(o).indexOf(k) >= 0;

    },

    isObject(value: any): boolean {
        return value !== null && (typeof value === 'object') && !Array.isArray(value);
    },

    allKeys(obj: any) {
        if (!_.isObject(obj)) return []; // Ensure obj is an object
        let keys = [];
        for (let key in obj) keys.push(key); // Loop through all properties (including inherited)
        return keys;
    },

    /**
     * Generates a guid
     *
     * @returns {string}
     */

    guid: function (): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    },

    isValidGUID(guid: string): boolean {
        const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return guidRegex.test(guid);
    },

    objValueAsMethod: function (o: any, k: string, d: unknown = null): unknown {

        let val = this.objValue(o, k, d);

        return this.isFunction(val) ? val : d;
    },

    isAlphanumeric(value: any): boolean {
        return typeof value === "string" && /^[a-z0-9]+$/i.test(value);
    },

    ensureSemicolon(str: string): string {
        return str.trim().endsWith(";") ? str.trim() : str.trim() + ";";
    },

    encodeHTML(html: string): string {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    buildQueryParams(obj: Record<string, any>, prefix = ""): string {
        const queryString: string[] = [];

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const fullKey = prefix ? `${prefix}[${key}]` : key;

                if (typeof value === "object" && value !== null) {
                    // Recursively flatten nested objects & arrays
                    queryString.push(this.buildQueryParams(value, fullKey));
                } else {
                    // Encode key-value pair
                    queryString.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
                }
            }
        }

        return queryString.join("&");
    },

    appendQueryParams(url: string, params: Record<string, any>): string {
        const urlObj = new URL(url);
        const newParams = this.buildQueryParams(params);

        // Preserve existing query params
        urlObj.search = urlObj.search ? `${urlObj.search}&${newParams}` : newParams;

        return urlObj.toString();
    },

    cssClassListToSelector(classList: string | string[]): string {

        if (typeof classList === 'string' && classList.trim() !== '') {

            let parts: string[] = classList.split(' ');

            parts = parts.map((value: string) => {
                return value.trim()
            });

            parts = parts.filter((value: string) => {
                return value.trim() !== ''
            });

            return `.${parts.join('.')}`;

        } else if (_.isArray(classList) && classList.length) {

            let parts: string[] = (classList as any[]).filter((value) => {
                return _.isString(value) ? value : '';
            }).join(' ').split(' ');

            parts = parts.map((value: string) => {
                return _.isString(value) ? value.trim() : '';
            });

            parts = parts.filter((value: string) => {
                return value.trim() !== ''
            });

            return `.${parts.join('.')}`;

        }

        return '';

    },

    /**
     * Converts a url encoded data string to FormData object
     *
     * @param urlEncodedString
     */

    urlEncodedToFormData(urlEncodedString: string): FormData {
        const formData = new FormData();
        const params = new URLSearchParams(urlEncodedString);

        for (const [key, value] of params) {
            formData.append(key, value);
        }

        return formData;
    },

    parseUrlEncoded: function (data: string): ParsedObject {
        const params = new URLSearchParams(data);
        const obj: ParsedObject = {};

        params.forEach((value, key) => {
            _.setNestedValue(obj, key, value);
        });

        return obj;
    },

    setNestedValue: function (obj: ParsedObject, key: string, value: string): void {
        const keys = key.replace(/\]/g, "").split(/\[/); // Convert `profile[nick]` → ['profile', 'nick']
        let ref: ParsedObject = obj;

        for (let i = 0; i < keys.length; i++) {
            let k: string = keys[i];

            // If key ends with `[]`, treat it as an array
            if (k.endsWith("[]")) {
                k = k.slice(0, -2);
                ref[k] = ref[k] || [];
                ref[k].push(_.autoConvert(value));
                return;
            }

            // If last key, assign the value
            if (i === keys.length - 1) {
                ref[k] = _.autoConvert(value);
            } else {
                ref[k] = ref[k] || {};
                ref = ref[k];
            }
        }
    },

    autoConvert: function (value: string): string | number {
        return !isNaN(Number(value)) && value.trim() !== "" ? Number(value) : value;
    },

    /**
     * Is valid global function ...
     *
     * @param name
     */

    ifGlobalFunctionExists(name: Function | string | null | undefined): boolean {

        if (name === null || name === undefined) {
            return false;
        }

        if (typeof name === 'function') {
            return true;
        }

        name = name.trim();

        if (name === '') {
            return false;
        }

        if (typeof window === "undefined") {
            return false;
        }

        if (typeof window[name as any] === "undefined") {
            return false;
        }

        return typeof window[name as any] === 'function';

    },

    /**
     * Decode base64 version of string encoded with unicodeEncode
     * @param base64
     */

    unicodeB64Decode(base64: string): string {

        return new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));


    },

    /**
     * Encodes unicode text to base 64 ...
     *
     * @param text
     */

    unicodeB64Encode(text: string): string {

        return btoa(new TextEncoder().encode(text).reduce((acc, byte) => acc + String.fromCharCode(byte), ""));

    },

    deepMerge<T extends Record<string, any>>(obj1: T, obj2: T): T {

        if (!obj1 || typeof obj1 !== "object") return obj2;
        if (!obj2 || typeof obj2 !== "object") return obj1;

        const result: any = {...obj1};

        for (const key of Object.keys(obj2)) {
            if (
                obj2[key] &&
                typeof obj2[key] === "object" &&
                !Array.isArray(obj2[key]) &&
                typeof obj1[key] === "object" &&
                !Array.isArray(obj1[key])
            ) {
                result[key] = this.deepMerge(obj1[key], obj2[key]);
            } else {
                result[key] = obj2[key];
            }
        }

        return result;
    },


    sanitizeString(input: string, replacer: string = '-', changeCase: CaseOption = 'lower'): string {
        // Replace all non-word characters (\W) with the replacer
        let sanitized = input.replace(/\W+/g, replacer);

        // Trim leading and trailing replacer sequences
        const regex = new RegExp(`^${replacer}+|${replacer}+$`, 'g');
        sanitized = sanitized.replace(regex, '');

        // Apply case transformation
        switch (changeCase) {
            case 'lower':
                sanitized = sanitized.toLowerCase();
                break;
            case 'upper':
                sanitized = sanitized.toUpperCase();
                break;
            case 'none':
                break; // Do nothing
            default:
                throw new Error(`Invalid changeCase option: ${changeCase}`);
        }

        return sanitized;
    },

    parseCssValue(cssValue: string): { value: number; unit: string } | null {
        const match = cssValue.match(/^([+-]?\d*\.?\d+)([a-zA-Z%vwvhrempx]*)$/);

        if (!match) return null;

        return {
            value: parseFloat(match[1]),
            unit: match[2] || "",
        };
    },

    deepEqualWidthData(obj1: any, obj2: any): boolean {

        if (obj1 === obj2) return true;

        if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
            return false;
        }

        const keys1 = Object.keys(obj1).filter(key => typeof obj1[key] !== "function");
        const keys2 = Object.keys(obj2).filter(key => typeof obj2[key] !== "function");

        if (keys1.length !== keys2.length) return false;

        return keys1.every((key) => {
            if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
            return this.deepEqualWidthData(obj1[key], obj2[key]);
        });
    },

    /**
     * Has any of the given properties?
     *
     * @param obj
     * @param properties
     */

    hasAnyProperty(obj : any,properties : string[] = []) : boolean {

        if(!obj) {
            return false;
        }

        if(typeof obj === 'object' && Array.isArray(obj)) {
            return false;
        }

        if(!properties.length) {
            return false;
        }

        for(let i = 0; i < properties.length;i++) {
            if(obj.hasOwnProperty(properties[i])) {
                return true;
            }
        }


        return false;
    },

    isInstanceOfClass(value : any) : boolean {
        return value instanceof Object && value.constructor !== Object;
    }
}

export default _;